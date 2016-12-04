const { scene } = require('../ui')
const { User, Character } = require('../domain')
const { checkLocation } = require('../util/location')
const { img } = require('dom-gen')
const { Point } = require('spn')

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
    this.createHero(this.character).appendTo(this.el)
    return checkLocation(this.character.location, window.location)
  }

  start () {
    return this.bg.turnWhite()

    .then(() => this.window.show())

    .then(() => {
      const r = this.window.blockRect
      console.log('set at point', new Point(r.centerX(), r.bottom))
      this.hero.setAt(new Point(r.centerX(), r.bottom))
      this.hero.show()
    })
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
  @wire get hero () {}

  /**
   * creates the hero
   */
  createHero (character) {
    return img({ data: { character } }).cc('hero')
  }
}

module.exports = RoomScene
