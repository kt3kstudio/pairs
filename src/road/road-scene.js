const { scene } = require('../ui')
const { checkLocation } = require('../util/location')
const { Character, User } = require('../domain')
const { img } = require('dom-gen')
const { wait } = require('spn')

const { make, wire } = capsid

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
        [...Array(100)].map((_, i) => {
          const tree = this.createTree(100 * i + 50)
          this.background.el.appendChild(tree.el)

          wait(i * 50).then(() => tree.show())
        })

        return this.house.show()
      })

      .then(() => {
        this.background.$el.append(this.createHero(this.character).el)
        this.hero.setAt(this.house.getPoint())
        return this.hero.show()
      })
  }

  /**
   * creates a hero.
   * @param {Character} character The character
   * @return {Hero}
   */
  createHero (character) {
    const $el = img().data('character', character)

    return make('hero', $el[0])
  }

  /**
   * creates a tree.
   * @param {number} left The left
   * @return {Tree}
   */
  createTree (left) {
    const el = img({ attr: { x: left, y: this.house.getPoint().y } })[0]

    const tree = make('tree', el)

    return tree
  }

  @wire get background () {}
  @wire get ground () {}
  @wire get house () {}
  @wire get hero () {}
}

module.exports = RoadScene
