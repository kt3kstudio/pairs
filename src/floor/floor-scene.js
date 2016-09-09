const SceneContext = require('../ui/scene-context')
const UserRepository = require('../domain/user-repository')
const CharacterRepository = require('../domain/character-repository')

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
@component
class FloorScene extends SceneContext {
  /**
   * The entry point of the map scene.
   *
   * Loads things, initializes things in order, controls everything.
   */
  @on('scene-start') main () {
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
    this.append(this.floorWalker(this.character))

    this.initFloorAssets(this.character)

    this.camera.setUp()
  }

  /**
   * Initializes the floor walker.
   * @param {Character} character
   * @return {jQuery} dom selection
   */
  floorWalker (character) {
    return img({
      addClass: 'sub-door-knock sub-character-goto',
      data: {character: character},
      cc: 'floor-walker'
    })
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
    return this.sequenceInitial()

    .then(() => {
      if (this.character.hasAnyKey()) {
        return this.character.keys.reduce((promise, key) => promise.then(() => this.sequenceUnlocking(key)), Promise.resolve())
      }
    })

    .then(() => this.walker.focusMe())
  }

  /**
   * Plays the initial sequence.
   */
  sequenceInitial () {
    this.menuButton.show()

    this.bg.turnWhite()

    return this.floorboard.show()

    .then(() => this.floorAssets.show())

    .then(() => {
      let floorAsset = this.floorAssets.findById(this.walker.getPosition().floorObjectId)

      return this.walker.appearAt(floorAsset)
    })
  }

  /**
   * The sequence of unlocking levels or next floors.
   * @param {LevelKey} levelKey The domain model of level key
   * @return {Promise}
   */
  sequenceUnlocking (levelKey) {
    let asset
    const key = this.levelKey(levelKey)
    this.append(key.elem)

    key.setAt(this.walker.getPoint())

    this.elem.trigger('camera-focus', [key.getPoint().x])

    return key.show()

    .then(() => {
      asset = this.floorAssets.findById(levelKey.levelId)

      key.setAt(asset.getPoint())

      const keyGivingDur = 800

      this.elem.trigger('camera-move', [key.getPoint().x, keyGivingDur])

      return key.engage(keyGivingDur)
    })

    .then(() => key.jump())

    .then(() => {
      asset.unlock()

      return key.disappear()
    })
  }

  fadeOut () {
    this.menuButton.hide()

    return this.floorAssets.hide().then(() => {
      this.floorboard.hide()

      return this.bg.turnBlack()
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
   * Spawns level-keys
   * @param {LevelKey} levelKey
   */
  levelKey (levelKey) {
    return img().cc.init('level-key')
  }

  append (...args) {
    this.floorAssets.elem.append(...args)
  }
}

module.exports = FloorScene
