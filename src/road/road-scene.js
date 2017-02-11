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

    const TREE_MAX = 97

    return this.bg.turnWhite()
      .then(() => $('.window').scrollLeft(10000))
      .then(() => this.ground.show())
      .then(() => {
        this.tower.show()

        return this.house.show()
      })
      .then(() => [...Array(TREE_MAX)].map((_, i) => {
        const tree = this.createTree(100 * i + 50)
        this.background.el.insertBefore(tree.el, this.car.el)

        return wait(Math.min(i, TREE_MAX - i) * 50).then(() => tree.show())
      })[0])
      .then(() => {
        this.car.setAt(this.house.getPoint().right(200))

        return this.car.show()
      })
      .then(() => {
        this.background.el.appendChild(this.createHero(this.character).el)
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
    const el = img().data('character', character)[0]

    el.classList.add('sub-click-on-car')

    return make('hero', el)
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
  @wire get car () {}
  @wire get ground () {}
  @wire get house () {}
  @wire get hero () {}
  @wire get tower () {}
}

module.exports = RoadScene
