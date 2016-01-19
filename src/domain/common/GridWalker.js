/**
 * A GridWalker is a DimensionalBeing which walks along the given Grid.
 */
domain.common.GridWalker = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict'

    /**
     * @override
     * @property
     */
    pt.ratioX = 0.5

    /**
     * @override
     * @property
     */
    pt.ratioY = 0.5

    /**
     * @property {Number} m The horizontal grid position
     */
    pt.m = 0

    /**
     * @property {Number} n The vertical grid position
     */
    pt.n = 0

    /**
     * @property {Number} cellRatioX The ratio of how much the grid walker occupies the given cell width (default: 1)
     */
    pt.cellRatioX = 1

    /**
     * @property {Number} cellRatioX The ratio of how much the grid walker occupies the given cell height (default: 1)
     */
    pt.cellRatioY = 1

    /**
     * @override
     */
    pt.willShow = function () {

        return this.fitToGrid()

    }

    /**
     * Sets the grid and the position in it.
     *
     * @param {Grid} grid The grid layout info
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    pt.setGrid = function (grid, m, n) {

        this.grid = grid

        this.setGridPosition(m, n)

    }

    /**
     * Sets the grid position.
     *
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    pt.setGridPosition = function (m, n) {

        if (typeof m === 'number') {

            this.m = m

        }

        if (typeof n === 'number') {

            this.n = n

        }

    }

    /**
     * Updates the element's dom state using the current grid state info.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.updateElemOnGrid = function (dur) {

        this.x = this.grid.getX(this.m)
        this.y = this.grid.getY(this.n)

        return this.updateElem(dur)

    }

    /**
     * Fits the dimension into the (grid.cellWidth, grid.cellHeight) and moves to the current grid position.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.fitToGrid = function (dur) {

        this.dimension.fitInto(this.grid.cellWidth * this.cellRatioX, this.grid.cellHeight * this.cellRatioY)

        return this.updateElemOnGrid(dur)

    }

    /**
     * Moves to the horizontal grid positon m.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveToM = function (m, dur) {

        this.x = this.grid.getX(this.m = m)

        return this.updateElem(dur)

    }

    /**
     * Moves to the vertical grid position n.
     *
     * @param {Number} n The vertical grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveToN = function (n, dur) {

        this.y = this.grid.getY(this.n = n)

        return this.updateElem(dur)

    }

    /**
     * Moves to the given grid position.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} n The vertical grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveToGridPosition = function (m, n, dur) {

        this.setGridPosition(m, n)

        return this.updateElemOnGrid(dur)

    }

    /**
     * Moves along the grid.
     *
     * @param {Number} diffM The move distance along the horizontal line
     * @param {Number} diffN The move distance along the vertical line
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveOnGrid = function (distM, distN, dur) {

        return this.moveToGridPosition(this.m + distM, this.n + distN, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveUpOnGrid = function (dur) {

        return this.moveOnGrid(0, -1, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveRightOnGrid = function (dur) {

        return this.moveOnGrid(1, 0, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveDownOnGrid = function (dur) {

        return this.moveOnGrid(0, 1, dur)
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    pt.moveLeftOnGrid = function (dur) {

        return this.moveOnGrid(-1, 0, dur)

    }

})
