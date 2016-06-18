import {Animation, GridWalker} from 'spn'

const {component} = $.cc

const TRANS_DUR = 150
const MAX = 3
const CENTER_M = 1
const CENTER_N = 1

/**
 * Ball class represents the ball inside the field of the level.
 *
 * @class
 */
@component('ball')
export default class Ball extends GridWalker {

  constructor(elem) {
    super()

    this.maxX = MAX
    this.maxY = MAX

    this.setGrid(elem.data('grid'), CENTER_M, CENTER_N)

    this.elem = elem
    this.setTransitionDuration(TRANS_DUR)
  }

  showAnim() { return new Animation('ball-appear', TRANS_DUR) }

  hideAnim() { return new Animation('ball-disappear', TRANS_DUR) }

  willShow() {

    return super.willShow().then(() => this.elem.css('display', 'inline'))

  }

  /**
   * Moves the ball to the direction.
   *
   * @param {String} dir
   * @return {Promise}
   */
  move(dir) {

    return this.setPos(this.posAhead(dir))

  }

  /**
   * Moves to the center in x dir.
   *
   * @return {Promise}
   */
  goCenterX() {

    return this.moveToM(CENTER_M)

  }

  /**
   * Moves to the center in y dir.
   *
   * @return {Promise}
   */
  goCenterY() {

    return this.moveToN(CENTER_N)

  }

  posAhead(dir) {

    switch (dir) {

      case 'up': return this.relativePos(0, -1)
      case 'down': return this.relativePos(0, 1)
      case 'left': return this.relativePos(-1, 0)
      case 'right': return this.relativePos(1, 0)

    }

  }

  relativePos(m, n) {

    return {m: (this.m + m + this.maxX) % this.maxX, n: (this.n + n + this.maxY) % this.maxY}

  }

  setPos(pos) {

    this.moveToGridPosition(pos.m, pos.n)

  }

  /**
   * Gets the current grid position.
   *
   * @return {Object}
   */
  pos() {

    return {m: this.m, n: this.n}

  }

  refuseToMove(dir) {

    if (dir === 'up' || dir === 'down') {

      return this.elem.anim('ball-refuse-y', TRANS_DUR)

    } else {

      return this.elem.anim('ball-refuse-x', TRANS_DUR)

    }

  }

}
