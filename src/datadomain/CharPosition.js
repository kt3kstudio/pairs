
/**
 * @class
 * CharPosition is the domain model which represents current position of characters.
 */
datadomain.CharPosition = (function () {
    'use strict';


    /**
     * @constructor
     * @param
     */
    var exports = function (wallPosition, floor) {
        this.wallPosition = wallPosition;
        this.floor = floor;
    };

    var charPosPt = exports.prototype;

    /**
     * Returns the object representation of the character's position
     *
     * @return {Object}
     */
    charPosPt.toObject = function () {
        return {
            wallPosition: this.wallPosition,
            floor: this.floor
        };
    };

    /**
     *
     */
    charPosPt.getLevel = function () {
        return this.wallPosition;
    };

    return exports;

}());
