/**
 * SplashScene controls the splash screen.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.splash.SplashScene = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    var ANIM_DUR = 1400;

    var LOGOS = [
        'images/kt3k-studio.svg',
        'images/straw-logo.svg'
    ];

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        setTimeout(function () {

            that.start();

        });

        elem.on('click touchstart', function () {

            that.goToTitle();

        });

    };


    /**
     * Starts the splash scene.
     *
     * @return {Promise}
     */
    pt.start = function () {

        var self = this;

        return util.chainPromise(LOGOS, function (logo) {

            return logoAnim(logo, ANIM_DUR);

        }).then(function () {

            self.goToTitle();

        });

    };

    /**
     * The scene goes to the title.
     */
    pt.goToTitle = function () {

        location.replace('title.html');

    };

    /**
     * Animates the logo.
     *
     * @param {String} path The path of the image
     * @param {Number} dur The duration of the animation
     */
    var logoAnim = function (path, dur) {

        return loadImage(path, 'splash-logo', document.body).then(function ($img) {

            return $img.anim('logo-anim', dur).then(function () {

                $img.remove();

            });

        });
    };

});

$.cc.assign('splash-scene', domain.splash.SplashScene);
