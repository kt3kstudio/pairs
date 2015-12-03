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
     * @return {Promise}
     */
    pt.show = function () {

        var that = this

        return Promise.resolve(that.willShow()).then(function () {

            var p

            if (that.showAnim && that.showAnimDur) {

                p = that.elem.anim(that.showAnim, that.showAnimDur)

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
     * @return {Promise}
     */
    pt.hide = function () {

        var that = this

        return Promise.resolve(that.willHide()).then(function () {

            var p

            if (that.hideAnim && that.hideAnimDur) {

                p = that.elem.anim(that.hideAnim, that.hideAnimDur)

            }

            that.elem.css('visibility', 'hidden')

            return p

        }).then(function () {

            return that.didHide()

        })

    }

    pt.willAppear = noop
    pt.didAppear = noop

    pt.appear = function () {

        var that = this

        return Promise.resolve(that.willAppear()).then(function () {

            return that.show()

        }).then(function () {

            return that.didAppear()

        })

    }

    pt.willDisappear = noop
    pt.didDisappear = noop

    pt.disappear = function () {

        var that = this

        return Promise.resolve(that.willDisappear()).then(function () {

            return that.hide()

        }).then(function () {

            return that.didDisappear()

        }).then(function () {

            that.elem.remove()

        })

    }

})
