/**
 * Animation class represents the css animation.
 */
domain.common.Animation = subclass(function (pt) {
    'use strict'

    var ANIMATION_PROP_NAME = '-webkit-animation'

    /**
     * @param {String} name The name of the css animation (keyframes)
     * @param {Number} duration The duration of the animation
     */
    pt.constructor = function (name, duration) {

        this.name = name
        this.duration = duration

    }

    /**
     * @param {jQuery} dom The jQuery dom element
     * @return {Promise}
     */
    pt.apply = function (dom) {

        dom
            .css(ANIMATION_PROP_NAME, '')
            .reflow()
            .css(ANIMATION_PROP_NAME, this.name + ' ' + this.duration + 'ms')

        return wait(this.duration)

    }

})
