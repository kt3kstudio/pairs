const LevelHistoryCollection = require('./level-history-collection')
const LevelHistory = require('./level-history')

/**
 * The factory class for LevelHistory.
 */
class LevelHistoryFactory {
  /**
   * Creates a LevelHistoryCollection from the array.
   * @param {Array} array The array of the LevelHistories
   * @return {LevelHistoryCollection}
   */
  createCollectionFromArray (array) {
    if (!(array instanceof Array)) {
      array = []
    }

    return new LevelHistoryCollection(array.map(obj => this.createFromObject(obj)))
  }

  /**
   * Creates a LevelHistory from the object.
   * @param {Object} obj The object
   * @return {LevelHistory}
   */
  createFromObject (obj) {
    return new LevelHistory(
      obj.levelName,
      obj.score,
      obj.highestGene,
      obj.cleared,
      obj.clearedAt
    )
  }
}

module.exports = LevelHistoryFactory
