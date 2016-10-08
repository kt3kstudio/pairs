const scene = require('../ui/scene')

/**
 * Road scene is the scene in which Ma move from his house to YGGS by taxi.
 */
@scene.primary
class RoadScene {
  start () {
    console.log('road')
  }
}

module.exports = RoadScene
