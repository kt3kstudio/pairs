/**
 * The model of user.
 */
class User {
  /**
   * @param {string} charId The id of the character currently chosen
   * @param {UserStatistics} stat The statisctics of the user activity
   */
  constructor (charId, stat) {
    /**
     * @property {String} charId The id of the character currently chosen
     */
    this.charId = charId

    /**
     * @property {UserStatistics} stat The statisctics of the user activity
     */
    this.stat = stat
  }
}

module.exports = User
