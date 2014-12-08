
/**
 * @class
 * CharPositionRepository handles the persistence of CharPosition data
 */
datadomain.CharPositionRepository = (function () {
    'use strict';

    var MA_POSITION_KEY = 'ma-position';

    var exports = function () {
    };

    var cprPt = exports.prototype;

    cprPt.getMaPosition = function () {

        return infrastructure.storage.get(MA_POSITION_KEY, null).then(function (data) {

            return data ? datadomain.CharPositionFactory.createFromObject(data)
                        : datadomain.CharPositionFactory.createStartPosition();
        });

    };

    cprPt.saveMaPosition = function (position) {
        return infrastructure.storage.set(MA_POSITION_KEY, position.toObject());
    };

    return exports;

}());
