import Rect from './Rect'

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
        this.unitWidth = unitWidth || 0
        this.unitHeight = unitHeight || 0
        this.cellWidth = cellWidth || this.unitWidth
        this.cellHeight = cellHeight || this.unitHeight

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

        return new Grid({

            x: this.x + x,
            y: this.y + y,
            unitWidth: this.unitWidth,
            unitHeight: this.unitHeight,
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight

        })

    }

    /**
     * Returns the shifted grid by the given grid numbers
     *
     * @param {Number} m The horizontal shift number
     * @param {Number} n The vertical shift number
     * @return {Grid}
     */
    shifted(m, n) {

        return this.translated(this.unitWidth * m, this.unitHeight * n)

    }

    /**
     * Returns the subgrid devided by the given horizontal and vertical numbers.
     *
     * @param {Number} [m=1] The horizontal division number
     * @param {Number} [n=1] The vertical division number
     */
    subgrid(m = 1, n = 1) {

        return new Grid({

            x: this.x,
            y: this.y,
            unitWidth: this.unitWidth / m,
            unitHeight: this.unitHeight / n,
            cellWidth: this.cellWidth / m,
            cellHeight: this.cellHeight / n

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
