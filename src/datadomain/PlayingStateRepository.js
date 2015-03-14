

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */
datadomain.PlayingStateRepository = subclass(function (pt) {
    'use strict';

    var PLAYING_DATA_KEY = 'playing-state-';


    /**
     * Gets a playing state by the character id
     *
     * @param {String} id The character id
     * @return {Promise}
     */
    pt.getByCharId = function (id) {

        return infrastructure.storage.get(PLAYING_DATA_KEY + id, null).then(function (data) {

            if (data == null) {
                return new datadomain.PlayingState(id, [[]]);
            }

            return new datadomain.PlayingState(id, data.rounds);

        });

    };


    /**
     * Saves the playingState
     *
     * @return {Promise}
     */
    pt.save = function (playingState) {

        return infrastructure.storage.set(PLAYING_DATA_KEY + playingState.charId, this.toObject(playingState)).then(function () {

            return playingState;

        });

    };

    /**
     * Clears the data by the character id
     *
     * @param {String} id The character id
     * @return {Promise}
     */
    pt.clearByCharId = function (id) {

        return infrastructure.storage.set(id + PLAYING_DATA_KEY, null);

    };

    /**
     * @private
     * Converts to the object
     *
     * @param {datadomain.PlayingState} playingState The playing state
     * @return {Object}
     */
    pt.toObject = function (playingState) {

        return {
            charId: playingState.charId,
            rounds: playingState.rounds
        };

    };

});
