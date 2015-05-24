


/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.common.NormalSprite = $.defineActor(function (pt) {
    'use strict';

    var noop = function () {};

    pt.showAnim = null;
    pt.showAnimDur = 500; // default 500ms

    pt.willShow = noop;
    pt.didShow = noop;

    pt.show = function () {

        var that = this;

        return Promise.resolve(that.willShow()).then(function () {

            if (that.showAnim && that.showAnimDur) {

                return that.elem.anim(that.showAnim, that.showAnimDur);

            }

        }).then(function () {

            return that.didShow();

        });

    };

    pt.hideAnim = null;
    pt.hideAnimDur = 500; // default 500ms

    pt.willHide = noop;
    pt.didHide = noop;

    pt.hide = function () {

        var that = this;

        return Promise.resolve(that.willHide()).then(function () {

            if (that.hideAnim && that.hideAnimDur) {

                return that.elem.anim(that.hideAnim, that.hideAnimDur);

            }

        }).then(function () {

            return that.didHide();

        });

    };

    pt.willAppear = noop;
    pt.didAppear = noop;

    pt.appear = function () {

        var that = this;

        return Promise.resolve(that.willAppear()).then(function () {

            return that.show();

        }).then(function () {

            return that.didAppear();

        });

    };

    pt.willDisappear = noop;
    pt.didDisappear = noop;

    pt.disappear = function () {

        var that = this;

        return Promise.resolve(that.willDisappear()).then(function () {

            return that.hide();

        }).then(function () {

            return that.didDisappear();

        });
    };


    /**
     * Sets the transition duratio of the sprite.
     *
     * @param {Number} dur
     */
    pt.setDuration = function (dur) {

        this.elem.css('transition-duration', dur + 'ms').reflow();

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
