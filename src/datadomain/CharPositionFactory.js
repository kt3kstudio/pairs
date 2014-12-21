
/**
 * @class
 * @singleton
 * CharPositionFactory handles the creation of CharPositions
 */
datadomain.CharPositionFactory = (function () {
    'use strict';

    var START_WALL_POSITION= '701';
    var START_FLOOR = '7';

    var exports = {};

    exports.createStartPosition = function () {
        return new datadomain.CharPosition(START_WALL_POSITION, START_FLOOR);
    };  

    exports.createFromObject = function (obj) {
        return new datadomain.CharPosition(obj.wallPosition, obj.floor);
    };  

    return exports;

}());
