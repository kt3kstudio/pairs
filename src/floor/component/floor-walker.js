const CharSprite = require('../../ui/sprite/char-sprite')
const CharacterRepository = require('../../domain/character-repository')
const {traits} = require('traits-decorator')
const {Body, decorators, DIRS} = require('spn')
const {ratio} = decorators

const {component, on} = $.cc

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 */
@traits(CharSprite)
@ratio.x(0.5) @ratio.y(1)
@component('floor-walker')
class FloorWalker extends Body {

  constructor (elem) {
    super()

    this.initSprite(elem)

    this.characterRepository = new CharacterRepository()
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

    this.x = floorAsset.x
    this.y = floorAsset.y

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
  doorKnock (e, floorAsset) {
    this.moveToFloorAsset(floorAsset)
  }

  /**
   * Character goes to another floor.
   * @param {Event} e The event object
   */
  @on('character-goto')
  characterGoto (e) {
    this.character.position.floorId = e.goto.floorId
    this.character.position.floorObjectId = e.goto.floorObjectId

    this.saveCharacter().then(() => this.elem.trigger('sceneReload'))
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

    this.saveCharacter()
  }

  /**
   * Saves the character data.
   */
  saveCharacter () {
    return this.characterRepository.save(this.character)
  }

  /**
   * Moves the character sprite to wall object
   *
   * @param {FloorAsset} floorAsset The wall object to go to
   * @return {Promise}
   */
  moveToFloorAsset (floorAsset) {
    const current = this.current

    this.setFloorObjectId(floorAsset.id)

    const goOutDur = 220
    const moveOnCorridor = 300
    const goIntoDur = goOutDur

    const goOutDistance = 80

    this.elem.trigger('character-focus', [current.x])

    current.close()

    return this.moveTo('y', current.y + goOutDistance, goOutDur)

    .then(() => {
      this.elem.trigger('character-move', [floorAsset.x, moveOnCorridor])

      floorAsset.open()

      return this.moveTo('x', floorAsset.x, moveOnCorridor)
    })

    .then(() => this.moveTo('y', floorAsset.y, goIntoDur))

    .then(() => {
      this.current = floorAsset

      floorAsset.onGetWalker(this)

      return this.turn(DIRS.DOWN)
    })
  }

  /**
   * Gets the character into the door.
   */
  getIntoDoor () {
    this.turn(DIRS.UP)

    return this.disappear().then(() => this.current.close())
  }
}

module.exports = FloorWalker
