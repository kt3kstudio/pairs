const scene = require('../ui/scene')
const { checkLocation } = require('../util/location')
const { trigger } = require('../util')
const { User, Character } = require('../domain')

const { img } = require('dom-gen')

require('./component')

const {on, wire} = $.cc

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
   * Loads the data for the scene.
   */
  load () {
    return new User.Repository().get()

    .then(user => new Character.InitService().getOrCreateById(user.charId))

    .then(character => { this.character = character })
  }

  /**
   * Sets up the components.
   */
  setUp () {
    return checkLocation(this.character.location, window.location)

    .then(() => this.floorAssets.init(this.character).then(() => this.camera.setUp()))
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
      let floorAsset = this.floorAssets.findById(this.floorAssets.walker.assetId)

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
    const key = this.levelKey()
    this.floorAssets.elem.append(key.elem)

    key.setAt(this.floorAssets.walker.getPoint())

    trigger(this.el, 'camera-focus', {x: key.getPoint().x})

    return key.show()

    .then(() => {
      asset = this.floorAssets.findById(id)

      key.setAt(asset.getPoint())

      const keyGivingDur = 800

      trigger(this.el, 'camera-move', { x: key.getPoint().x, dur: keyGivingDur })

      return key.engage(keyGivingDur)
    })

    .then(() => key.jump())

    .then(() => this.floorAssets.unlockById(id))

    .then(() => key.disappear())
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
   */
  levelKey () {
    return img().cc('level-key').cc.get('level-key')
  }
}

module.exports = FloorScene
