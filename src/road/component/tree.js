const { sprite, body } = require('../../ui')
const { width, height, ratio, Body } = require('spn')

@sprite.static
@body({ width: 100, height: 100, ratio: { x: 0.5, y: 1 } })
class Tree {

  __init__ () {
    this.x = +this.el.getAttribute('x')
    this.y = +this.el.getAttribute('y')

    //const { x, y } = props(this.el)
    this.initSprite()
  }

  image () {
    return `${global.BASEPATH}/img/tree.svg`
  }

  /**
   * @override
   */
  willShow () {
    this.updateSprite()
  }

}

module.exports = Tree
