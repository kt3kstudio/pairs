/**
 * Grid model represents the grid layout.
 *
 * The unit of a grid means the rectangle from x_0 to x_1 and from y_0 to x_1
 * The cell of a grid means the rectangle which is put on each grid point.
 *
 * Usually cell width and height are equal to or less then unit width and height resp.,
 * but this isn't necessarilly so. If the cell width is greater than the unit width, then
 * each cell could overwrap with the next ones.
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
     */
    pt.constructor = function (options) {
        this.x = options.left
        this.y = options.top
        this.unitWidth = options.unitWidth
        this.unitHeight = options.unitHeight
        this.cellWidth = options.cellWidth
        this.cellHeight = options.cellHeight
    }

    /**
     * Gets the x of the given grid x position.
     *
     * @param {Number} x The x position (Integer)
     * @return {Number}
     */
    pt.getX = function (x) {
        return this.x + this.unitWidth * x
    }

    /**
     * Gets the y of the given grid y position.
     *
     * @param {Number} y The y position (Integer)
     * @return {Number}
     */
    pt.getY = function (y) {
        return this.y + this.unitHeight * y
    }
})
