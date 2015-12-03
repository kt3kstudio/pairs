/**
 * DimensionalBeing has its dimension.
 *
 * @class
 * @extends domain.common.Being
 */
domain.common.DimensionalBeing = subclass(domain.common.Being, function (pt, parent) {
    'use strict'

    /**
     * @property {Number} x sprite's x coordinate value
     */
    pt.x = 0

    /**
     * @property {Number} y sprite's y coordinate value
     */
    pt.y = 0

    /**
     * @property {domain.commmon.Dimension} dimension The dimension of the rectangle
     */
    pt.dimension = null

    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.dimension = new domain.common.Dimension({
            width: this.width,
            height: this.height,
            ratioX: this.ratioX,
            ratioY: this.ratioY,
            marginX: this.marginX,
            marginY: this.marginY
        })

        this.elem
            .css('position', 'absolute') // Except `position: absolute`, this class doesn't make sense.
            .css('transition-timing-function', 'linear')

    }

    /**
     * Returns the actual width of the elem.
     */
    pt.actualWidth = function () {

        return this.dimension.actualHeight()

    }

    /**
     * Returns the actual height of the elem.
     */
    pt.actualHeight = function () {

        return this.dimension.actualHeight()

    }

    /**
     * Creates the dom of the character.
     *
     * @override
     */
    pt.willShow = function () {

        this.updateElem()

    }

    /**
     * Gets the elem's right limit in px.
     *
     * @return {Number} x value of the right limit of sprite
     */
    pt.rightLimit = function () {

        return this.dimension.rightLimit(this.x)

    }

    /**
     * Gets the elem's left limit in px.
     *
     * @return {Number} x value of the left limit of sprite
     */
    pt.leftLimit = function () {

        return this.dimension.leftLimit(this.x)

    }

    /**
     * Gets the elem's top limit in px.
     */
    pt.topLimit = function () {

        return this.dimension.topLimit(this.y)

    }

    /**
     * Gets the elem's bottom limit in px.
     */
    pt.bottomLimit = function () {

        return this.dimension.bottomLimit(this.y)

    }

    /**
     * Gets the x of the center.
     *
     * @return {Number}
     */
    pt.centerX = function () {

        return this.dimension.centerX(this.x)

    }

    /**
     * Gets the y of the center.
     *
     * @return {Number}
     */
    pt.centerY = function () {

        return this.dimension.centerY(this.y)

    }

    /**
     * Updates the elem's offset according to current position.
     *
     * @private
     */
    pt.updateOffset = function () {

        this.elem.css('top', this.dimension.topLimit(this.y))
        this.elem.css('left', this.dimension.leftLimit(this.x))

    }

    /**
     * Updates the elem's width and height.
     *
     * @private
     */
    pt.updateRect = function () {

        this.elem.width(this.dimension.actualWidth())
        this.elem.height(this.dimension.actualHeight())

    }

    /**
     * Updates the actual elem dom according to the current dimension.
     * Returns a promise which resolves with the transitionDuration milliseconds.
     *
     * @return {Promise}
     */
    pt.updateElem = function () {

        this.updateRect()
        this.updateOffset()

        return wait(this.transitionDuration)

    }

    /**
     * Moves the elem to the given y position.
     *
     * @param {Number} to The y position
     */
    pt.moveToY = function (to) {

        this.y = to

        return this.updateElem()

    }

    /**
     * Moves the elem to the given x position.
     *
     * @param {Number} to The x position
     */
    pt.moveToX = function (to) {

        this.x = to

        return this.updateElem()

    }

    /**
     * Sets the transition duration.
     *
     * @param {Number} dur The transition duration
     */
    pt.setTransitionDuration = function (dur) {

        this.transitionDuration = dur

        this.elem.css('transition-duration', dur + 'ms').reflow()

    }

    /**
     * Sets the guiding rect and update the x, y and dimension to fit into the given rect.
     *
     * @param {domain.common.Rect} rect
     */
    pt.setRect = function (rect) {

        this.rect = rect

        this.x = rect.left + rect.width() * this.dimension.ratioX
        this.y = rect.top + rect.height() * this.dimension.ratioY

        this.dimension.width = rect.width()
        this.dimension.height = rect.height()

    }

})
