require('../level/component')
require('../level/service')
require('./debug-panel')
require('./cc-fixture-control')
require('./rect')
const scene = require('../ui/scene')
const block = require('../ui/block')
const {component, wire} = $.cc
const {div} = require('dom-gen')

@component
@block
@scene.primary
class BedScene {
  /**
   * @return {Rect}
   */
  @wire get rect () {}

  block (rect) {
    return rect.scaleLeft(0.5)
  }
  setUp () {
    this.elem.append(div({cc: 'rect'}))
    this.rect.setRect(this.initBlock())
    this.rect.show()
  }
  start () {
  }
}

module.exports = BedScene
