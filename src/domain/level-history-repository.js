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
   * @param {string} charId The character id
   */
  constructor (charId) {
    this.charId = charId
    this.factory = new LevelHistoryFactory()
  }

  /**
   * Gets the level histories (LevelHistoryCollection) by the floor id.
   * @param {string} floorId The floor id
   * @return {Promise}
   */
  getByFloorId (floorId) {
    return infrastructure.storage.get(this.createStorageKey(floorId), [])
    .then(array => {
      return this.factory.createCollectionFromArray(array)
    })
  }

  /**
   * Saves the level histories for the floor id.
   * @param {string} floorId The floor id
   * @param {LevelHistoryCollection} histories The history collection
   * @return {Promise}
   */
  saveForFloorId (floorId, histories) {
    return infrastructure.storage.set(this.createStorageKey(floorId), this.collectionToArray(histories))
  }

  /**
   * Converts the collection to an array.
   * @param {LevelHistoryCollection}
   * @return {object[]}
   */
  collectionToArray (collection) {
    return collection.list.map(history => this.toObject(history))
  }

  /**
   * Converts the history to an object.
   * @param {LevelHistory} levelHistory
   * @return {object}
   */
  toObject (history) {
    return {
      levelId: history.levelId,
      score: history.score,
      cleared: history.cleared,
      clearedAt: history.clearedAt
    }
  }

  /**
   * Creates storage key name for the floor.
   * @private
   * @param {string} floorId The floor id
   * @return {Promise}
   */
  createStorageKey (floorId) {
    return 'level-history-' + this.charId + '-' + floorId
  }
}

module.exports = LevelHistoryRepository
