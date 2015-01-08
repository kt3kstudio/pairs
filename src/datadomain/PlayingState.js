/**
 * PlayingState model represents the current playing state of the level.
 */
datadomain.PlayingState = (function () {
    'use strict';


    /**
     * @constructor
     * @param {String} name The name of the character
     * @param {Array} [rounds] The directions
     */
    var exports = function (name, rounds) {
        this.name = name;
        this.rounds = rounds || [];
    };

    /**
     * Creates instance from the object.
     *
     * @param {String} name The name of the character
     * @param {Object} obj The source object
     * @param {Array} obj.dirs The list of directions
     */
    exports.createFromObject = function (name, obj) {
        return new exports(name, obj.rounds);
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


    pdPt.bump = function () {
        this.rounds.unshift([]);
    };


    /**
     * Gets object representation
     *
     * @return {Object}
     */
    pdPt.toObject = function () {
        return {
            rounds: this.rounds
        };
    };


    /**
     * Adds a direction
     *
     * @param {String} dir The direction
     */
    pdPt.add = function (dir) {
        this.rounds[0].push(dir);
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
                that.restoreFromObject(ps);
            }

            return that;
        });
    };

    pdPt.restoreFromObject = function (obj) {
        this.name = obj.name;
        this.rounds = obj.rounds;
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
