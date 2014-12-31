
/**
 * @class
 * @abstract
 *
 * Sprite class handles the basic behaviours of any entity in the game.
 */
domain.common.Sprite = (function () {
    'use strict';

    var DEFAULT_PARENT = 'body';

    var exports = function () {
    };

    var spritePt = exports.prototype;

    /** sprite's appearance animation */
    spritePt.appearAnim = '';

    /** sprite's appearance duration */
    spritePt.appearDur = 400;

    /** sprite's disappearance animation */
    spritePt.disappearAnim = '';

    /** sprite's disappearance duration */
    spritePt.disappearDur = 400;


    /**
     * Sets the parent of the sprite's dom.
     *
     * @param {String|HTMLElement} parent The parent dom
     */
    spritePt.setParent = function (parent) {
        this.parent = parent;

        return this;
    };

    /**
     * Puts the sprite's dom into the document as the last child of the parent dom.
     *
     */
    spritePt.put = function () {
        this.$dom = this.$dom || this.createDom().appendTo(this.parent || DEFAULT_PARENT);

        return this;
    };


    /**
     * Appears the sprite.
     *
     * @param {Number} [dur] The duration of the animation
     * @return {Promise} The end of the appearing animation
     */
    spritePt.appear = function (dur) {
        this.$dom = this.$dom || this.createDom().appendTo(this.parent || DEFAULT_PARENT);

        return this.$dom.anim(this.appearAnim, dur || this.appearDur);
    };

    /**
     * Disappears the sprite.
     *
     * @param {Number} [dur] The duration of the animation
     * @return {Promise} The end of the appearing animation
     */
    spritePt.disappear = function (dur) {
        var that = this;

        return this.$dom.anim(this.disappearAnim, dur || this.disappearDur).then(function ($dom) {

            $dom.remove();
            that.$dom = null;

        });
    };

    spritePt.createDom = function () {
        return $('<div />');
    };

    spritePt.setDuration = function (dur) {
        this.$dom.css('transition-duration', dur + 'ms');
        this.$dom.reflow();
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

    return exports;

}());
