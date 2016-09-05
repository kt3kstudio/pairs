require('../level/component')
require('../level/service')
require('./debug-panel')
require('./cc-fixture-control')
require('./rect')
const SceneContext = require('../ui/scene-context')
const block = require('../ui/block')
const {component, event, wire} = $.cc
const {div} = require('dom-gen')

@component
@block
@event('scene-start', 'main')
class BedScene extends SceneContext {
  /**
   * @return {Rect}
   */
  @wire get rect () {}

  block (rect) {
    return rect.scaleLeft(0.5)
  }
  setUp() {
    this.elem.append(div({cc: 'rect'}))
    this.rect.setRect(this.initBlock())
    this.rect.show()
  }
  start () {
  }
}

module.exports = BedScene
