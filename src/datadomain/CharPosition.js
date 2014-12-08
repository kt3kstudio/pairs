
/**
 * @class
 * CharPosition is the domain model which represents current position of characters.
 */
datadomain.CharPosition = (function () {
    'use strict';

    var exports = function (level, floor) {
        this.level = level;
        this.floor = floor;
    };

    var charPosPt = exports.prototype;

    charPosPt.toObject = function () {
        return {
            level: this.level,
            floor: this.floor
        };
    };

    return exports;

}());
