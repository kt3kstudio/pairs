

/**
 * Dimension class shows the way to layout the element.
 *
 * VO
 *
 * @class
 */
domain.level.Dimension = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {Object} obj
     */
    pt.constructor = function (obj) {

        /**
         * @property {Number} height The height
         */
        this.height = obj.height;

        /**
         * @property {Number} width The width
         */
        this.width = obj.width;

        /**
         * @property {Number} top The top offset
         */
        this.top = obj.top;

        /**
         * @property {Number} left The left offset
         */
        this.left = obj.left;

        /**
         * @property {Number} unit The unit of the (imaginary) belonging grid
         */
        this.unit = obj.unit;

        this.originX = obj.originX;
        this.originY = obj.originY;

        this.unitX = obj.unitX;
        this.unitY = obj.unitY;

        this.marginX = obj.marginX;
        this.marginY = obj.marginY;

    };

    pt.actualHeight = function () {

        Math.max(0, this.height - this.marginY * 2);

    };

    pt.actualWidth = function () {

        Math.max(0, this.width - this.marginX * 2);

    };

});
