import {Animation, GridWalker} from 'spn'
import StaticSprite from '../../ui/sprite/static-sprite'
import {traits} from 'traits-decorator'

const {component} = $.cc

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 */
@component('paper')
@traits(StaticSprite)
export default class Paper extends GridWalker {

  constructor(elem) {
    super(elem)

    this.initSprite()
  }

  willShow() {
    this.updateSprite()

    return super.willShow()
  }

  width() { return 50 }
  height() { return 50 }
  ratioX() { return 0.5 }
  ratioY() { return 1 }

  image() { return 'img/paper.svg' }

  showAnim() { return new Animation('paper-appear', 500) }
  hideAnim() { return new Animation('paper-disappear', 500) }

}
