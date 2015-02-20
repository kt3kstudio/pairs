



/**
 * The collection class of the FloorObject.
 *
 * [ValueObject]
 * [AggregateRoot]
 *
 * @class
 */
datadomain.FloorObjectCollection = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {Array} objects The array of the FloorObjects
     */
    pt.constructor = function (objects) {

        /**
         * @property {Array} objects The array of the FloorObjects
         */
        this.objects = objects;
    };

});
