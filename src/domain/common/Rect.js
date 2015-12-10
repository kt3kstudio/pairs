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
     * [experimental]
     *
     * Returns a sub rectangular divided by the given partition numbers and of the given position
     *
     * @example
     *  rect.subrect(3, 4)
     *
     * @param {Number} [options.partition.x=1] The horizontal partition number
     * @param {Number} [options.partition.y=1] The vertical partition number
     * @param {Number} [options.get.x=0] The horizontal position to get
     * @param {Number} [options.get.y=0] The vertical position to get
     * @return {domain.common.Rect}
     */
    pt.subrect = function (options) {

        var partition = options.partition || {}
        var get = options.get || {}

        var partX = partition.x || 1
        var partY = partition.y || 1
        var getX = get.x || 0
        var getY = get.y || 0

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
