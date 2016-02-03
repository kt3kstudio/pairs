import {wait, reflow} from 'spn'

/**
 * Performs the animation.
 *
 * @param {String} animation The css animation
 */
$.fn.animation = function (animation) {

    this.css('-webkit-animation', '')
    reflow(this)
    this.css('-webkit-animation', animation)

    return this

}

/**
 * Performs the animation in the duration and returns a promise.
 *
 * @param {String} animation The animation name
 * @param {Number} dur The duration of the animation
 * @return {Promise}
 */
$.fn.anim = function (animation, dur) {

    this.animation(animation + ' ' + dur + 'ms')

    return wait(dur, this)

}

/**
 * Binds event once and returns promise.
 *
 * @param {String} events The list of events names
 * @return {Promise}
 */
$.fn.once = function (events) {

    return new Promise((resolve) => this.one(events, resolve))

}

/**
 * Returns Observable of an event stream.
 *
 * @param {String} events The list of event names
 * @return {Rx.Observable}
 */
$.fn.streamOf = function (events) {

    return Rx.Observable.fromEvent(this, events)

}

/**
 * Returns a promise which resolves when image is loaded. Only works with `img` tag.
 *
 * @return {Promise}
 */
$.fn.imageLoaded = function () {

    return new Promise((resolve, reject) =>

        this

        .on('error', () => reject(new Error('image can not be loaded: ' + this.attr('src'))))

        .on('load', () => resolve())

        .attr('src', this.attr('src'))

    )

}

