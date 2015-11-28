/**
 * A GridWalker is a DimensionalBeing which walks along the given Grid.
 */
domain.common.GridWalker = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict'

    /**
     * @property {Number} m The horizontal grid position
     */
    pt.m = 0

    /**
     * @property {Number} n The vertical grid position
     */
    pt.n = 0

    /**
     * @param {domain.common.Grid} grid The grid layout info
     */
    pt.setGrid = function (grid) {

        this.grid = grid

    }

    /**
     * Fits the dimension into the (grid.cellWidth, grid.cellHeight)
     *
     * @return {Promise}
     */
    pt.fitToGrid = function () {

        this.dimension.fitInto(this.grid.cellWidth, this.grid.cellHeight)

        return this.updateElem()

    }

    /**
     * Moves to the horizontal grid positon m.
     *
     * @param {Number} m The horizontal grid position
     * @return {Promise}
     */
    pt.moveToM = function (m) {

        return this.moveToX(this.grid.getX(this.m = m))

    }

    /**
     * Moves to the vertical grid position n.
     *
     * @param {Number} n The vertical grid position
     * @return {Promise}
     */
    pt.moveToN = function (n) {

        return this.moveToY(this.grid.getY(this.n = n))

    }

    /**
     * Moves to the given grid position.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} n The vertical grid position
     * @return {Promise}
     */
    pt.moveToGridPosition = function (m, n) {

        this.moveToM(m)

        return this.moveToN(n)

    }

})
