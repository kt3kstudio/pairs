const { scene } = require('../ui')
const { User, Character } = require('../domain')
const { checkLocation } = require('../util/location')
const { div, img } = require('dom-gen')
const { Point } = require('spn')

require('./component')

const { on, wire } = capsid

@scene.primary
class RoomScene {
  load () {
    return new User.Repository().get()

    .then(user => new Character.InitService().getOrCreateById(user.charId))

    .then(character => { this.character = character })
  }

  setUp () {
    return checkLocation(this.character.location, window.location)

      .then(() => this.createHero(this.character).appendTo(this.el))
      .then(() => this.createExit().appendTo(this.el))
  }

  start () {
    return this.bg.turnWhite()

    .then(() => this.window.show())

    .then(() => {
      const r = this.window.blockRect
      this.hero.setAt(new Point(r.centerX(), r.bottom + this.hero.actualHeight() + 15))
      return this.hero.show()
    })

    .then(() => {
      return this.exit.show()
    })
  }

  @wire get room () {}
  @wire get window () {}
  @wire get hero () {}
  @wire get exit () {}

  @on('exit-room') exitRoom () {
    this.character.location.goToRoad()
    this.character.save()

    this.hero.setTo(new Point(this.hero.x, $(window).height() + 100))

    return this.hero.engage()

    .then(() => {
      this.window.hide()
      this.exit.hide()
    })

    .then(() => this.bg.turnBlack())

    .then(() => window.location.reload())
  }

  /**
   * creates the hero (dom).
   * @return {jQuery}
   */
  createHero (character) {
    return img({ data: { character } }).cc('hero')
  }

  /**
   * Creates the exit (dom).
   * @return {jQuery}
   */
  createExit () {
    return div().cc('exit')
  }
}

module.exports = RoomScene
