const { scene, blocking } = require('../ui')
const { checkLocation } = require('../util/location')
const { trigger } = require('../util')
const { User, Character } = require('../domain')

const { img } = require('dom-gen')

const { emit, on, wire } = capsid

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

  @wire('floor-asset-collection') get floorAssets () {}
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

  @blocking
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
      const asset = this.floorAssets.findById(this.floorAssets.walker.assetId)

      return this.floorAssets.walker.appearAt(asset)
    })
  }

  /**
   * The sequence of unlocking all assets which the character has the keys of.
   */
  sequenceUnlockingAll () {
    if (this.character.hasAnyKey()) {
      return this.character.keys
        .filter(key => key.belongsTo(this.floorAssets.walker.floorId))
        .reduce((promise, key) => promise.then(() => this.sequenceUnlocking(key)), Promise.resolve())
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

    this.floorAssets.$el.append(key.el)

    key.setAt(this.floorAssets.walker.getPoint())

    trigger(this.el, 'camera-focus', key.getPoint())

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

  @on('screenplay') @blocking onScreenplay (e) {
    this.screenplay(e.detail.name).play()
  }

  fadeOut () {
    this.menuButton.hide()

    return this.floorAssets.hide().then(() => this.bg.turnBlack())
  }

  @blocking
  walkerFadeIntoDoor () {
    return this.floorAssets.walker.getIntoDoor().then(() => this.fadeOut())
  }

  /**
   * Go to the specified level.
   * @param {String} level The level
   */
  @on('go-to-level') goToLevel () {
    return this.walkerFadeIntoDoor().then(() => { location.href = 'level.html' })
  }

  /**
   * Reloads the map scene.
   * @return {Promise}
   */
  @on('scene-reload') sceneReload () {
    return this.walkerFadeIntoDoor().then(() => { location.reload() })
  }

  @on('go-to-floor') @emit.last('scene-reload') goToFloor (e) {
    this.floorAssets.walker.setLocationDetail(e.detail)

    return this.floorAssets.walker.refreshAll()
  }

  /**
   * Creates a level key.
   */
  levelKey () {
    return img().cc('level-key').cc.get('level-key')
  }
}

module.exports = FloorScene
