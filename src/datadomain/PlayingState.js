/**
 * PlayingState model represents the current playing state of the level.
 *
 * [ValueObject]
 */
datadomain.PlayingState = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     * @param {String} charId The character id
     * @param {String} levelId The level id
     * @param {Array} [rounds] The directions
     */
    pt.constructor = function (charId, levelId, rounds) {
        this.charId = charId;
        this.levelId = levelId;
        this.rounds = rounds || [[]];
    };


    /**
     * Moves to the next round.
     */
    pt.bump = function () {

        this.rounds.unshift([]);

    };

    /**
     * Releases the round data and init the obj state.
     *
     * @return {Array} The array of round data
     */
    pt.release = function () {

        var rounds = this.rounds.splice(0).reverse();

        this.bump();

        return rounds;

    };


    /**
     * Adds a direction
     *
     * @param {String} dir The direction
     */
    pt.add = function (dir) {
        this.rounds[0].push(dir);
    };


});
