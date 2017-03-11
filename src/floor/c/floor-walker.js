const { sprite, body, DIRS } = require('../../ui')
const { trigger, triggerNoBubble } = require('../../util')

const { on } = capsid

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * This works as the facade of Character model.
 */
@sprite.character
@body({ ratio: { x: 0.5, y: 1 } })
class FloorWalker {

  __init__ () {
    this.el.setAttribute('id', 'hero')
    this.character = this.$el.data('character')
  }

  /**
   * @return {string}
   */
  get assetId () {
    return this.character.location.detail.assetId
  }

  /**
   * @return {string}
   */
  get floorId () {
    return this.character.location.detail.floorId
  }

  @on('showing') onShowing () {
    this.updateSprite()
  }

  /**
   * Makes the character appear in the scene
   *
   * @param {FloorAsset} asset The wall object
   * @return {Promise}
   */
  appearAt (asset) {
    this.current = asset

    this.setAt(asset.getAcceptPoint())

    return asset.open().then(() => {
      this.turn(asset.getAcceptDir())

      return this.show()
    })
  }

  /**
   * @param {Eevent} e The event
   * @param {FloorAsset} floorAsset The floor asset
   */
  @on('door-knock') onDoorKnock (e) {
    this.moveToFloorAsset(e.detail.knocked)
  }

  /**
   * Reloads and saves the state.
   * @return {Promise}
   */
  refreshAll () {
    return this.character.reloadAll().then(() => this.saveAll())
  }

  /**
   * Gets the character's position.
   *
   * @return {CharacterPosition}
   */
  getPosition () {
    return this.character.location.detail
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
   * @param {FloorAsset} next The asset to go to
   * @return {Promise}
   */
  moveToFloorAsset (next) {
    const goOutDur = 220
    const moveOnCorridor = 300
    const goIntoDur = goOutDur
    const goOutDistance = 80

    this.focusMe()

    if (typeof this.current.close === 'function') this.current.close()

    this.setTo(this.current.getPoint().down(goOutDistance))

    return this.engage(goOutDur)

    .then(() => {
      // Notifies the character starts moving to the floorAsset.x.
      // The camera take this info and move following the hero.
      trigger(this.el, 'camera-move', { x: next.x, dur: moveOnCorridor })

      if (typeof next.open === 'function') next.open()

      this.setTo(next.getPoint().down(goOutDistance))

      return this.engage(moveOnCorridor)
    })

    .then(() => {
      this.setTo(next.getAcceptPoint())

      return this.engage(goIntoDur)
    })

    .then(() => {
      this.current = next

      this.character.location.detail.assetId = next.el.id
      this.saveAll()

      triggerNoBubble(next.el, 'get-walker', { walker: this })

      this.turn(next.getAcceptDir())
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

  /**
   * Goes to the road.
   */
  goToRoad () {
    this.character.location.goToRoad()
    this.saveAll()
  }

  setLocationDetail ({ assetId, floorId }) {
    this.character.location.detail.floorId = floorId
    this.character.location.detail.assetId = assetId
  }
}

module.exports = FloorWalker
