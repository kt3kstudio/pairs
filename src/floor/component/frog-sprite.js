import StayRunSprite from '../../ui/sprite/stay-run-sprite'
import {traits} from 'traits-decorator'
import {Animation, GridWalker, decorators} from 'spn'
const {width, height, ratio} = decorators

const {component, on} = $.cc

/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */
@traits(StayRunSprite)
@width(100) @height(50) @ratio.x(0.5) @ratio.y(1)
@component('frog')
export default class FrogSprite extends GridWalker {

  constructor (elem) {
    super(elem)

    this.initSprite()
  }

  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  leftStayImage () { return 'img/frog-stay.out.svg' }
  leftRunImage () { return 'img/frog-run.out.svg' }

  awayDur () { return 400 }
  awayAnim () { return new Animation('foo', 400) }

  @on('click')
  jump () {
    this.elem.anim('jump', 300)
  }
}
