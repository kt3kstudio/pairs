
/**
 * @class
 * CharSprite class handles the character sprite.
 */
domain.common.CharSprite = (function ($) {
    'use strict';

    var DEFAULT_PARENT = 'body';

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

    /** sprite's appearance animation */
    spritePt.appearAnim = '';

    /** sprite's appearance duration */
    spritePt.appearDur = 400;

    /** sprite's disappearance animation */
    spritePt.disappearAnim = '';

    /** sprite's disappearance duration */
    spritePt.disappearDur = 400;

    spritePt.setParent = function (parent) {
        this.parent = parent;

        return this;
    };

    spritePt.put = function () {
        this.$dom = this.$dom || this.createDom().appendTo(this.parent || DEFAULT_PARENT);

        return this;
    };

    spritePt.appear = function (dur) {
        this.$dom = this.$dom || this.createDom().appendTo(this.parent || DEFAULT_PARENT);

        return this.$dom.anim(this.appearAnim, dur || this.appearDur);
    };

    spritePt.disappear = function (dur) {
        var that = this;

        return this.$dom.anim(this.disappearAnim, dur || this.disappearDur).then(function ($dom) {

            $dom.remove();
            that.$dom = null;

        });
    };

    spritePt.createDom = function () {
        return $('<img />').addClass(this.cssClass).width(this.w).height(this.h).offset({
            // the center of bottom line of the image is the sprite's coordinate.
            left: this.leftLimit(),
            top: this.y - this.h
        }).attr('src', this.downImage || this.image);
    };

    spritePt.turn = function (dir) {
        var img;

        switch (dir) {
            case 'up': img = this.upImage; break;
            case 'down': img = this.downImage || this.image; break;
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

    spritePt.speak = function (speech) {

        return this.$dom.speechBubble(speech, {

            width: $(window).width() * 0.8,
            height: 50,
            color: '#328DE5',
            cssClass: this.name + '-speech',
            partitionY: 2,
            partitionX: 10,
            duration: 600

        }).show();

    };

    return exports;

}(window.jQuery));
