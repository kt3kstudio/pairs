/**
 * Rect model represents the static rectangle in a screen.
 *
 * @class
 */
domain.common.Rect = subclass(function (pt) {
    'use strict'

    /**
     * @param {Object} options
     * @param {Number} options.top
     * @param {Number} options.right
     * @param {Number} options.bottom
     * @param {Number} options.left
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

        return this.bottom - this.top

    }

    /**
     * Gets the height.
     *
     * @return {Number}
     */
    pt.height = function () {

        return this.right - this.left

    }

})
