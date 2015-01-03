

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */
datadomain.PlayingStateRepository = (function () {
    'use strict';

    var PLAYING_DATA_KEY = '-playing-data';

    var exports = function () {
    };

    var pdrPt = exports.prototype;

    pdrPt.getByName = function (name) {

        return infrastructure.storage.get(name + PLAYING_DATA_KEY, null).then(function (data) {

            return data && new datadomain.PlayingState.createFromObject(name, data);

        });

    };

    pdrPt.save = function (playState) {
        infrastructure.storage.set(playState.name + PLAYING_DATA_KEY, playState.toObject());
    };

    pdrPt.clearByName = function (name) {
        infrastructure.storage.set(name + PLAYING_DATA_KEY, null);
    };

    return exports;

}());
