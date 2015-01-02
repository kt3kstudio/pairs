/**
 * PlayingState model represents the current playing state of the level.
 */
datadomain.PlayingState = (function () {
    'use strict';


    /**
     * @constructor
     * @param {Array} dirs The directions
     */
    var exports = function (dirs) {
        this.dirs = dirs;
    };

    /**
     * Creates instance from the object.
     *
     * @param {Object} obj The source object
     * @param {Array} obj.dirs The list of directions
     */
    exports.createFromObject = function (obj) {
        return new exports(obj.dirs);
    };

    /**
     * Creates initial state of the playing data.
     *
     * @return {datadomain.PlayingState}
     */
    exports.createInitialStateData = function () {
        return new exports([]);
    };

    var pdPt = exports.prototype;


    /**
     * Gets object representation
     *
     * @return {Object}
     */
    pdPt.toObject = function () {
        return {
            dirs: this.dirs
        };
    };


    /**
     * Adds direction
     *
     * @param {String} dir The direction.
     */
    pdPt.addDirection = function (dir) {
        this.dirs.push(dir);
    };

    return exports;

}());
