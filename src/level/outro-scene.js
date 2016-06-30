import Context from './context'
import PlaySceneLayout from './layout/play-scene-layout'
import BackgroundService from '../ui/common/background-service'
import Cell from './component/cell'

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

    .then(() => this.screenplay(this.goalAchieved() ? 'level-success' : 'level-failure').play())

    .then(() => this.hideResidents('moo'))

    .then(() => this.getCharacter().moveTo('y', 800, 1000))

    .then(() => BackgroundService.turnBlack())

    .then(() => history.back())
  }
}

module.exports = OutroScene
