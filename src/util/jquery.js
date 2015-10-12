/**
 * jQuery class
 *
 * @class jQuery
 */
(function ($) {
    'use strict';


    /**
     * Performs the animation.
     *
     * @param {String} animation The css animation
     */
    $.fn.animation = function (animation) {
        this.css('-webkit-animation', '').reflow().css('-webkit-animation', animation);

        return this;
    };

    /**
     * Reflows the dom.
     */
    $.fn.reflow = function () {
        $(this).size($(this).size());

        return this;
    };

    /**
     * Performs the animation in the duration and returns a promise.
     *
     * @param {String} animation The animation name
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    $.fn.anim = function (animation, dur) {
        this.animation(animation + ' ' + dur + 'ms');

        return wait(dur, this);
    };


    /**
     * Binds event once and returns promise.
     *
     * @param {String} events The list of events names
     * @return {Promise}
     */
    $.fn.once = function (events) {
        var that = this;

        return new Promise(function (resolve) {

            that.one(events, function (event) {

                resolve(event);

            });

        });
    };

    /**
     * Returns Observable of an event stream.
     *
     * @param {String} events The list of event names
     * @return {Rx.Observable}
     */
    $.fn.streamOf = function (events) {
        return Rx.Observable.fromEvent(this, events);
    };



    /**
     * Map one time event handlers to events of the given event mapping.
     *
     * @param {Object} obj The mapped object
     * @param {Object} mapping The mapping of the event
     */
    $.fn.mapEventOne = function (obj, mapping) {

        var self = this;

        Object.keys(mapping).forEach(function (key) {

            self.one(key, obj[key].bind(obj));

        });

        return this;

    };


    /**
     * Maps event handlers to events of the given event mapping.
     *
     * @param {Object} obj The mapped object
     * @param {Object} mapping The mapping of the event
     */
    $.fn.mapEvent = function (obj, mapping) {

        var self = this;

        Object.keys(mapping).forEach(function (key) {

            self.on(key, obj[key].bind(obj));

        });

        return this;

    };

    /**
     * Returns a promise which resolves when image is loaded. Only works with `img` tag.
     *
     * @return {Promise}
     */
    $.fn.imageLoaded = function () {

        var self = this;

        return new Promise(function (resolve, reject) {

            self.on('error', function () {

                reject(new Error('image can not be loaded: ' + self.attr('src')));

            });

            self.on('load', function () {

                resolve();

            });

            self.attr('src', self.attr('src'));

        });
    };

    /**
     * Sets the position
     */
    $.fn.setPosition = function (position) {

        this.css('left', position.left);
        this.css('top', position.top);

        return this;

    };


}(window.jQuery));
