/**
 * Global object.
 *
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
 * Add a comma to separate each group of three digits in a text.
 *
 * @param {Number} number The number
 * @return {String}
 */
global.commaNumber = function (number) {

    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")

};
