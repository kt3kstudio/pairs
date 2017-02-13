const { scene } = require('../ui')
const { checkLocation } = require('../util/location')
const { Character, User, Location } = require('../domain')
const { img } = require('dom-gen')
const { wait, DIRS } = require('spn')

const { PLACE } = Location
const { on, make, wire } = capsid

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

    const TREE_MAX = 95

    return this.bg.turnWhite()
      .then(() => this.ground.show())
      .then(() => {
        if (this.heroIsAtRoom()) {
          $('.window').scrollLeft(0)
        } else {
          $('.window').scrollLeft(10000)
        }
        this.tower.show().then(() => this.entrance.show())

        return this.house.show()
      })
      .then(() => [...Array(TREE_MAX)].map((_, i) => {
        const tree = this.createTree(100 * i + 150)
        this.background.el.insertBefore(tree.el, this.car.el)

        return wait(Math.min(i, TREE_MAX - i) * 50).then(() => tree.show())
      })[0])
      .then(() => {
        if (this.heroIsAtRoom()) {
          this.car.setAt(this.house.getPoint().right(200))
        } else {
          this.car.setAt(this.entrance.getPoint().left(300))
        }

        return this.car.show()
      })
      .then(() => {
        this.background.el.appendChild(this.createHero(this.character).el)

        if (this.heroIsAtRoom()) {
          this.hero.setAt(this.house.getPoint())
        } else {
          this.hero.setAt(this.entrance.getPoint())
        }

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

  heroIsAtRoom () {
    return this.character.location.detail.place === PLACE.ROOM
  }

  @on('get-on-car') onGetOnCar () {
    if (this.heroIsAtRoom()) {
      this.car.goTo(this.entrance.getPoint().left(500))
    } else {
      this.car.goTo(this.house.getPoint().right(200))
    }
  }

  @on('arrive-to-destination') onArrive () {
    this.hero.setAt(this.car.getPoint())
    this.hero.turn(DIRS.DOWN)
    this.hero.engage(0)

    if (this.heroIsAtRoom()) {
      this.character.location.detail.moveToTower()
    } else {
      this.character.location.detail.moveToRoom()
    }

    this.character.save()

    return this.hero.show()
  }

  @on('click-on-entrance') onClickOnEntrance (e) {
    return this.hero.getInto(e.detail.entrance)
  }

  @on('click-on-room') onClickOnRoom (e) {
    return this.hero.getInto(e.detail.room)
  }

  @wire get background () {}
  @wire get car () {}
  @wire get entrance () {}
  @wire get ground () {}
  @wire get house () {}
  @wire get hero () {}
  @wire get tower () {}
}

module.exports = RoadScene
