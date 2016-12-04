const { scene } = require('../ui')
const { User, Character } = require('../domain')
const { checkLocation } = require('../util/location')

require('./component')

const { on, wire } = $.cc

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

  start () {
    return this.bg.turnWhite()

    .then(() => this.window.show())
  }

  @on('exit-room') exit () {
    this.character.location.goToRoad()
    this.character.save()

    return this.bg.turnBlack().then(() => {
      window.location.reload()
    })
  }

  @wire get room () {}

  @wire get window () {}
}

module.exports = RoomScene
