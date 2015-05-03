/**
 * @class
 * @abstract
 *
 * Sprite class handles the basic behaviours of any entity in the game.
 */
domain.common.Sprite = subclass(function (pt) {
    'use strict';

    var DEFAULT_PARENT = 'body';

    /** sprite's appearance animation */
    pt.appearAnim = '';

    /** sprite's appearance duration */
    pt.appearDur = 400;

    /** sprite's disappearance animation */
    pt.disappearAnim = '';

    /** sprite's disappearance duration */
    pt.disappearDur = 400;


    /**
     * Appears the sprite.
     *
     * @param {Number} [dur] The duration of the animation
     * @return {Promise} The end of the appearing animation
     */
    pt.appear = function (dur) {

        var that = this;

        this.setupDom();

        return Promise.resolve(this.elem).then(function (elem) {

            that.elem = elem;

            if (elem.parent().length === 0) {
                elem.appendTo(that.parent || DEFAULT_PARENT);
            }

            return elem.anim(that.appearAnim, dur || that.appearDur);
        });

    };

    /**
     * Disappears the sprite.
     *
     * @param {Number} [dur] The duration of the animation
     * @return {Promise} The end of the appearing animation
     */
    pt.disappear = function (dur) {
        var that = this;

        return this.elem.anim(this.disappearAnim, dur || this.disappearDur).then(function (elem) {

            elem.remove();
            that.elem = null;

        });
    };

    pt.createDom = function () {
        return $('<div />');
    };

    pt.setDuration = function (dur) {
        this.elem.css('transition-duration', dur + 'ms');
        this.elem.reflow();
    };

    pt.getOffset = function () {
        return {
            top: parseInt(this.elem.css('top')),
            left: parseInt(this.elem.css('left'))
        };
    };

    pt.setOffset = function (offset) {
        this.elem.css('top', offset.top + 'px');
        this.elem.css('left', offset.left + 'px');
    };

});
