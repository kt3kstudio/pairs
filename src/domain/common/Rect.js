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

    /**
     * Returns a sub rectangular divided by the given partition numbers and of the given position
     *
     *  rect.subrect({
     *      partition: [3, 4],
     *      get: [0, 2]
     *  })
     *
     * @param {Object} [options] The options
     * @param {Number[]} [options.partition] The horizontal partition number and vertical number.
     * @param {Number[]} [options.get] The horizontal position and vertical position
     * @return {domain.common.Rect}
     */
    pt.subrect = function (options) {

        options = options || {}

        var partition = options.partition || []
        var get = options.get || []

        var partX = partition[0] || 1
        var partY = partition[1] || 1
        var getX = get[0] || 0
        var getY = get[1] || 0

        var unitX = this.width() / partX
        var unitY = this.height() / partY

        return new domain.common.Rect({
            top: this.top + getY * unitY,
            left: this.left + getX * unitX,
            right: this.left + getX * unitX + unitX,
            bottom: this.top + getY * unitY + unitY
        })

    }

    /**
     * [experimental]
     *
     * Returns a grid
     *
     * @return {domain.common.Grid}
     */
    pt.toGrid = function () {

        return new domain.common.Grid({
            x: this.left + this.width() / 2,
            y: this.top + this.height() / 2,
            unitWidth: this.width(),
            unitHeight: this.height()
        })

    }

})
