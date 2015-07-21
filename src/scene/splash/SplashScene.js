/**
 * @class
 * PhaseController controls the phases of the splash page.
 */
scene.splash.SplashScene = subclass(scene.common.Scene, function (pt) {
    'use strict';

    var ANIM_DUR = 1400;

    pt.start = function () {
        var that = this;

        var dur = ANIM_DUR;

        $('body').on('click touchstart', this.goToTitle);

        return this.logoAnim('images/kt3k-studio.svg', dur).then(function () {

            return that.logoAnim('images/straw-logo.svg', dur);

        }).then(function () {

            that.goToTitle();

        });

    };

    pt.goToTitle = function () {
        location.replace('title.html');
    };

    pt.logoAnim = function (path, dur) {
        var that = this;

        return loadImage(path, 'splash-logo', document.body).then(function ($img) {

            $img.one('click touchstart', function () {
                that.goToTitle();
            });

            return $img.anim('logo-anim', dur).then(function () {
                $img.remove();
            });

        });
    };

});
