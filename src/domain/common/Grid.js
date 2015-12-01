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
     * @param {Number} options.unitWidth The width of the unit
     * @param {Number} options.unitHeight The height of the unit
     * @param {Number} options.cellWidth The width of the cell
     * @param {Number} options.cellHeight The height of the cell
     * @param {Number} options.modX The mod of the horizontal grid position
     * @param {Number} options.modY The mod of the vertical grid position
     */
    pt.constructor = function (options) {

        options = options || {}

        this.x = options.x
        this.y = options.y
        this.unitWidth = options.unitWidth
        this.unitHeight = options.unitHeight
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

})
