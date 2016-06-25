/**
 * The collection class of LevelHistory.
 */
class LevelHistoryCollection {
  /**
   * @param {Array} list The array of the LevelHistories
   */
  constructor (list) {
    this.list = list || []

    this.dict = {}

    this.list.forEach((history, i) => {
      this.dict[history.levelId] = history
    })
  }

  /**
   * Gets a LevelHistory by the id.
   * @param {string} levelId The level id
   * @return {LevelHistory}
   */
  getById (levelId) {
    return this.dict[levelId]
  }

  /**
   * Returns the length of the collection.
   */
  length () {
    return this.list.length
  }
}

module.exports = LevelHistoryCollection
