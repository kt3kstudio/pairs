const scene = require('../ui/scene')
const { checkLocation } = require('../util/location')
const { Character, User } = require('../domain')

/**
 * Road scene is the scene in which Ma move from his house to YGGS by taxi.
 */
@scene.primary
class RoadScene {
  /**
   * Loads the data for the scene.
   */
  load () {
    return new User.Repository().get()

    .then(user => new Character.InitService().getOrCreateById(user.charId))

    .then(character => { this.character = character })
  }

  setUp () {
    return checkLocation(this.character.location, window.location)
  }

  start () {
  }
}

module.exports = RoadScene
