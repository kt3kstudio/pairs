window.pages = window.pages || {};
pages.level = pages.level || {};

/**
 * @class
 * PhaseController controlls phase of processes of things in the level page.
 */
pages.level.PhaseController = (function ($) {
    'use strict';

    var exports = function () {
    };

    var lpcPrototype = exports.prototype;

    lpcPrototype.loadCurrentLevel = function () {
        var path = (window.location.hash.substring(1) || 0) + '.json';

        return this.getLevel(path);
    };

    lpcPrototype.getLevel = function (path) {
        return Promise.resolve($.getJSON('level/' + path));
    };

    return exports;

}(window.jQuery));
