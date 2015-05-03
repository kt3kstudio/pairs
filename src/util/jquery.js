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
     * Assign a class as the defining class of the custom html class.
     *
     *
     * @param {String} name The name of the custom class
     * @param {Function} definingClass The definig class
     */
    $.assignClass = function (name, definingClass) {

        $.registerCustomClass(name, function (elem) {

            new definingClass(elem);

        });

    };


    /**
     * Registers the actor instance as the actor of the dom.
     *
     * @param {Object} actor The actor
     * @return {jQuery}
     */
    $.fn.registerActor = function (actor) {

        this.data('__actor__', actor);

        return this;

    };


    /**
     * Gets the actor of the given selector. Returns first one if there are some available.
     *
     * @param {String} selector The selector
     * @return {Object} The actor
     */
    $.fn.getActor = function (selector) {

        if (selector) {
            return this.find(selector).getActor();
        }

        return this.data('__actor__');

    };

    /**
     * Gets the array of the actors of the given selector.
     *
     * @param {String} selector The selector
     * @return {Array} The array of the actors
     */
    $.fn.getActorList = function (selector) {

        if (selector) {
            return this.find(selector).getActorList();
        }

        return this.map(function () {

            return $(this).data('__actor__');

        }).toArray().filter(function (x) { return !!x; });

    };

    /**
     * Short hand for $(document).getActor(...);
     *
     * @param {String} selector The selector
     * @return {Object}
     */
    $.getActor = function (selector) {

        return $(document).getActor(selector);

    };

    /**
     * Short hand for $(document).getActorList(...);
     *
     * @param {String} selector The selector
     * @return {Array}
     */
    $.getActorList = function (selector) {

        return $(document).getActorList(selector);

    };


    /**
     * Map one time event handlers to events of the given event mapping.
     *
     * @param {Object} obj The mapped object
     * @param {Object} mapping The mapping of the event
     * @param {jQuery} self
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
     * @param {jQuery} self
     */
    $.fn.mapEvent = function (obj, mapping) {

        var self = this;

        Object.keys(mapping).forEach(function (key) {

            self.on(key, obj[key].bind(obj));

        });

        return this;

    };


}(window.jQuery));
