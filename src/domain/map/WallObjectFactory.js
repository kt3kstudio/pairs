

/**
 * WallObjectFactory is the factory class for wall objects.
 */
domain.map.WallObjectFactory = (function () {
    'use strict';

    var exports = function () {
    };


    /**
     * Creates wall object from js object.
     *
     * @param {Object} obj The source object
     * @return {domain.map.WallObject}
     */
    exports.createFromObject = function (obj) {

        switch (obj.type) {
            case 'l': return new domain.map.Door.createFromObject(obj);
            case 's': return new domain.map.Staircase.createFromObject(obj);
            case 'e': return new domain.map.Elevator.createFromObject(obj);
        }

    };

    return exports;

}());
