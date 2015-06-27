
/**
 * CharSprite class handles the character sprite.
 *
 * @class
 * @extends domain.common.Sprite
 */
domain.common.CharSprite = subclass(domain.common.Sprite, function (pt, parent) {
    'use strict';

    var defaultSpeechTimeout = 5000;

    /** sprite's image when going up */
    pt.upImage = '';

    /** sprite's image when going down */
    pt.downImage = '';

    /** sprite's image when going left */
    pt.leftImage = '';

    /** sprite's image when going right */
    pt.rightImage = '';


    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var charId = this.elem.attr('char-id');

        CHAR_SPRITE_SELECTOR(charId).call(this);

        this.defaultImage = new domain.common.Image(this.downImage);

        this.dirStateImage = {
            up: {default: new domain.common.Image(this.upImage)},
            down: {default: new domain.common.Image(this.downImage)},
            left: {default: new domain.common.Image(this.leftImage)},
            right: {default: new domain.common.Image(this.rightImage)}
        };
    };


    var CHAR_SPRITE_SELECTOR = function (charId) {

        var THE_TABLE = {
            ma: domain.common.Ma
        };

        return THE_TABLE[charId];

    };


    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction (one of up, down, left or right)
     */
    pt.turn = function (dir) {

        this.setDirState(dir, 'default');

    };


    pt.getDirection = function (coordinate, to) {

        if (coordinate === 'x') {

            return to > this.x ? 'right' : 'left';

        }

        return to > this.y ? 'down' : 'up';

    };

    pt.moveTo = function (coordinate, to, dur) {

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

    pt.moveToY = function (dir, to) {

        var offset = this.getOffset();

        this.y = to;

        offset.top = to - this.h; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);

    };


    pt.moveToX = function (dir, to) {

        var offset = this.getOffset();

        this.x = to;

        offset.left = to - this.w / 2; // the center of bottom line is the sprite's coordinate.

        this.setOffset(offset);

    };


    pt.speak = function (speech, opts) {

        opts = opts || {};

        var cancelDom = opts.cancelDom || this.elem;
        var timeout = opts.timeout || defaultSpeechTimeout;

        var bubbleShown = this.elem.speechBubble(speech, {

            width: $(window).width() * 0.8,
            height: 50,
            color: '#328DE5',
            cssClass: this.name + '-speech',
            partitionY: 2,
            partitionX: 10,
            duration: 600

        }).show();

        this.speechEndPromise = bubbleShown.then(function (sb) {

            return new Promise(function (resolve) {

                setTimeout(resolve, timeout);

                $(cancelDom).one('click touchstart', resolve);

            }).then(function () {

                $(cancelDom).off('click touchstart');

                return sb.hide();

            });

        });

        return bubbleShown;

    };

});
