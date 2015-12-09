/**
 * Rect model represents the static rectangle in a screen.
 *
 * @class
 */
domain.common.Rect = subclass(function (pt) {
    'use strict'

    /**
     * @param {Object} options
     * @param {Number} options.top The top position
     * @param {Number} options.right The right position
     * @param {Number} options.bottom The bottom position
     * @param {Number} options.left The left position
     */
    pt.constructor = function (options) {

        this.top = options.top
        this.right = options.right
        this.bottom = options.bottom
        this.left = options.left

    }

    /**
     * Gets the width.
     *
     * @return {Number}
     */
    pt.width = function () {

        return this.right - this.left

    }

    /**
     * Gets the height.
     *
     * @return {Number}
     */
    pt.height = function () {

        return this.bottom - this.top

    }

    /**
     * Gets the horizontal center.
     */
    pt.centerX = function () {

        return this.left + this.width() / 2

    }

    /**
     * Gets the vertical center.
     */
    pt.centerY = function () {

        return this.top + this.height() / 2

    }

})
