
/**
 * CharSprite class handles the character sprite.
 *
 * @class
 * @extends domain.common.Being
 */
domain.common.DimensionalBeing = subclass(domain.common.Being, function (pt) {
    'use strict';

    /** sprite's x coordinate value */
    pt.x = 0;

    /** sprite's y coordinate value */
    pt.y = 0;

    /** sprite's width */
    pt.w = 0;

    /** sprite's width */
    pt.h = 0;

    /**
     * Creates the dom of the character.
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        return this.elem
        .width(this.w)
        .height(this.h)
        .setPosition({

            // the center of bottom line of the image is the sprite's center.
            left: this.leftLimit(),

            top: this.y - this.h

        })
        .css('position', 'absolute')
        .css('transition-timing-function', 'linear')
        .attr('src', this.defaultImage);

    };


    /**
     * Returns right limit x value.
     *
     * @return {Number} x value of the right limit of sprite
     */
    pt.rightLimit = function () {

        return this.x + this.w / 2;

    };

    /**
     * Returns left limit x value.
     *
     * @return {Number} x value of the left limit of sprite
     */
    pt.leftLimit = function () {

        return this.x - this.w / 2;

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
     * Sets the sprite's offset.
     *
     * @param {Object} offset
     * @param {Number} offset.top
     * @param {Number} offset.left
     */
    pt.setOffset = function (offset) {

        this.elem.css('top', offset.top);
        this.elem.css('left', offset.left);

        return this;

    };



});
