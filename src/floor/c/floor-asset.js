const { Grid, Body, width, height, ratio } = require('spn')

const { DIRS } = require('../../ui')
const { trigger } = require('../../util')

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */
@width(80)
@height(100)
@ratio.x(0.5)
@ratio.y(1)
class FloorAsset extends Body {
  __init__ () {
    this.x = +this.$el.attr('x')
    this.y = +this.$el.attr('y')
  }

  /**
   * Knocks the door (figuratively).
   */
  doorKnock () {
    trigger(this.el, 'door-knock', { knocked: this })
  }

  /**
   * @abstract
   */
  open () {
    return Promise.resolve()
  }

  /**
   * @abstract
   */
  close () {
    return Promise.resolve()
  }

  /**
   * Spawn the frog to the front of the floor asset.
   */
  spawnFrog () {
    const frog = $('<img />').css({zIndex: 2}).appendTo(this.elem).cc('frog').cc.get('frog')

    frog.setGrid(new Grid({x: 35, y: 130, unitWidth: 100, unitHeight: 100}))

    frog.show()
  }

  /**
   * Removes the frog in front of the floor asset.
   */
  removeFrog () {
    const frogDom = this.elem.find('.frog')

    if (frogDom.length === 0) {
      return
    }

    const frog = frogDom.cc.get('frog')

    if (frog == null) {
      return
    }

    frog.runAwayRight()
  }

  /**
   * Unlocks the door.
   */
  unlock () {
    this.locked = false

    if (typeof this.enableDoorKnock === 'function') this.enableDoorKnock()

    this.removeFrog()
  }

  getAcceptDir () {
    return DIRS.DOWN
  }

  getAcceptPoint () {
    return this.getPoint()
  }
}

module.exports = FloorAsset
