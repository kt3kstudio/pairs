const scene = require('../ui/scene')
const { User, Character } = require('../domain')
const { checkLocation } = require('../util/location')

@scene.primary
class RoomScene {
  load () {
    return new User.Repository().get()

    .then(user => new Character.InitService().getOrCreateById(user.charId))

    .then(character => { this.character = character })
  }

  setUp () {
    return checkLocation(this.character.location, window.location)
  }

  start (elem) {
    console.log('room')
  }
}

module.exports = RoomScene
