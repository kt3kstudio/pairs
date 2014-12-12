window.pages = window.pages || {};
pages.level = pages.level || {};

/**
 * @class
 * PhaseController controlls phase of processes of things in the level page.
 */
pages.level.PhaseController = (function ($) {
    'use strict';

    var exports = function () {
        this.lvRepo = new datadomain.LevelRepository();
    };

    var lpcPrototype = exports.prototype;

    lpcPrototype.loadCurrentLevel = function () {
        return this.getLevel(this.getLevelName());
    };

    lpcPrototype.getLevelName = function () {
        return window.location.hash.substring(1) || 0;
    };

    lpcPrototype.getLevel = function (level) {
        return this.lvRepo.loadByLevel(level);
    };

    return exports;

}(window.jQuery));
