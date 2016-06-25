const LevelHistoryFactory = require('./level-history-factory')

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
class LevelHistoryRepository {
  /**
   * @constructor
   * @param {String} charId The character id
   */
  constructor (charId) {
    this.charId = charId
    this.factory = new LevelHistoryFactory()
  }

  /**
   * Gets the level histories (LevelHistoryCollection) by the floor.
   * @param {String} floorId The floor id
   * @return {Promise}
   */
  getByFloorId (floorId) {
    return infrastructure.storage.get(this.createStorageKey(floorId), [])
    .then(array => {
      return this.factory.createCollectionFromArray(array)
    })
  }

  /**
   * Creates storage key name for the floor.
   * @private
   * @param {String} floorId The floor id
   * @return {Promise}
   */
  createStorageKey (floorId) {
    return 'level-history-' + this.charId + '-' + floorId
  }
}

module.exports = LevelHistoryRepository
