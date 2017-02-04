const { block, sprite } = require('../../ui')
const { width, height, ratio, Body } = require('spn')

const { component } = capsid

@width(100)
@height(100)
@ratio.x(0.5)
@ratio.y(1)
@sprite.static
@component
class Tree extends Body {

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

    return super.willShow()
  }

}

Tree.SHOW_DURATION

module.exports = Tree
