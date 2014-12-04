
/**
 * @class
 * CharSprite class handles the character sprite.
 */
domain.common.CharSprite = (function ($) {
    'use strict';

    var exports = function () {
    };

    var spritePt = exports.prototype;

    /** sprite's x coordinate value */
    spritePt.x = 0;

    /** sprite's y coordinate value */
    spritePt.y = 0;

    /** sprite's width */
    spritePt.w = 0;

    /** sprite's width */
    spritePt.h = 0;

    /** sprite's image when going up */
    spritePt.upImage = '';

    /** sprite's image when going down */
    spritePt.downImage = '';

    /** sprite's image when going left */
    spritePt.leftImage = '';

    /** sprite's image when going right */
    spritePt.rightImage = '';

    spritePt.setParent = function (parent) {
        this.parent = parent;

        return this;
    };

    spritePt.appear = function () {
        this.$dom = this.$dom || this.createDom().appendTo(this.parent);

        return this.$dom.anim(this.appearAnim, this.appearDur);
    };

    spritePt.disappear = function () {
        return this.$dom.anim(this.disappearAnim, this.disappearDur).then(function ($dom) {

            $dom.remove();

        });
    };

    spritePt.createDom = function () {
        return $('<img />').addClass(this.cssClass).width(this.w).height(this.h).offset({
            // the center of bottom line of the image is the sprite's coordinate.
            left: this.leftLimit(),
            top: this.y - this.h
        }).attr('src', this.downImage);
    };

    spritePt.turn = function (dir) {
        var img;

        switch (dir) {
            case 'up': img = this.upImage; break;
            case 'down': img = this.downImage; break;
            case 'left': img = this.leftImage; break;
            case 'right': img = this.rightImage; break;
        }

        this.$dom.attr('src', img);
    };

    spritePt.setDuration = function (dur) {
        this.$dom.css('transition-duration', dur + 'ms');
        this.$dom.reflow();
    };

    spritePt.getDirection = function (coordinate, to) {
        if (coordinate === 'x') {
            if (to > this.x) {
                return 'right';
            } else {
                return 'left';
            }
        } else {
            if (to > this.y) {
                return 'down';
            } else {
                return 'up';
            }
        }
    };

    spritePt.moveTo = function (coordinate, to, dur) {

        var dir = this.getDirection(coordinate, to);

        this.turn(dir);

        this.setDuration(dur);

        if (dir === 'up' || dir === 'down') {
            this.moveToY(dir, to);
        } else {
            this.moveToX(dir, to);
        }

        return wait(dur);
    };

    spritePt.getOffset = function () {
        return {
            top: parseInt(this.$dom.css('top')),
            left: parseInt(this.$dom.css('left'))
        };
    };

    spritePt.setOffset = function (offset) {
        this.$dom.css('top', offset.top + 'px');
        this.$dom.css('left', offset.left + 'px');
    };

    /**
     * Returns right limit x value.
     *
     * @return {Number} x value of the right limit of sprite
     */
    spritePt.rightLimit = function () {
        return this.x + this.w / 2;
    };

    /**
     * Returns left limit x value.
     *
     * @return {Number} x value of the left limit of sprite
     */
    spritePt.leftLimit = function () {
        return this.x - this.w / 2;
    };

    spritePt.moveToY = function (dir, to) {
        var offset = this.getOffset();

        this.y = to;

        offset.top = to - this.h; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);
    };

    spritePt.moveToX = function (dir, to) {
        var offset = this.getOffset();

        this.x = to;

        offset.left = to - this.w / 2; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);
    };

    return exports;

}(window.jQuery));
