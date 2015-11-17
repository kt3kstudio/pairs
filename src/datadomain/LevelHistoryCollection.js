/**
 * The collection class of LevelHistory.
 *
 * @class
 */
datadomain.LevelHistoryCollection = subclass(Array, function (pt) {
  'use strict'

  /**
   * @constructor
   *
   * @param {Array} list The array of the LevelHistories
   */
  pt.constructor = function (list) {
    list = list || []

    this.dict = {}

    list.forEach(function (history, i) {
      this[i] = history
      this.dict[history.levelId] = history

    }, this)

  }

  /**
   * Gets a LevelHistory by the id
   *
   * @param {String} levelId The level id
   * @return {datadomain.LevelHistory}
   */
  pt.getById = function (levelId) {
    return this.dict[levelId]

  }

})
