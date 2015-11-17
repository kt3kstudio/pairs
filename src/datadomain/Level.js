/**
 * The level model.
 *
 * [AggregateRoot]
 *
 * @class
 */
datadomain.Level = subclass(function (pt) {
  'use strict'

  /**
   * @constructor
   * @param {String} id The id
   * @param {datadomain.goal.Goal} goal The goal
   * @param {datadomain.CellCollection} cells The collection of the cells
   */
  pt.constructor = function (id, goal, cells) {
    /**
     * @property {String} id The id
     */
    this.id = id

    /**
     * @property {datadomain.goal.Goal} goal The goal
     */
    this.goal = goal

    /**
     * @property {datadomain.CellCollection} cells The collection of the cells
     */
    this.cells = cells
  }

})
