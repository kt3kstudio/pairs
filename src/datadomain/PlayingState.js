/**
 * PlayingState model represents the current playing state of the level.
 */
datadomain.PlayingState = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     * @param {String} name The name of the character
     * @param {Array} [rounds] The directions
     */
    pt.constructor = function (rounds) {
        this.rounds = rounds || [];
    };

    /**
     * Creates initial state of the playing data.
     *
     * @param {String} name The name of the character
     * @return {datadomain.PlayingState}
     */
    pt.constructor.createInitialState = function () {

        var playingState = new pt.constructor();

        playingState.bump();

        return playingState;

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
