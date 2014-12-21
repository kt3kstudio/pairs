

/**
 * PlayingDataRepository is the repository class for PlayingData model.
 */
datadomain.PlayingDataRepository = (function () {
    'use strict';

    var PLAYING_DATA_KEY = '-playing-data';

    var exports = function () {
    };

    var pdrPt = exports.prototype;

    pdrPt.getPlayingData = function (name) {

        return infrastructure.storage.get(name + PLAYING_DATA_KEY, null).then(function (data) {

            return data && new datadomain.PlayingData.createFromObject(data);

        });

    };

    pdrPt.savePlayingData = function (name, playData) {
        infrastructure.storage.set(name + PLAYING_DATA_KEY, playData.toObject());
    };

    pdrPt.clearPlayingData = function (name) {
        infrastructure.storage.set(name + PLAYING_DATA_KEY, null);
    };

    return exports;

}());
