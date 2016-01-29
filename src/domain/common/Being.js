import Actor from './Actor'

/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 */
export default class Being extends Actor {

    /**
     * @abstract
     */
    showAnim() { return null }

    /**
     * @abstract
     */
    hideAnim() { return null }

    /**
     * @abstract
     */
    willShow() {}

    /**
     * @abstract
     */
    didShow() {}

    /**
     * 表示時アニメーションプロパティ (showAnim) に従ってアニメーションさせる。
     *
     * 事前に willShow hook, 事後に didShow hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    show(dur) {

        return Promise.resolve(this.willShow())

        .then(() => {

            const anim = this.showAnim()

            return anim != null && anim.apply(this.elem)

        })

        .then(() => this.didShow())

    }

    /**
     * @abstract
     */
    willHide() {}

    /**
     * @abstract
     */
    didHide() {}

    /**
     * 非表示時アニメーションプロパティ (hideAnim) に従ってアニメーションさせる。
     *
     * 事前に willHide hook, 事後に didHide hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    hide(dur) {

        return Promise.resolve(this.willHide())

        .then(() => {

            const anim = this.hideAnim()

            return anim != null && anim.apply(this.elem)

        })

        .then(() => this.didHide())

    }

    /**
     * Hides and removes the component.
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    disappear(dur) {

        return this.hide(dur).then(() => this.elem.remove())

    }

}
