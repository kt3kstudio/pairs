/**
 * Global object.
 * @class
 * @singleton
 */
global = window;


/**
 * Returns a promise which resolves given milliseconds later with given object.
 *
 * @param {Number} n The time in milliseconds to wait
 * @param {Object} result The object which the returned promise resolve with
 * @returns {Promise}
 */
global.wait = function (n, result) {
    'use strict';

    return new window.Promise(function (resolve) {
        setTimeout(resolve.bind(null, result), n);
    });
};


/**
 * Load image and returns promise which resolves when the image loaded.
 */
global.loadImage = function (path, cls, dom) {
    'use strict';

    return new Promise(function (resolve) {
        var $img = $('<img />')
            .attr('src', path)
            .addClass(cls)
            .appendTo(dom)
            .on('load', function () {
                resolve($img);
            });
    });
};

/**
 * Unit duration of transition in the level
 */
global.unitDur = 300;


(function ($) {
    'use strict';

    $.fn.animation = function (animation) {
        this.css('-webkit-animation', '').reflow().css('-webkit-animation', animation);

        return this;
    };

    $.fn.reflow = function () {
        this[0].offsetWidth = this[0].offsetWidth;

        return this;
    };

    $.fn.anim = function (animation, dur) {
        this.animation(animation + ' ' + dur + 'ms');

        return wait(dur, this);
    };

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

}(window.jQuery));

/**
 * RxJS
 *
 * @class Rx
 * @singleton
 */
(function (Rx) {
    'use strict';

    /**
     * Rx.helpers
     *
     * @class Rx.helpers
     * @singleton
     */

    /**
     * Checks if it's flatMappable or not.
     *
     * @param {Object} x Testing object
     * @return {Boolean}
     */
    Rx.helpers.isObservableLike = function (x) {
        return x instanceof Rx.Observable || Rx.helpers.isPromise(x);
    };

    var wrapUnobservable = function (x) {
        return Rx.helpers.isObservableLike(x) ? x : [x];
    };

    /**
     * Rx.Observable
     * @class Rx.Observable
     */

    /**
     * Maps it and flatMap it only when it's possible.
     *
     * @param {Function} f Mapping function
     * @return {Rx.Observable}
     */
    Rx.Observable.prototype.pipe = function (f) {

        return  this.map(f).flattenObservable();

    };


    /**
     * Flattens it.
     *
     * @return {Rx.Observable}
     */
    Rx.Observable.prototype.flattenObservable = function () {

        return this.map(wrapUnobservable).flatMap(function (x) { return x; });

    };


    /**
     * Filters null equivalent element.
     *
     * @return {Rx.Observable}
     */
    Rx.Observable.prototype.filterNull = function () {

        return this.filter(function (x) {

            return x != null;

        });

    };


    /**
     * Array.
     *
     * @class Array
     */
    /**
     * Makes into flattenned stream.
     *
     * @return {Rx.Observable}
     */
    Array.prototype.toFlatStream = function () {

        return Rx.Observable.of.apply(null, this).flattenObservable();

    };

}(Rx));
