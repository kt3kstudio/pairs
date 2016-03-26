import {Body} from 'spn'
/**
 * A GridWalker is a Body which walks along the given Grid.
 */
export default class GridWalker extends Body {

    /**
     * @override
     */
    ratioX() { return 0.5 }

    /**
     * @override
     */
    ratioY() { return 0.5 }

    /**
     * The ratio of how much the grid walker occupies the given cell width.
     *
     * @return {number}
     */
    cellRatioX() { return 1 }

    /**
     *  The ratio of how much the grid walker occupies the given cell height.
     *
     * @return {number}
     */
    cellRatioY() { return 1 }

    constructor(elem) {

        super(elem)

        /**
         * @property {number} m The horizontal grid position
         */
        this.m = 0

        /**
         * @property {number} n The vertical grid position
         */
        this.n = 0

    }

    /**
     * @override
     */
    willShow() {

        return this.fitToGrid()

    }

    /**
     * Sets the grid and the position in it.
     *
     * @param {Grid} grid The grid layout info
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    setGrid(grid, m, n) {

        this.grid = grid

        this.setGridPosition(m, n)

    }

    /**
     * Sets the grid position.
     *
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */
    setGridPosition(m, n) {

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
    updateElemOnGrid(dur) {

        this.x = this.grid.getX(this.m)
        this.y = this.grid.getY(this.n)

        return this.updateElem(dur)

    }

    /**
     * Fits the posture into the (grid.cellWidth, grid.cellHeight) and moves to the current grid position.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    fitToGrid(dur) {

        this.posture.fitInto(this.grid.cellWidth * this.cellRatioX(), this.grid.cellHeight * this.cellRatioY())

        return this.updateElemOnGrid(dur)

    }

    /**
     * Moves to the horizontal grid positon m.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    moveToM(m, dur) {

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
    moveToN(n, dur) {

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
    moveToGridPosition(m, n, dur) {

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
    moveOnGrid(distM, distN, dur) {

        return this.moveToGridPosition(this.m + distM, this.n + distN, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    moveUpOnGrid(dur) {

        return this.moveOnGrid(0, -1, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    moveRightOnGrid(dur) {

        return this.moveOnGrid(1, 0, dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    moveDownOnGrid(dur) {

        return this.moveOnGrid(0, 1, dur)
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */
    moveLeftOnGrid(dur) {

        return this.moveOnGrid(-1, 0, dur)

    }

}
