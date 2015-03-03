

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */
datadomain.PlayingStateRepository = subclass(function (pt) {
    'use strict';

    var PLAYING_DATA_KEY = '-playing-state';


    /**
     * Gets a playing state by the id
     */
    pt.getById = function (id) {

        return infrastructure.storage.get(name + PLAYING_DATA_KEY, null).then(function (data) {

            return data && new datadomain.PlayingState(data);

        });

    };

    pt.save = function (playState) {

        return infrastructure.storage.set(playState.name + PLAYING_DATA_KEY, playState.toObject());

    };

    /**
     * Clears the data by the id
     */
    pt.clearById = function (id) {

        return infrastructure.storage.set(name + PLAYING_DATA_KEY, null);

    };

});
