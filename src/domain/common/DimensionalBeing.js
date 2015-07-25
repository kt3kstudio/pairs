
/**
 * CharSprite class handles the character sprite.
 *
 * @class
 * @extends domain.common.Being
 */
domain.common.DimensionalBeing = subclass(domain.common.Being, function (pt) {
    'use strict';

    /** @property {Number} x sprite's x coordinate value */
    pt.x = 0;

    /** @property {Number} y sprite's y coordinate value */
    pt.y = 0;

    /** @property {Number} w sprite's width */
    pt.w = 0;

    /** @property {Number} h sprite's width */
    pt.h = 0;



    /**
     * Places the being with the appropriate dimension.
     */
    pt.place = function () {

        this.elem
        .width(this.w)
        .height(this.h)
        .css('position', 'absolute')
        .css('transition-timing-function', 'linear');

        this.updateOffset();

    };


    /**
     * Creates the dom of the character.
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        this.place();

    };


    /**
     * Gets the elem's right limit in px.
     *
     * @return {Number} x value of the right limit of sprite
     */
    pt.rightLimit = function () {

        return this.x + this.w / 2;

    };

    /**
     * Gets the elem's left limit in px.
     *
     * @return {Number} x value of the left limit of sprite
     */
    pt.leftLimit = function () {

        return this.x - this.w / 2;

    };

    /**
     * Gets the elem's top limit in px.
     */
    pt.topLimit = function () {

        return this.y - this.h;

    };

    /**
     * Gets the elem's bottom limit in px.
     */
    pt.bottomLimit = function () {

        return this.y;

    };

    /**
     * Gets the offset of the sprite.
     *
     * @protected
     * @return {Object}
     */
    pt.getOffset = function () {

        return {
            top: parseInt(this.elem.css('top')),
            left: parseInt(this.elem.css('left'))
        };

    };

    /**
     * Sets the elem's offset.
     *
     * @protected
     * @param {Object} offset The offset
     * @param {Number} offset.top The top of the offset
     * @param {Number} offset.left The left of the offset
     */
    pt.setOffset = function (offset) {

        this.elem.css('top', offset.top);
        this.elem.css('left', offset.left);

        return this;

    };

    /**
     * Updates the elem's offset according to current position.
     *
     * @protected
     */
    pt.updateOffset = function () {

        return this.setOffset({
            top: this.topLimit(),
            left: this.leftLimit()
        });

    };

    /**
     * Moves the elem to the given y position.
     *
     * @param {Number} to The y position
     */
    pt.moveToY = function (to) {

        this.y = to;

        this.updateOffset();

    };


    /**
     * Moves the elem to the given x position.
     *
     * @param {Number} to The x position
     */
    pt.moveToX = function (to) {

        this.x = to;

        this.updateOffset();

    };


    pt.setTransitionDuration = function (dur) {

        this.elem.css('transition-duration', dur + 'ms').reflow();

        return this;

    };


});
