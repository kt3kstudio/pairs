const { Grid, Body, width, height, ratio } = require('spn')

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
    const elem = this.$el

    this.x = +elem.attr('x')
    this.y = +elem.attr('y')

    this.id = elem.attr('id')
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
   * The handler when it gets the walker.
   *
   * @abstract
   */
  onGetWalker () {
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

    this.enableDoorKnock()

    this.removeFrog()
  }
}

module.exports = FloorAsset
