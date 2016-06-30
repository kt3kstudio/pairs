import SceneContext from '../ui/scene-context'
require('./component')
require('./service')

const {wait} = require('spn')

/**
 * The common context for level scenes.
 */
class Context extends SceneContext {
  /**
   * Gets the field grid.
   * @return {Field}
   */
  getField () {
    return this.get('field-grid')
  }

  /**
   * Gets the character.
   * @return {Character}
   */
  getCharacter () {
    return this.get('hero')
  }

  /**
   * Gets the ball
   * @return {Ball}
   */
  getBall () {
    return this.get('ball')
  }

  /**
   * Gets the scoreboard.
   * @return {Scoreboard}
   */
  getScoreboard () {
    return this.get('scoreboard')
  }

  /**
   * Gets the goal-panel
   * @return {GoalPanel}
   */
  goalPanel () {
    return this.get('goal-panel')
  }

  /**
   * Gets the result pane.
   * @return {ResultPane}
   */
  getResultPane () {
    return this.get('result-pane')
  }

  /**
   * Gets the residents
   * @param {string} name The name of the residents
   * @return {Resident[]}
   */
  residents (name) {
    return this.elem.find('.' + name).toArray().map(dom => $(dom).cc.get(name))
  }

  /**
   * Gets the gene source.
   * @return {GeneSource}
   */
  geneSource () {
    return this.get('gene-source')
  }

  /**
   * Gets the scenes.
   */
  introScene () { return this.getAtElem('intro-scene') }
  playScene () { return this.getAtElem('play-scene') }
  outroScene () { return this.getAtElem('outro-scene') }

  /**
   * Gets the cells.
   * @return {CellCollection}
   */
  cells () {
    return this.getAtElem('cell-collection')
  }

  /**
   * Gets the fusion service.
   * @return {FusionService}
   */
  fusionService () {
    return this.getAtElem('fusion-service')
  }

  /**
   * Gets the screenplay managers.
   * @param {string} part The part of the screenplay (one of 'level-begining', 'level-failure' or 'level-success')
   * @return {Screenplay}
   */
  screenplay (part) {
    return this.elem.find('.screenplay.' + part).cc.get('screenplay')
  }

  /**
   * @return {CellQueueBumpService}
   */
  cellQueueBumpService () {
    return this.getAtElem('cell-queue-bump-service')
  }

  /**
   * Shows the residents.
   * @param {string} name The name of the residents to show
   * @return {Promise}
   */
  showResidents(name) {
    return Promise.all(this.residents(name).map(resident => wait(Math.random() * 500).then(() => resident.show())))
  }

  /**
   * Hides the residents.
   * @param {string} name The name of the residents to hide
   * @return {Promise}
   */
  hideResidents(name) {
    return Promise.all(this.residents(name).map(resident => resident.hide()))
  }

  /**
   * Shows the goal panel and its contents.
   * @param {string} goals The goal html
   * @return {Promise}
   */
  showGoalPanel (goals) {
    this.goalPanel().setGoals(goals)

    return this.goalPanel().show()
      .then(() => this.goalPanel().showGoals())
  }

  /**
   * Hides the goal panel.
   * @return {Promise}
   */
  hideGoalPanel () {
    return this.goalPanel().hide()
  }

  /**
   * Returns true iff the goals are achieved.
   * @return {boolean}
   */
  goalAchieved() {
    return this.goalPanel().isFull()
  }
}

module.exports = Context
