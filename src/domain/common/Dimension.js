


/**
 * Dimension model.
 *
 * Dimension model is the abstraction of arrangment of rectangles relative to the primary coordinates of the component.
 *
 * @class
 */
domain.common.Dimension = subclass(function (pt) {
    'use strict'

    /**
     * @param {Object} obj The options
     * @param {Number} obj.width The width
     * @param {Number} obj.height The height
     * @param {Number} obj.ratioX The ratio of horizontal position of the rectangle. ratioX == 0 means the left limit of the rectangle is x. ratioX == 1 means the right limit of the rectangle is x.
     * @param {Number} obj.ratioY The ratio of vertical position of the rectangle. ratioY == 0 means the top limit of the rectangle is x. ratioY == 1 means the bottom limit of the rectangle is x.
     * @param {Number} obj.marginX The horizontal margin
     * @param {Number} obj.marginY The vertical margin
     */
    pt.constructor = function (obj) {

        this.width = obj.width
        this.height = obj.height

        this.ratioX = obj.ratioX
        this.ratioY = obj.ratioY

        this.marginX = obj.marginX
        this.marginY = obj.marginY

    }

    /**
     * The actual height of the rect.
     *
     * @return {Number}
     */
    pt.actualHeight = function () {

        return this.height - this.marginY * 2

    }

    /**
     * The actual width of the rect.
     *
     * @return {Number}
     */
    pt.actualWidth = function () {

        return this.width - this.marginX * 2

    }

    /**
     * The top limit of the rect.
     *
     * @param {Number} y The primary vertical position
     * @return {Number}
     */
    pt.topLimit = function (y) {

        return y - this.height * this.ratioY + this.marginY

    }

    /**
     * The bottom limit of the rect.
     *
     * @param {Number} y The primary vertical position
     * @return {Number}
     */
    pt.bottomLimit = function (y) {

        return this.topLimit(y) + this.actualHeight()

    }

    /**
     * The left limit of the rect.
     *
     * @param {Number} x The primary horizontal position
     * @return {Number}
     */
    pt.leftLimit = function (x) {

        return x - this.width * this.ratioX + this.marginX

    }

    /**
     * The right limit of the rect.
     *
     * @param {Number} x The primary horizontal position
     * @return {Number}
     */
    pt.rightLimit = function (x) {

        return this.leftLimit(x) + this.actualWidth()

    }

    /**
     * The horizontal center of the rect.
     *
     * @param {Number} x The primary horizontal position
     * @return {Number}
     */
    pt.centerX = function (x) {

        return (this.leftLimit(x) + this.rightLimit(x)) / 2

    }

    /**
     * The vertical center of the rect.
     *
     * @param {Number} y The primary vertical position
     * @return {Number}
     */
    pt.centerY = function (y) {

        return (this.topLimit(y) + this.bottomLimit(y)) / 2

    }

})
