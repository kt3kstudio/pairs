/**
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

    return new Promise(function (resolve) {
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

}(window.jQuery));
