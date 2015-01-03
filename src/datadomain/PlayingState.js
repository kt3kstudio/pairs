/**
 * PlayingState model represents the current playing state of the level.
 */
datadomain.PlayingState = (function () {
    'use strict';


    /**
     * @constructor
     * @param {Array} dirs The directions
     */
    var exports = function (name, dirs) {
        this.name = name;
        this.dirs = dirs;
    };

    /**
     * Creates instance from the object.
     *
     * @param {String} name The name of the character
     * @param {Object} obj The source object
     * @param {Array} obj.dirs The list of directions
     */
    exports.createFromObject = function (name, obj) {
        return new exports(name, obj.dirs);
    };

    /**
     * Creates initial state of the playing data.
     *
     * @param {String} name The name of the character
     * @return {datadomain.PlayingState}
     */
    exports.createInitialState = function (name) {
        return new exports(name, []);
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


    /**
     * Restores from the saved object.
     *
     * @return {Promise}
     */
    pdPt.restore = function () {
        var that = this;

        var repo = new datadomain.PlayingStateRepository();

        return repo.getByName(this.name).then(function (ps) {

            if (ps) {

                that.name = ps.name;
                that.dirs = ps.dirs;

            }

            return that;
        });
    };


    /**
     * Saves the current state.
     *
     * @param {Promise}
     */
    pdPt.save = function () {
        var repo = new datadomain.PlayingStateRepository();

        return repo.save(this);
    };

    return exports;

}());
