import Grid from './Grid'

/**
 * Rect model represents the static rectangle in a screen.
 *
 * @class
 */
export default class Rect {

    /**
     * @param {Number} top The top position
     * @param {Number} right The right position
     * @param {Number} bottom The bottom position
     * @param {Number} left The left position
     */
    constructor({top, right, bottom, left}) {

        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left

    }

    /**
     * Gets the width.
     *
     * @return {Number}
     */
    width() {

        return this.right - this.left

    }

    /**
     * Gets the height.
     *
     * @return {Number}
     */
    height() {

        return this.bottom - this.top

    }

    /**
     * Gets the horizontal center.
     */
    centerX() {

        return (this.left + this.right) / 2

    }

    /**
     * Gets the vertical center.
     */
    centerY() {

        return (this.top + this.bottom) / 2

    }

    /**
     * Returns a sub rectangular divided by the given partition numbers and of the given position
     *
     *  rect.subrect({
     *      partition: [3, 4],
     *      get: [0, 2]
     *  })
     *
     * @param {Number[]} [partition] The horizontal partition number and vertical number.
     * @param {Number[]} [get] The horizontal position and vertical position
     * @return {Rect}
     */
    subrect({partion, get} = {}) {

        partition = partition || []
        get = get || []

        var partX = partition[0] || 1
        var partY = partition[1] || 1
        var getX = get[0] || 0
        var getY = get[1] || 0

        var unitX = this.width() / partX
        var unitY = this.height() / partY

        return new Rect({
            top: this.top + getY * unitY,
            left: this.left + getX * unitX,
            right: this.left + getX * unitX + unitX,
            bottom: this.top + getY * unitY + unitY
        })

    }

    /**
     * Returns a shifted rect by the given horizontal and vertical numbers.
     *
     * @param {number} [m=0] The horizontal number
     * @param {number} [n=0] The vertical number
     * @return {Rect}
     */
    shift(m = 0, n = 0) {

        const width = this.width()
        const height = this.height()

        return new Rect({
            top: this.top + n + height,
            left: this.left + m * width,
            right: this.right + m * width,
            bottom: this.bottom + m * height
        })

    }

    /**
     * Returns a grid
     *
     * @return {Grid}
     */
    toGrid() {

        return new Grid({
            x: this.centerX(),
            y: this.centerY(),
            unitWidth: this.width(),
            unitHeight: this.height()
        })

    }

}
