require('../level/component')
require('../level/service')
require('./debug-panel')
const SceneContext = require('../ui/scene-context')
const {component, event, wire} = $.cc
const {h1} = require('dom-gen')

@component
@event('scene-start', 'main')
class BedScene extends SceneContext {
  start () {}
}

module.exports = BedScene
