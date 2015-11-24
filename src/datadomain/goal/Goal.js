/**
 * @class
 * @abstract
 *
 * Goal class is the model class of the goal of the level.
 */
datadomain.goal.Goal = (function () {
    'use strict'

    /**
     * @constructor
     * @param {String} type The type of the goal
     * @param {Object} [options] The options
     */
    var exports = function (type, options) {
        this.type = type
        this.options = options
    }

    var gPt = exports.prototype

    /**
     * Gets string representation.
     *
     * @abstract
     */
    gPt.toString = function () {}

    return exports
}())
