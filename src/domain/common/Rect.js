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
     * Returns a sub rectangular divided by the given partition numbers.
     *
     * @example
     *  rect.subrect(3, 4)
     *
     * @param {Number} partitionX The horizontal partition number
     * @param {Number} partitionY The vertical partition number
     * @return {domain.common.Rect}
     */
    pt.subrect = function (partitionX, partitionY) {

        return new domain.common.Rect({
            top: this.top,
            left: this.left,
            right: this.left + this.width() / (partitionX || 1),
            bottom: this.top + this.height() / (partitionY || 1)
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
            unitWidth: this.height()
        })

    }

})
