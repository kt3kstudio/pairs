


/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.common.Being = $.CC.defineActor(function (pt) {
    'use strict';

    var noop = function () {};

    /**
     * @property {String} showAnim The animation name this elem showing with
     */
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

        }).then(function () {

            that.elem.remove();

        });
    };


    /**
     * Sets the transition duration of the element.
     *
     * @param {Number} dur The duration
     */
    pt.setDuration = function (dur) {

        this.elem.css('transition-duration', dur + 'ms').reflow();

    };




});
