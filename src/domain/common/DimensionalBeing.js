
/**
 * DimensionalBeing has its dimension.
 *
 * @class
 * @extends domain.common.Being
 */
domain.common.DimensionalBeing = subclass(domain.common.Being, function (pt, parent) {
    'use strict';

    /**
     * @property {Number} x sprite's x coordinate value
     */
    pt.x = 0;

    /**
     * @property {Number} y sprite's y coordinate value
     */
    pt.y = 0;

    /**
     * @property {Number} w sprite's width
     */
    pt.w = 0;

    /**
     * @property {Number} h sprite's width
     */
    pt.h = 0;

    /**
     * @property {Number} marginX Sprite's left margin
     */
    pt.marginX = 0;

    /**
     * @property {Number} marginY Sprite's top margin
     */
    pt.marginY = 0;

    /**
     * @property {Number} originX The x ratio of the origin in the rectangle.
     *
     * 0 means the origin is at the left edge.
     * 1 means the origin is at the right edge.
     */
    pt.originX = 0;

    /**
     * @property {Number} originY The y ratio of the origin in the rectangle.
     *
     * 0 means the origin is at the top edge.
     * 1 means the origin is at the bottom edge.
     */
    pt.originY = 0;

    /**
     */
    pt.gridX = 0;
    pt.gridY = 0;

    pt.constructor = function () {

        parent.constructor.apply(this, arguments);

        this.elem
        .css('position', 'absolute')
        .css('transition-timing-function', 'linear');

    };



    /**
     * Places the being with the appropriate dimension.
     */
    pt.updateElem = function () {

        this.updateRect();
        this.updateOffset();

    };

    /**
     * Returns the actual width of the elem.
     */
    pt.actualWidth = function () {

        return this.w - this.marginX * 2;

    };


    /**
     * Returns the actual height of the elem.
     */
    pt.actualHeight = function () {

        return this.h - this.marginY * 2;

    };


    /**
     * Creates the dom of the character.
     *
     * @override
     */
    pt.willShow = function () {

        this.updateElem();

    };


    /**
     * Gets the elem's right limit in px.
     *
     * @return {Number} x value of the right limit of sprite
     */
    pt.rightLimit = function () {

        return this.leftLimit() + this.actualWidth();

    };

    /**
     * Gets the elem's left limit in px.
     *
     * @return {Number} x value of the left limit of sprite
     */
    pt.leftLimit = function () {

        return this.x - this.w * this.originX + this.marginX;

    };

    /**
     * Gets the elem's top limit in px.
     */
    pt.topLimit = function () {

        return this.y - this.h * this.originY + this.marginY;

    };

    /**
     * Gets the elem's bottom limit in px.
     */
    pt.bottomLimit = function () {

        return this.topLimit() + this.actualHeight();

    };


    /**
     * Gets the x of the center.
     *
     * @return {Number}
     */
    pt.centerX = function () {

        return (this.leftLimit() + this.rightLimit()) / 2;

    };

    /**
     * Gets the y of the center.
     *
     * @return {Number}
     */
    pt.centerY = function () {

        return (this.topLimit() + this.bottomLimit()) / 2;

    };

    /**
     * Updates the elem's offset according to current position.
     *
     * @protected
     */
    pt.updateOffset = function () {

        this.elem.css('top', this.topLimit());
        this.elem.css('left', this.leftLimit());

    };

    /**
     * Updates the elem's width and height.
     *
     * @protected
     */
    pt.updateRect = function () {

        this.elem.width(this.actualWidth());
        this.elem.height(this.actualHeight());

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
