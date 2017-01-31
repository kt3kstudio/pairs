const { scene } = require('../ui')
const { checkLocation } = require('../util/location')
const { Character, User } = require('../domain')
const { img } = require('dom-gen')

const { init, wire } = capsid

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
    this.house.setRect(this.house.getRect())

    return this.bg.turnWhite()
      .then(() => this.ground.show())
      .then(() => this.house.show())

      .then(() => {
        this.background.$el.append(this.createHero())
        this.hero.setAt(this.house.getPoint())
        return this.hero.show()
      })
  }

  /**
   * @return {Hero}
   */
  createHero () {
    const $el = img().data('character', this.character)

    init('hero', $el[0])

    return $el
  }

  @wire get background () {}
  @wire get ground () {}
  @wire get house () {}
  @wire get hero () {}
}

module.exports = RoadScene
