const { Body, DIRS, ratio } = require('spn')

const { sprite } = require('../../ui')
const { trigger } = require('../../util')

const { component, on, emit } = $.cc

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * This works as the facade of Character model.
 */
@sprite.character
@ratio.x(0.5)
@ratio.y(1)
@component
class FloorWalker extends Body {

  /**
   * @return {string}
   */
  get assetId () {
    return this.getPosition().floorObjectId
  }

  __init__ () {
    this.initSprite(this.$el)
  }

  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  /**
   * Makes the character appear in the scene
   *
   * @param {FloorAsset} floorAsset The wall object
   * @return {Promise}
   */
  appearAt (floorAsset) {
    this.current = floorAsset

    this.setAt(floorAsset.getPoint())

    return floorAsset.open().then(() => {
      this.turn(DIRS.DOWN)

      return this.show()
    })
  }

  /**
   * @param {Eevent} e The event
   * @param {FloorAsset} floorAsset The floor asset
   */
  @on('door-knock')
  doorKnock (e) {
    this.moveToFloorAsset(e.detail.knocked)
  }

  /**
   * Character goes to another floor.
   * @param {Event} e The event object
   */
  @on('character-goto')
  characterGoto (e) {
    this.character.position.floorId = e.detail.goto.floorId
    this.character.position.floorObjectId = e.detail.goto.floorObjectId

    // Reloads the submodels here because the floor could change
    this.character.reloadAll()
    .then(() => this.saveAll())
    .then(() => trigger(this.elem, 'scene-reload'))
  }

  /**
   * Gets the character's position.
   *
   * @return {CharacterPosition}
   */
  getPosition () {
    return this.character.position
  }

  /**
   * Sets the floor object id.
   *
   * @param {String} floorObjectId The floor object id
   */
  setFloorObjectId (floorObjectId) {
    this.character.position.floorObjectId = floorObjectId

    return this.saveAll()
  }

  /**
   * Saves the character data.
   */
  saveCharacter () {
    return this.saveAll()
  }

  /**
   * Makes the camera focus at me.
   */
  focusMe () {
    trigger(this.el, 'camera-focus', { x: this.getPoint().x })
  }

  /**
   * Moves the character sprite to wall object
   *
   * @param {FloorAsset} floorAsset The wall object to go to
   * @return {Promise}
   */
  moveToFloorAsset (floorAsset) {
    const goOutDur = 220
    const moveOnCorridor = 300
    const goIntoDur = goOutDur
    const goOutDistance = 80

    this.focusMe()

    this.current.close()

    this.setTo(this.current.getPoint().down(goOutDistance))

    return this.engage(goOutDur)

    .then(() => {
      // Notifies the character starts moving to the floorAsset.x.
      // The camera take this info and move following the hero.
      trigger(this.el, 'camera-move', { x: floorAsset.x, dur: moveOnCorridor })

      floorAsset.open()

      this.setTo(floorAsset.getPoint().down(goOutDistance))

      return this.engage(moveOnCorridor)
    })

    .then(() => {
      this.setTo(floorAsset.getPoint())

      return this.engage(goIntoDur)
    })

    .then(() => {
      this.current = floorAsset

      this.setFloorObjectId(floorAsset.id)

      floorAsset.onGetWalker(this)

      this.turn(DIRS.DOWN)
    })
  }

  /**
   * Gets the character into the door.
   * @return {Promise}
   */
  getIntoDoor () {
    this.turn(DIRS.UP)

    return this.disappear().then(() => this.current.close())
  }

  /**
   * @param {string} assetId
   */
  unlockById (assetId) {
    this.character.unlockById(assetId)
  }

  /**
   * @param {string} assetId
   */
  removeKeyOf (assetId) {
    this.character.removeKeyOf(assetId)
  }

  /**
   * Saves everything in character model. (Character itself, LevelHistories, LevelKeys)
   * @return {Promise}
   */
  saveAll () {
    return this.character.saveAll()
  }
}

module.exports = FloorWalker
