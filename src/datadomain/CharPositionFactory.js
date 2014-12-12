
/**
 * @class
 * @singleton
 * CharPositionFactory handles the creation of CharPositions
 */
datadomain.CharPositionFactory = (function () {
    'use strict';

    var START_LEVEL = '701';
    var START_FLOOR = '7';

    var exports = {};

    exports.createStartPosition = function () {
        return new datadomain.CharPosition(START_LEVEL, START_FLOOR);
    };  

    exports.createFromObject = function (obj) {
        return new datadomain.CharPosition(obj.level, obj.floor);
    };  

    return exports;

}());
