import CharSprite from '../../ui/sprite/char-sprite'
import {GridWalker, DIRS} from 'spn'
import Speaker from '../../ui/screenplay/speaker'
import {traits} from 'traits-decorator'

const {component} = $.cc

/**
 * The main character on the level scene.
 */
@traits(Speaker)
@traits(CharSprite)
@component('hero')
class Character extends GridWalker {
  constructor (elem) {
    super()

    this.initSprite(elem)
    this.setSpeaker(elem)
  }

  ratioX () { return 0.5 }
  ratioY () { return 1 }

  /**
   * @override
   */
  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  /**
   * @override
   */
  willHide () {
    this.elem.css('opacity', 0)
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveUpOnGrid () {
    this.turn(DIRS.UP)

    return super.moveUpOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveRightOnGrid () {
    this.turn(DIRS.RIGHT)

    return super.moveRightOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveDownOnGrid () {
    this.turn(DIRS.DOWN)

    return super.moveDownOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveLeftOnGrid () {
    this.turn(DIRS.LEFT)

    return super.moveLeftOnGrid()
  }
}

module.exports = Character
