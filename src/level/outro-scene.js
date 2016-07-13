import Context from './context'
import IntroSceneLayout from './layout/intro-scene-layout'
import PlaySceneLayout from './layout/play-scene-layout'
import BackgroundService from '../ui/common/background-service'
import Cell from './component/cell'

const {Area} = require('spn')
const {img} = require('dom-gen')

const {component, on} = $.cc

/**
 * OutroScene handles the scene after finishing main play.
 */
@component('outro-scene')
class OutroScene extends Context {
  @on('play-scene.finished')
  main () { super.main() }

  /**
   * Sets up the scene.
   *
   * @override
   */
  setUp () {
    const layout = new PlaySceneLayout()

    this.getResultPane().setRect(layout.resultPaneRect())
    this.getResultPane().setScore(this.getScoreboard().score)
    this.getResultPane().setSuccess(this.goalAchieved())
  }

  /**
   * Starts the scene.
   *
   * @override
   */
  start () {
    return this.getResultPane().show(30000000)

    .then(() => Cell.disappear())

    .then(() => {
      this.getMenuButton().hide()

      this.getScoreboard().disappear()
      this.hideGoalPanel()

      return this.getField().disappear()
    })

    .then(() => this.getBall().goCenterX())

    .then(() => this.getBall().goCenterY())

    .then(() => Promise.all([
      this.showResidents('moo'),
      this.getCharacter().show(),
      this.getBall().disappear()
    ]))

    .then(() => {
      if (!this.goalAchieved()) {
        return this.screenplay('level-failure').play()
      }

      return this.screenplay('level-success').play()

      .then(() => this.sequenceGivingLevelKey())

      .then(() => {
        const character = this.elem.data('character')

        character.addKeyOf(character.getFloorObjectId())
      })
    })

    .then(() => this.hideResidents('moo'))

    .then(() => this.getCharacter().moveTo('y', 800, 1000))

    .then(() => BackgroundService.turnBlack())

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
    levelKey.setArea(Area.square(layout.main.width() / 10))
    levelKey.setTransitionDuration(800)

    this.elem.append(levelKey.elem)

    return levelKey.show()

    .then(() => {
      levelKey.setAt(this.getCharacter().getPoint())

      return levelKey.engage()
    })

    .then(() => levelKey.hide())
  }
}

module.exports = OutroScene
