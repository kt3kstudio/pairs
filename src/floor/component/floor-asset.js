import {Grid, Body} from 'spn'

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */
class FloorAsset extends Body {
  width () { return 80 }
  height () { return 100 }
  ratioX () { return 0.5 }
  ratioY () { return 1 }

  constructor (elem) {
    super()

    this.x = +elem.attr('x')
    this.y = +elem.attr('y')

    this.id = elem.attr('id')
  }

  /**
   * Knocks the door (figuratively).
   */
  doorKnock () {
    this.elem.trigger('door-knock', [this])
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
    const frog = $('<img />').css({zIndex: 2}).appendTo(this.elem).cc.init('frog')

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
}

module.exports = FloorAsset
