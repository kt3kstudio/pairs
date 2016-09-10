require('./component')
require('./service')

const {wait} = require('spn')
const {wire} = $.cc

/**
 * The common context for level scenes.
 */
class Context {

  /** @return {LevelSignboard} */
  @wire get levelSignboard () {}

  /**
   * Gets the field grid.
   * @return {Field}
   */
  @wire('field-grid') get field () {}

  /**
   * Gets the character.
   * @return {Character}
   */
  @wire get hero () {}

  /**
   * Gets the ball
   * @return {Ball}
   */
  @wire get ball () {}

  /**
   * Gets the scoreboard.
   * @return {Scoreboard}
   */
  @wire get scoreboard () {}

  /**
   * Gets the goal-panel
   * @return {GoalPanel}
   */
  @wire get goalPanel () {}

  /**
   * Gets the result pane.
   * @return {ResultPane}
   */
  @wire get resultPane () {}

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
  @wire get geneSource () {}

  /**
   * Gets the scenes.
   */
  @wire get introScene () {}
  @wire get playScene () {}
  @wire get outroScene () {}

  /**
   * Gets the cells.
   * @return {CellCollection}
   */
  @wire('cell-collection') get cells () {}

  /**
   * Gets the fusion service.
   * @return {FusionService}
   */
  @wire get fusionService () {}

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
  @wire get cellQueueBumpService () {}

  /**
   * Shows the residents.
   * @param {string} name The name of the residents to show
   * @return {Promise}
   */
  showResidents (name) {
    return Promise.all(this.residents(name).map(resident => wait(Math.random() * 500).then(() => resident.show())))
  }

  /**
   * Hides the residents.
   * @param {string} name The name of the residents to hide
   * @return {Promise}
   */
  hideResidents (name) {
    return Promise.all(this.residents(name).map(resident => resident.hide()))
  }

  /**
   * Shows the goal panel and its contents.
   * @param {string} goals The goal html
   * @return {Promise}
   */
  showGoalPanel (goals) {
    this.goalPanel.setGoals(goals)

    return this.goalPanel.show()
      .then(() => this.goalPanel.showGoals())
  }

  /**
   * Hides the goal panel.
   * @return {Promise}
   */
  hideGoalPanel () {
    return this.goalPanel.hide()
  }

  /**
   * Returns true iff the goals are achieved.
   * @return {boolean}
   */
  goalAchieved () {
    return this.goalPanel.isFull()
  }
}

module.exports = Context
