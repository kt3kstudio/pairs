const SceneContext = require('../ui/scene-context')
const BackgroundService = require('../ui/common/background-service')
const UserRepository = require('../domain/user-repository')
const CharacterRepository = require('../domain/character-repository')

const {wait} = require('spn')
const {img} = require('dom-gen')

require('./component')

const {component, on, wire} = $.cc

/**
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 */
@component('floor-scene')
class FloorScene extends SceneContext {
  /**
   * The entry point of the map scene.
   *
   * Loads things, initializes things in order, controls everything.
   */
  @on('scene-start')
  main () {
    super.main()
  }

  /**
   * Gets the floor asset collection.
   * @return {FloorAssetCollection}
   */
  @wire('floor-asset-collection') get floorAssets () {}

  /**
   * Gets the camera.
   * @return {Camera}
   */
  @wire get camera () {}

  /**
   * Gets the floor walker.
   * @return {FloorWalker}
   */
  @wire('floor-walker') get walker () {}

  /**
   * Gets the floorboard.
   * @return {Floorboard}
   */
  @wire get floorboard () {}

  /**
   * Loads the data for the scene.
   */
  load () {
    return this.loadUserAndCharacter()

    .then(() => this.loadFloorData())
  }

  /**
   * Loads the user data and character data
   */
  loadUserAndCharacter () {
    return new UserRepository().get()

    .then(user => new CharacterRepository().getById(user.charId))

    .then(character => { this.character = character })
  }

  /**
   * Loads the floor data.
   * @return {Promise<string>}
   */
  loadFloorData () {
    return Promise.resolve($.get(this.getFloorDataURL()))

    .then(data => { this.floorData = data })
  }

  /**
   * Gets the floor data url.
   * @return {string}
   */
  getFloorDataURL () {
    return `${global.BASEPATH}/data/floor/${this.character.position.floorId}.html`
  }

  /**
   * Sets up the components
   */
  setUp () {
    this.spawnFloorWalker(this.character)

    this.initFloorAssets(this.character)

    this.camera.setUp()
  }

  /**
   * Initializes the floor walker.
   * @param {Character} character
   */
  spawnFloorWalker (character) {
    this.elem.find('.floor-asset-collection').append(
      img({
        addClass: 'sub-door-knock sub-character-goto',
        data: {character: character}
      }).cc('floor-walker')
    )
  }

  /**
   * Initializes the floor assets.
   * @param {Character} character
   */
  initFloorAssets (character) {
    this.floorAssets.loadAssetsFromData(this.floorData)

    this.floorAssets.updateAssetsByLocksAndHistories(character.locks, character.histories)

    const currentFloorAsset = this.floorAssets.findById(character.position.floorObjectId)

    if (currentFloorAsset) {
      currentFloorAsset.locked = false
    }
  }

  start () {
    this.getMenuButton().show()

    BackgroundService.turnWhite()

    return this.floorboard.show()

    .then(() => this.floorAssets.show())

    .then(() => {
      let floorAsset = this.floorAssets.findById(this.walker.getPosition().floorObjectId)

      return this.walker.appearAt(floorAsset)
    })
  }

  fadeOut () {
    this.getMenuButton().hide()

    return this.floorAssets.hide().then(() => {
      this.floorboard.hide()

      return BackgroundService.turnBlack()
    })
  }

  walkerFadeIntoDoor () {
    return this.walker.getIntoDoor().then(() => this.fadeOut())
  }

  /**
   * Go to the specified level.
   *
   * @param {String} level The level
   */
  @on('goToLevel')
  goToLevel () {
    return this.walkerFadeIntoDoor().then(() => {
      location.href = 'level.html'
    })
  }

  /**
   * Reloads the map scene.
   *
   * This is typically used when the the floor is changed.
   *
   * @return {Promise}
   */
  @on('sceneReload')
  sceneReload () {
    return this.walkerFadeIntoDoor().then(() => location.reload())
  }

  /**
   * Unlocks the asset specified at the event object.
   *
   * @param {Event} e The event
   * @return {Promise}
   */
  @on('assetUnlock')
  assetUnlock (e) {
    const asset = e.floorAsset

    return this.camera.scrollTo(asset.centerX(), 500)

    .then(() => {
      asset.removeFrog()
      asset.locked = false
      asset.enableDoorKnock()

      return wait(500)
    })

    .then(() => this.camera.scrollTo(this.walker.x, 500))
  }
}

module.exports = FloorScene
