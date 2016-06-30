import CharSprite from '../../ui/sprite/char-sprite'
import {GridWalker} from 'spn'
import Speaker from '../../ui/screenplay/speaker'
import {traits} from 'traits-decorator'

const {component} = $.cc

/**
 * The main character on the level scene.
 */
@traits(Speaker)
@traits(CharSprite)
@component('hero')
export default class Character extends GridWalker {
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
    this.turn('up')

    return super.moveUpOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveRightOnGrid () {
    this.turn('right')

    return super.moveRightOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveDownOnGrid () {
    this.turn('down')

    return super.moveDownOnGrid()
  }

  /**
   * Moves a unit upward along the grid.
   *
   * @return {Promise}
   */
  moveLeftOnGrid () {
    this.turn('left')

    return super.moveLeftOnGrid()
  }
}
