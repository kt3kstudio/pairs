import Rect from './Rect'
import ifNumElse from 'spn/lib/if-num-else'

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
export default class Grid {

    /**
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @param {Number} [unitWidth] The width of the unit
     * @param {Number} [unitHeight] The height of the unit
     * @param {Number} [cellWidth] The width of the cell
     * @param {Number} [cellHeight] The height of the cell
     */
    constructor({x, y, unitWidth, unitHeight, cellWidth, cellHeight} = {}) {

        this.x = x
        this.y = y
        this.unitWidth = ifNumElse(unitWidth, 0)
        this.unitHeight = ifNumElse(unitHeight, 0)
        this.cellWidth = ifNumElse(cellWidth, this.unitWidth)
        this.cellHeight = ifNumElse(cellHeight, this.unitHeight)

    }

    /**
     * Gets the x of the given grid m position.
     *
     * @param {Number} m The m position (Integer)
     * @return {Number}
     */
    getX(m) {

        return this.x + this.unitWidth * m

    }

    /**
     * Gets the y of the given grid n position.
     *
     * @param {Number} n The n position (Integer)
     * @return {Number}
     */
    getY(n) {

        return this.y + this.unitHeight * n

    }

    /**
     * Returns the translated grid by the given distances.
     *
     * @param {Number} x The horizontal translate distance
     * @param {Number} y The vertical translate distance
     * @return {Grid}
     */
    translated(x, y) {

        return this.override({
            x: this.x + x,
            y: this.y + y
        })

    }

    /**
     * Returns the shifted grid by the given grid numbers
     *
     * @param {Number} m The horizontal shift number
     * @param {Number} n The vertical shift number
     * @return {Grid}
     */
    shift(m, n) {

        return this.translated(this.unitWidth * m, this.unitHeight * n)

    }

    /**
     * Returns the subgrid devided by the given horizontal and vertical numbers.
     *
     * @deprecated
     * @param {Number} [m=1] The horizontal division number
     * @param {Number} [n=1] The vertical division number
     */
    subgrid(m = 1, n = 1) {

        return this.scaleX(1 / m).scaleY(1 / n)

    }

    /**
     * Scales the grid by the x axis.
     *
     * @param {Number} scale The scale
     * @return {Grid}
     */
    scaleX(scale) {

        return this.override({
            unitWidth: this.unitWidth * scale,
            cellWidth: this.cellWidth * scale
        })

    }

    /**
     * Scales the grid by the y axis.
     *
     * @param {Number} scale The scale
     * @return {Grid}
     */
    scaleY(scale) {

        return this.override({
            unitHeight: this.unitHeight * scale,
            cellHeight: this.cellHeight * scale
        })

    }

    scaleCellX(scale) {

        return this.override({cellWidth: this.cellWidth * scale})

    }

    scaleCellY(scale) {

        return this.override({cellHeight: this.cellHeight * scale})

    }

    /**
     * Overrides the given paramter by the given value and returns a new grid.
     *
     * @param {number} x The x
     * @param {number} y The y
     * @param {number} unitWidth The unitWidth
     * @param {number} unitHeight The unitHeight
     * @param {number} cellWidth The cellWidth
     * @param {number} cellHeight The cellHeight
     */
    override({x, y, unitWidth, unitHeight, cellWidth, cellHeight} = {}) {

        return new Grid({
            x: ifNumElse(x, this.x),
            y: ifNumElse(y, this.y),
            unitWidth: ifNumElse(unitWidth, this.unitWidth),
            unitHeight: ifNumElse(unitHeight, this.unitHeight),
            cellWidth: ifNumElse(cellWidth, this.cellWidth),
            cellHeight: ifNumElse(cellHeight, this.cellHeight)
        })

    }

    /**
     * Returns a dual rect.
     *
     * @return {Rect}
     */
    toRect() {

        const halfWidth = this.unitWidth / 2
        const halfHeight = this.unitHeight / 2

        return new Rect({

            top: this.y - halfHeight,
            left: this.x - halfWidth,
            right: this.x + halfWidth,
            bottom: this.y + halfHeight

        })

    }

    /**
     * Returns a dual rect.
     *
     * @return {Rect}
     */
    dual() {

        return this.toRect()

    }

}
