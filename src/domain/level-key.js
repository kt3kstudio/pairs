/**
 * LevelKey is domain model which unlocks the corresponding level.
 */
class LevelKey {
  /**
   * @param {string} levelId The id of the level
   */
  constructor (levelId) {
    this.levelId = levelId
  }
}

module.exports = LevelKey
