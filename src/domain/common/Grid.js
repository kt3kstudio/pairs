/**
 * Grid model represents the grid layout.
 *
 * The unit of a grid means the rectangle from x_0 to x_1 and from y_0 to x_1
 * The cell of a grid means the rectangle which is put on each grid point.
 * The cell size is just a recommendation of the size of cell.
 *
 * Usually cell width and height are equal to or less then unit width and height respectively.
 *
 * @class
 */
domain.common.Grid = subclass(function (pt) {
    'use strict'

    /**
     * @param {Object} options The options
     * @param {Number} options.x The x coordinate
     * @param {Number} options.y The y coordinate
     * @param {Number} [options.unitWidth] The width of the unit
     * @param {Number} [options.unitHeight] The height of the unit
     * @param {Number} [options.cellWidth] The width of the cell
     * @param {Number} [options.cellHeight] The height of the cell
     */
    pt.constructor = function (options) {

        options = options || {}

        this.x = options.x
        this.y = options.y
        this.unitWidth = options.unitWidth || 0
        this.unitHeight = options.unitHeight || 0
        this.cellWidth = options.cellWidth || this.unitWidth
        this.cellHeight = options.cellHeight || this.unitHeight

    }

    /**
     * Gets the x of the given grid m position.
     *
     * @param {Number} m The m position (Integer)
     * @return {Number}
     */
    pt.getX = function (m) {

        return this.x + this.unitWidth * m

    }

    /**
     * Gets the y of the given grid n position.
     *
     * @param {Number} n The n position (Integer)
     * @return {Number}
     */
    pt.getY = function (n) {

        return this.y + this.unitHeight * n

    }

    /**
     * Shifts the grid by the given grid numbers
     *
     * @param {Number} m The horizontal shift number
     * @param {Number} n The vertical shift number
     * @return {domain.common.Grid}
     */
    pt.shift = function (m, n) {

        return new domain.common.Grid({

            x: this.x + this.unitWidth * m,
            y: this.y + this.unitHeight * n,
            unitWidth: this.unitWidth,
            unitHeight: this.unitHeight,
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight

        })

    }

})
