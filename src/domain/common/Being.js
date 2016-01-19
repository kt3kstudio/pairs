import Actor from './Actor'

/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 */
domain.common.Being = subclass(Actor, function (pt) {
    'use strict'

    var noop = function () {}

    /**
     * @property {domain.common.Animation} showAnim The animation name this elem showing with
     */
    pt.showAnim = null

    pt.willShow = noop
    pt.didShow = noop

    /**
     * 表示時アニメーションプロパティ (showAnim) に従ってアニメーションさせる。
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

            if (that.showAnim != null) {

                p = that.showAnim.apply(that.elem)

            }

            return p

        }).then(function () {

            return that.didShow()

        })

    }

    pt.hideAnim = null

    pt.willHide = noop
    pt.didHide = noop

    /**
     * 非表示時アニメーションプロパティ (hideAnim) に従ってアニメーションさせる。
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

            if (that.hideAnim != null) {

                p = that.hideAnim.apply(that.elem)

            }

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
