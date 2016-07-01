/**
 * UserStatistics is the collection class of user statistics info.
 */
class UserStatistics {
  /**
   * @param {object} opts The options
   * @param {number} [opts.launchTimes] The number of the launches of the app
   */
  constructor (opts) {
    /**
     * @property {number} launchTimes The number of the launches of the app
     */
    this.launchTimes = opts.launchTimes
  }
}

module.exports = UserStatistics
