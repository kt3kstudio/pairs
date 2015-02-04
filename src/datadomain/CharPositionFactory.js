
/**
 * @class
 * CharPositionFactory handles the creation of CharPositions.
 */
datadomain.CharPositionFactory = subclass(function (pt) {
    'use strict';

    var START_WALL_POSITION= '701';
    var START_FLOOR = '7';

    /**
     * Creates the start position.
     *
     * @return {datadomain.CharPosition}
     */
    pt.createStartPosition = function () {
        return new datadomain.CharPosition(START_WALL_POSITION, START_FLOOR);
    };  


    /**
     * Creates char position object from the object.
     *
     * @param {Object} obj The object
     * @return {datadomain.CharPosition}
     */
    pt.createFromObject = function (obj) {
        return new datadomain.CharPosition(obj.wallPosition, obj.floor);
    };  

});
