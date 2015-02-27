


/**
 * The model of offset of things on the screen.
 */
datadomain.Offset = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {Number} x The x coordinate value
     * @param {Number} y The y coordinate value
     */
    pt.constructor = function (x, y) {

        /**
         * @property {Number} x The x coordinate value
         */
        this.x = x;

        /**
         * @property {Number} y The y coordinate value
         */
        this.y = y;

    };

});
