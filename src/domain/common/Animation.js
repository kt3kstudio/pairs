const ANIMATION_PROP_NAME = '-webkit-animation'
import reflow from 'spn/lib/reflow'

/**
 * Animation class represents the css animation.
 */
export default class Animation {

    /**
     * @param {String} name The name of the css animation (keyframes)
     * @param {Number} duration The duration of the animation
     */
    constructor(name, duration) {

        this.name = name
        this.duration = duration

    }

    /**
     * @param {jQuery} dom The jQuery dom element
     * @return {Promise}
     */
    apply(dom) {

        dom.css(ANIMATION_PROP_NAME, '')
        reflow(dom)
        dom.css(ANIMATION_PROP_NAME, this.name + ' ' + this.duration + 'ms')

        return wait(this.duration)

    }

}
