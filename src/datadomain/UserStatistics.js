/**
 * UserStatistics is the collection class of user statistics info.
 *
 */
datadomain.UserStatistics = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {Object} opts The options
     * @param {Number} [opts.launchTimes] The number of the launches of the app
     */
    pt.constuctor = function (opts) {
        /**
         * @property {Number} launchTimes The number of the launches of the app
         */
        this.launchTimes = opts.launchTimes
    }
})
