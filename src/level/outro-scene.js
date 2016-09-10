const Context = require('./context')
const scene = require('../ui/scene')
const IntroSceneLayout = require('./layout/intro-scene-layout')
const PlaySceneLayout = require('./layout/play-scene-layout')
const Cell = require('./component/cell')
const CharacterRepository = require('../domain/character-repository')

const {Area, DIRS, wait} = require('spn')
const {img} = require('dom-gen')

const {component, on} = $.cc

/**
 * OutroScene handles the scene after finishing main play.
 */
@component
@scene
class OutroScene extends Context {
  @on('play-scene.finished') main () { super.main() }

  /**
   * Sets up the scene.
   *
   * @override
   */
  setUp () {
    const layout = new PlaySceneLayout()

    this.levelSignboard.setLeaving()

    this.resultPane.setRect(layout.resultPaneRect())
    this.resultPane.setScore(this.scoreboard.score)
    this.resultPane.setSuccess(this.goalAchieved())
  }

  /**
   * Starts the scene.
   *
   * @override
   */
  start () {
    return this.resultPane.show(30000000)

    .then(() => Cell.disappear())

    .then(() => {
      this.menuButton.hide()

      this.scoreboard.disappear()
      this.hideGoalPanel()

      return this.field.disappear()
    })

    .then(() => this.ball.goCenterX())

    .then(() => this.ball.goCenterY())

    .then(() => Promise.all([
      this.showResidents('moo'),
      this.hero.show(),
      this.hero.turn(DIRS.UP),
      this.ball.disappear()
    ]))

    .then(() => {
      if (!this.goalAchieved()) {
        return this.screenplay('level-failure').play()
      }

      return this.screenplay('level-success').play()

      .then(() => this.sequenceGivingLevelKey())

      .then(() => {
        const character = this.elem.data('character')

        const repository = new CharacterRepository()

        character.addKeyOf(this.elem.find('.level-signboard').attr('unlocks'))
        repository.save(character)
      })
    })

    .then(() => this.hero.elem.anim('jump', 300))

    .then(() => {
      this.hero.setTo(this.hero.getPoint().down($(window).height()))

      this.hero.engage(1000)

      return this.hideResidents('moo')
    })

    .then(() => wait(400))

    .then(() => this.levelSignboard.show())

    .then(() => wait(700))

    .then(() => this.levelSignboard.hide())

    .then(() => this.bg.turnBlack())

    .then(() => history.back())
  }

  /**
   * Plays the sequence where the residents gives the level key to the hero.
   * @return {Promise}
   */
  sequenceGivingLevelKey () {
    const leaderMoo = this.residents('moo')[0]

    const levelKey = img().cc.init('level-key')

    const layout = new IntroSceneLayout()

    levelKey.setAt(leaderMoo.getPoint())
    levelKey.setArea(Area.square(layout.main.width() / 6))

    this.elem.append(levelKey.elem)

    return levelKey.show()

    .then(() => {
      levelKey.setAt(this.hero.getPoint())
      return levelKey.engage(800)
    })

    .then(() => {
      this.hero.turn(DIRS.DOWN)
      return levelKey.disappear()
    })
  }
}

module.exports = OutroScene
