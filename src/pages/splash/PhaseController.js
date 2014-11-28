window.pages = window.pages || {};
pages.splash = pages.splash || {};

/**
 * @class
 * PhaseController controls the phases of the splash page.
 */
pages.splash.PhaseController = (function () {
    'use strict';

    var ANIM_DUR = 1400;

    var exports = function () {
    };

    var spcPrototype = exports.prototype;

    spcPrototype.start = function () {
        var that = this;

        var dur = ANIM_DUR;

        return this.logoAnim('images/kt3k-studio.svg', dur).then(function () {

            return that.logoAnim('images/straw-logo.svg', dur);

        }).then(function () {

            that.goToTitle();

        });

    };

    spcPrototype.goToTitle = function () {
        location.replace('title.html');
    };

    spcPrototype.logoAnim = function (path, dur) {
        var that = this;

        return loadImage(path, 'splash-logo', document.body).then(function ($img) {

            $img.click(function () {
                that.goToTitle();
            });

            return $img.anim('logo-anim', dur).then(function () {
                $img.remove();
            });

        });
    };

    return exports;

}());
