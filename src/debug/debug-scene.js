require('../level/component')
require('../level/service')
require('./debug-panel')
require('./cc-fixture-control')
require('./rect')
const scene = require('../ui/scene')
const block = require('../ui/block')
const {wire} = $.cc
const {div} = require('dom-gen')

@block
@scene.primary
class DebugScene {
  /**
   * @return {Rect}
   */
  @wire get rect () {}

  block (rect) {
    return rect
      .scaleLeft(9 / 10)
      .scaleRight(8 / 9)
      .scaleTop(9 / 10)
      .scaleBottom(8 / 9)
  }
  setUp () {
    this.elem.append(div({cc: 'rect'}))
    this.rect.setRect(this.getRect())
    this.rect.show()
  }
  start () {
  }
}

module.exports = DebugScene
