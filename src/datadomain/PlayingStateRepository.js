

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */
datadomain.PlayingStateRepository = (function () {
    'use strict';

    var PLAYING_DATA_KEY = '-playing-data';

    var exports = function () {
    };

    var pdrPt = exports.prototype;

    pdrPt.getPlayingState = function (name) {

        return infrastructure.storage.get(name + PLAYING_DATA_KEY, null).then(function (data) {

            return data && new datadomain.PlayingState.createFromObject(data);

        });

    };

    pdrPt.savePlayingState = function (name, playState) {
        infrastructure.storage.set(name + PLAYING_DATA_KEY, playData.toObject());
    };

    pdrPt.clearPlayingState = function (name) {
        infrastructure.storage.set(name + PLAYING_DATA_KEY, null);
    };

    return exports;

}());
