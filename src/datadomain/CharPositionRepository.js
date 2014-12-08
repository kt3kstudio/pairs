
/**
 * @class
 * CharPositionRepository handles the persistence of CharPosition data
 */
datadomain.CharPositionRepository = (function () {
    'use strict';

    var CHAR_POSITION_KEY = '-char-position';

    var exports = function () {
    };

    var cprPt = exports.prototype;

    cprPt.getCharPosition = function (name) {

        return infrastructure.storage.get(this.createKey(name), null).then(function (data) {

            return data ? datadomain.CharPositionFactory.createFromObject(data)
                        : datadomain.CharPositionFactory.createStartPosition();
        });

    };

    cprPt.setCharPosition = function (name, position) {
        return infrastructure.storage.set(this.createKey(name), position.toObject());
    };

    cprPt.createKey = function (name) {
        return name + CHAR_POSITION_KEY;
    };

    return exports;

}());
