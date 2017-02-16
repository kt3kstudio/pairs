const { sprite } = require('../../ui')
const { Animation, GridWalker, width, height, ratio } = require('spn')

const { component, on } = capsid

/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */
@sprite.stayRun
@width(100) @height(50) @ratio.x(0.5) @ratio.y(1)
@component('frog')
class FrogSprite extends GridWalker {

  __init__ () {
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
    this.$el.anim('jump', 300).then(() => this.$el.anim('-', 300))
  }
}

module.exports = FrogSprite
