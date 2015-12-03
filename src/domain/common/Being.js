/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.common.Being = subclass($.cc.Actor, function (pt) {
    'use strict'

    var noop = function () {}

    /**
     * @property {String} showAnim The animation name this elem showing with
     */
    pt.showAnim = null
    pt.showAnimDur = 500 // default 500ms

    pt.willShow = noop
    pt.didShow = noop

    /**
     * 表示時アニメーションプロパティ (showAnim, showAnimDur) に従ってアニメーションさせる。
     *
     * 事前に willShow hook, 事後に didShow hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    pt.show = function (dur) {

        var that = this

        return Promise.resolve(that.willShow()).then(function () {

            var p

            if (that.showAnim && that.showAnimDur) {

                p = that.elem.anim(that.showAnim, dur || that.showAnimDur)

            }

            that.elem.css('visibility', 'visible')

            return p

        }).then(function () {

            return that.didShow()

        })

    }

    pt.hideAnim = null
    pt.hideAnimDur = 500 // default 500ms

    pt.willHide = noop
    pt.didHide = noop

    /**
     * 非表示時アニメーションプロパティ (showAnim, showAnimDur) に従ってアニメーションさせる。
     *
     * 事前に willHide hook, 事後に didHide hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    pt.hide = function (dur) {

        var that = this

        return Promise.resolve(that.willHide()).then(function () {

            var p

            if (that.hideAnim && that.hideAnimDur) {

                p = that.elem.anim(that.hideAnim, dur || that.hideAnimDur)

            }

            that.elem.css('visibility', 'hidden')

            return p

        }).then(function () {

            return that.didHide()

        })

    }

    /**
     * Hides and removes the component.
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    pt.disappear = function (dur) {

        var that = this

        return this.hide(dur).then(function () {

            return that.elem.remove()

        })

    }

})
