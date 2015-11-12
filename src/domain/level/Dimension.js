

/**
 * Dimension class shows the way to layout the element.
 *
 * VO
 *
 * @class
 */
domain.level.Dimension = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {Object} obj
     */
    pt.constructor = function (obj) {

        /**
         * @property {Number} height The height
         */
        this.height = obj.height

        /**
         * @property {Number} width The width
         */
        this.width = obj.width

        /**
         * @property {Number} top The top offset
         */
        this.top = obj.top

        /**
         * @property {Number} left The left offset
         */
        this.left = obj.left

        /**
         * @property {Number} unit The unit of the (imaginary) belonging grid
         */
        this.unit = obj.unit

        this.originX = obj.originX
        this.originY = obj.originY

        this.gridUnitX = obj.gridUnitX
        this.gridUnitY = obj.gridUnitY

        this.gridX = obj.gridX
        this.gridY = obj.gridY

        this.marginX = obj.marginX
        this.marginY = obj.marginY

    }

})
