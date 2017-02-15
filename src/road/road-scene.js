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
    this.trees = []

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
        this.trees.push(tree)
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
      $('.window').animate({scrollLeft: 10000}, 7000)
    } else {
      this.car.goTo(this.house.getPoint().right(200))
      $('.window').animate({scrollLeft: 0}, 7000)
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

  sceneFadeOut () {
    this.car.hide()
    this.trees.forEach(tree => tree.hide())
    return this.entrance.hide()
      .then(() => {
        this.house.hide()
        return this.tower.hide()
      })
      .then(() => this.ground.hide())
      .then(() => this.bg.turnBlack())
  }

  @on('click-on-entrance') onClickOnEntrance (e) {
    this.character.location.goToTower()
    this.character.save()
    return this.hero.getInto(e.detail.entrance)
      .then(() => this.sceneFadeOut())
      .then(() => window.location.reload())
  }

  @on('click-on-room') onClickOnRoom (e) {
    this.character.location.goToRoom()
    this.character.save()
    return this.hero.getInto(e.detail.room)
      .then(() => this.sceneFadeOut())
      .then(() => window.location.reload())
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
