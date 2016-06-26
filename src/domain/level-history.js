/**
 * LevelHistory is model class which represents the history of the level clearance.
 */
class LevelHistory {
  /**
   * @constructor
   * @param {string} levelId The id of the level
   * @param {number} score The score
   * @param {boolean} cleared If cleared or not
   * @param {Date} clearedAt The datetime of the clear
   */
  constructor (levelId, score, cleared, clearedAt) {
    /**
     * @property {String} levelId The id of the level
     */
    this.levelId = levelId

    /**
     * @property {Number} score The score
     */
    this.score = score

    /**
     * @property {Boolean} cleared If cleared or not
     */
    this.cleared = cleared

    /**
     * @property {Date} clearedAt The datetime of the clear
     */
    this.clearedAt = clearedAt
  }
}

module.exports = LevelHistory
