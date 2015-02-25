
/**
 * Floor class is the domain model which represents each floor structure.
 *
 * @class
 */
datadomain.Floor = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} id The id of the floor (e.g. 7, 8)
     * @param {datadomain.FloorObjectCollection} objects The objects on the floor
     */
    pt.constructor = function (id, objects) {

        /**
         * @property {String} id The id of the floor
         */
        this.id = id;

        /**
         * @property {datadomain.FloorObjectCollection} objects The objects on the floor
         */
        this.objects = objects;

    };

});
