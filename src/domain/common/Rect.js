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
     * @param {number[]} [partition] The horizontal partition number and vertical number.
     * @param {number[]} [get] The horizontal position and vertical position
     * @return {Rect}
     */
    subrect({partition, get} = {}) {

        partition = partition || []
        get = get || []

        var partX = partition[0] || 1
        var partY = partition[1] || 1
        var getX = get[0] || 0
        var getY = get[1] || 0

        return this.sub(partX, partY).shift(getX, getY)

    }

    /**
     * Returns a sub rectangular divided by the given partition numbers.
     *
     * @param {number} partX  The horizontal number
     * @param {number} partY  The vertical number
     * @return {Rect}
     */
    sub(partX = 1, partY = 1) {

        return new Rect({
            top: this.top,
            left: this.left,
            right: this.left + this.width() / partX,
            bottom: this.top + this.height() / partY
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
            top: this.top + n * height,
            left: this.left + m * width,
            right: this.right + m * width,
            bottom: this.bottom + n * height
        })

    }

    /**
     * Shifts up by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftUp(n = 1) {

        return this.shift(0, -n)

    }

    /**
     * Shifts left by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftLeft(n = 1) {

        return this.shift(-n, 0)

    }

    /**
     * Shifts right by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftRight(n = 1) {

        return this.shift(n, 0)

    }

    /**
     * Shifts down by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftDown(n = 1) {

        return this.shift(0, n)

    }

    /**
     * Cuts out the given height from the top.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutTop(height = 0) {

        return new Rect({
            top: this.top,
            left: this.left,
            right: this.right,
            bottom: this.top + height
        })

    }

    /**
     * Cuts out the given height from the left.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutLeft(width) {

        return new Rect({
            top: this.top,
            left: this.left,
            right: this.left + width,
            bottom: this.bottom
        })

    }

    /**
     * Cuts out the given height from the right.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutRight(width) {

        return new Rect({
            top: this.top,
            left: this.right - width,
            right: this.right,
            bottom: this.bottom
        })

    }

    /**
     * Cuts out the given height from the bottom.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutBottom(height) {

        return new Rect({
            top: this.bottom - height,
            left: this.left,
            right: this.right,
            bottom: this.bottom
        })

    }

    /**
     * Return the next rect which shares the top side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */
    extTop(height) {

        return this.shiftUp().cutBottom(height)

    }

    /**
     * Return the next rect which shares the left side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */
    extLeft(width) {

        return this.shiftLeft().cutRight(width)

    }

    /**
     * Return the next rect which shares the right side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */
    extRight(width) {

        return this.shiftRight().cutLeft(width)

    }

    /**
     * Return the next rect which shares the bottom side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */
    extBottom(height) {

        return this.shiftDown().cutTop(height)

    }

    /**
     * Returns a dual grid
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

    /**
     * Returns a dual grid
     *
     * @return {Grid}
     */
    dual() {

        return this.toGrid()

    }

}
