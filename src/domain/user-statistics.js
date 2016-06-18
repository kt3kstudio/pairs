/**
 * UserStatistics is the collection class of user statistics info.
 */
export default class UserStatistics {

  /**
   * @constructor
   * @param {Object} opts The options
   * @param {Number} [opts.launchTimes] The number of the launches of the app
   */
  constuctor(opts) {

    /**
     * @property {Number} launchTimes The number of the launches of the app
     */
    this.launchTimes = opts.launchTimes

  }

}
