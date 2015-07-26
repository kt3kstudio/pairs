

/**
 * Dimension class shows the way to layout the element.
 *
 * VO
 *
 * @class
 */
domain.level.Dimension = subclass(function () {
    'use strict';

    /**
     * @constructor
     * @param {Object} obj
     */
    pt.constructor = function (obj) {

        /** @property {Numner} height The height */
        this.height = obj.height;

        /** @property {Numner} width The width */
        this.width = obj.width;

        /** @property {Numner} top The top offset */
        this.top = obj.top;

        /** @property {Numner} left The left offset */
        this.left = obj.left;

        /** @property {Numner} unit The unit of the (imaginary) belonging grid */
        this.unit = obj.unit;

    };

});
