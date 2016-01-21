import Actor from './Actor'

/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 */
export default class Being extends Actor {

    /**
     * @abstract
     */
    get showAnim() {

        return this._showAnim

    }

    /**
     * @abstract
     */
    set showAnim(anim) {

        this._showAnim = anim

    }

    /**
     * @abstract
     */
    get hideAnim() {

        return this._hideAnim

    }

    /**
     * @abstract
     */
    set hideAnim(anim) {

        this._hideAnim = anim

    }

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

        .then(() => this.showAnim != null && this.showAnim.apply(this.elem))

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

        .then(() => this.hideAnim != null && this.hideAnim.apply(this.elem))

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
