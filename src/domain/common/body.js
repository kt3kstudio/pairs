import Being from './Being'
import Dimension from './Dimension'

/**
 * Body has width, height, position and information about how it put at the postion.
 */
export default class Body extends Being {

    /**
     * @param {jQuery} elem The element
     */
    constructor(elem) {

        super(elem)

        /**
         * @property {Number} x sprite's x coordinate value
         */
        this.x = 0

        /**
         * @property {Number} y sprite's y coordinate value
         */
        this.y = 0

        /**
         * @property {Dimension} dimension The dimension of the rectangle
         */
        this.dimension = new Dimension({
            width: this.width,
            height: this.height,
            ratioX: this.ratioX,
            ratioY: this.ratioY,
            marginX: this.marginX,
            marginY: this.marginY
        })

        this.elem.css('position', 'absolute') // Except `position: absolute`, this class doesn't make sense.

    }

    /**
     * Returns the actual width of the elem.
     */
    actualWidth() {

        return this.dimension.actualHeight()

    }

    /**
     * Returns the actual height of the elem.
     */
    actualHeight() {

        return this.dimension.actualHeight()

    }

    /**
     * Creates the dom of the character.
     *
     * @override
     */
    willShow() {

        this.updateElem()

    }

    /**
     * Gets the elem's right limit in px.
     *
     * @return {Number} x value of the right limit of sprite
     */
    rightLimit() {

        return this.dimension.rightLimit(this.x)

    }

    /**
     * Gets the elem's left limit in px.
     *
     * @return {Number} x value of the left limit of sprite
     */
    leftLimit() {

        return this.dimension.leftLimit(this.x)

    }

    /**
     * Gets the elem's top limit in px.
     */
    topLimit() {

        return this.dimension.topLimit(this.y)

    }

    /**
     * Gets the elem's bottom limit in px.
     */
    bottomLimit() {

        return this.dimension.bottomLimit(this.y)

    }

    /**
     * Gets the x of the center.
     *
     * @return {Number}
     */
    centerX() {

        return this.dimension.centerX(this.x)

    }

    /**
     * Gets the y of the center.
     *
     * @return {Number}
     */
    centerY() {

        return this.dimension.centerY(this.y)

    }

    /**
     * Updates the elem's offset according to current position.
     *
     * @private
     */
    updateOffset() {

        this.elem.css('top', this.dimension.topLimit(this.y))
        this.elem.css('left', this.dimension.leftLimit(this.x))

    }

    /**
     * Updates the elem's width and height.
     *
     * @private
     */
    updateRect() {

        this.elem.width(this.dimension.actualWidth())
        this.elem.height(this.dimension.actualHeight())

    }

    /**
     * Updates the actual elem dom according to the current dimension.
     * Returns a promise which resolves with the transitionDuration milliseconds.
     *
     * @param {Number} [dur] The
     * @return {Promise}
     */
    updateElem(dur) {

        if (dur) {

            this.setTransitionDuration(dur)

        }

        this.updateRect()
        this.updateOffset()

        return wait(this.transitionDuration)

    }

    /**
     * Moves the elem to the given y position.
     *
     * @param {Number} to The y position
     */
    moveToY(to) {

        this.y = to

        return this.updateElem()

    }

    /**
     * Moves the elem to the given x position.
     *
     * @param {Number} to The x position
     */
    moveToX(to) {

        this.x = to

        return this.updateElem()

    }

    /**
     * Sets the transition duration.
     *
     * @param {Number} dur The transition duration
     */
    setTransitionDuration(dur) {

        this.transitionDuration = dur

        this.elem.css('transition-duration', dur + 'ms').reflow()

    }

    /**
     * Sets the guiding rect and update the x, y and dimension to fit into the given rect.
     *
     * @param {Rect} rect
     */
    setRect(rect) {

        this.rect = rect

        this.x = rect.left + rect.width() * this.dimension.ratioX
        this.y = rect.top + rect.height() * this.dimension.ratioY

        this.dimension.width = rect.width()
        this.dimension.height = rect.height()

    }

}
