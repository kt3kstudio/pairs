const scene = require('../ui/scene')
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
 * - take care of menuButton, bg, floorAssets and camera
 */
@scene.primary
@component
class FloorScene {
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
   * Gets the asset of the given id.
   * @param {string} id The id of the asset
   * @return {FloorAsset}
   */
  assetAt (id) {
    return this.floorAssets.findById(id)
  }

  /**
   * Loads the data for the scene.
   */
  load () {
    return new UserRepository().get()

    .then(user => new CharacterRepository().getById(user.charId))

    .then(character => { this.character = character })
  }

  /**
   * Sets up the components.
   */
  setUp () {
    return this.floorAssets.init(this.character).then(() => this.camera.setUp())
  }

  start () {
    return this.sequenceInitial()

    .then(() => this.sequenceUnlockingAll())

    .then(() => this.floorAssets.walker.focusMe())
  }

  /**
   * Plays the initial sequence.
   */
  sequenceInitial () {
    this.menuButton.show()

    this.bg.turnWhite()

    return this.floorAssets.show()

    .then(() => {
      let floorAsset = this.assetAt(this.floorAssets.walker.assetId)

      return this.floorAssets.walker.appearAt(floorAsset)
    })
  }

  /**
   * The sequence of unlocking all assets which the character has the keys of.
   */
  sequenceUnlockingAll () {
    if (this.character.hasAnyKey()) {
      return this.character.keys.reduce((promise, key) => promise.then(() => this.sequenceUnlocking(key)), Promise.resolve())
    }
  }

  /**
   * The sequence of unlocking levels or next floors.
   * @param {LevelKey} levelKey The domain model of level key
   * @return {Promise}
   */
  sequenceUnlocking (levelKey) {
    let asset
    const id = levelKey.levelId
    const key = this.levelKey(levelKey)
    this.floorAssets.elem.append(key.elem)

    key.setAt(this.floorAssets.walker.getPoint())

    this.elem.trigger('camera-focus', [key.getPoint().x])

    return key.show()

    .then(() => {
      asset = this.assetAt(id)

      key.setAt(asset.getPoint())

      const keyGivingDur = 800

      this.elem.trigger('camera-move', [key.getPoint().x, keyGivingDur])

      return key.engage(keyGivingDur)
    })

    .then(() => key.jump())

    .then(() => {
      asset.unlock()

      this.floorAssets.walker.unlockById(id)
      this.floorAssets.walker.removeKeyOf(id)

      this.floorAssets.walker.saveAll()

      return key.disappear()
    })
  }

  fadeOut () {
    this.menuButton.hide()

    return this.floorAssets.hide().then(() => this.bg.turnBlack())
  }

  walkerFadeIntoDoor () {
    return this.floorAssets.walker.getIntoDoor().then(() => this.fadeOut())
  }

  /**
   * Go to the specified level.
   *
   * @param {String} level The level
   */
  @on('go-to-level')
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
  @on('scene-reload')
  sceneReload () {
    return this.walkerFadeIntoDoor().then(() => location.reload())
  }

  /**
   * Creates a level key.
   * @param {LevelKey} levelKey
   */
  levelKey (levelKey) {
    return img().cc.init('level-key')
  }
}

module.exports = FloorScene
