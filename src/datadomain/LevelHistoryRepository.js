/**
 * LevelHistoryRepository is the repository class of LevelHistory.
 *
 * This repository saves and restores the LevelHistorys using infrastructure.storage persistence interface.
 *
 * The key of the storage is as follows:
 *
 * level-history-[charId]-[floorId]
 *
 * e.g. level-history-ma-7
 */
datadomain.LevelHistoryRepository = subclass(function (pt) {
  'use strict'

  /**
   * @constructor
   * @param {String} charId The character id
   */
  pt.constructor = function (charId) {
    this.charId = charId
    this.factory = new datadomain.LevelHistoryFactory()
  }

  /**
   * Gets the level histories (LevelHistoryCollection) by the floor.
   *
   * @param {String} floorId The floor id
   * @return {Promise}
   */
  pt.getByFloorId = function (floorId) {
    var that = this

    return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (array) {
      return that.factory.createCollectionFromArray(array)
    })
  }

  /**
   * Creates storage key name for the floor.
   *
   * @private
   * @param {String} floorId The floor id
   * @return {Promise}
   */
  pt.createStorageKey = function (floorId) {
    return 'level-history-' + this.charId + '-' + floorId
  }
})
