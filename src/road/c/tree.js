const { sprite, body } = require('../../ui')
const { on } = capsid

@sprite.static(`${global.BASEPATH}/img/tree.svg`)
@body({ width: 100, height: 100, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Tree {

  __init__ () {
    this.x = +this.el.getAttribute('x')
    this.y = +this.el.getAttribute('y')
  }

  @on('showing') __showing__ () {
    this.updateSprite()
  }

}

module.exports = Tree
