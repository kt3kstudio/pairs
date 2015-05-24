/**
 * @class
 * @abstract
 *
 * Sprite class handles the basic behaviours of any entity in the game.
 */
domain.common.Sprite = subclass(function (pt) {
    'use strict';


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

        this.setupDom();

        return this.elem.anim(this.appearAnim, dur || this.appearDur);

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


    pt.setDuration = function (dur) {

        this.elem.css('transition-duration', dur + 'ms').reflow();

    };


    pt.getOffset = function () {
        return {
            top: parseInt(this.elem.css('top')),
            left: parseInt(this.elem.css('left'))
        };
    };

    pt.setOffset = function (offset) {
        this.elem.css('top', offset.top);
        this.elem.css('left', offset.left);
    };

});
