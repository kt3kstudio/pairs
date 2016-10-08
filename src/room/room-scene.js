const scene = require('../ui/scene')

@scene.primary
class RoomScene {
  start (elem) {
    console.log('room')
  }
}

module.exports = RoomScene
