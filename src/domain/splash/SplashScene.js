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

            that.start().then(function () {

                that.goToTitle();

            });

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

        return chainPromise(LOGOS, function (logo) {

            return logoAnim(logo, ANIM_DUR);

        });

    };

    var chainPromise = function (array, createPromise) {

        return array.reduce(function (promise, item) {

            return promise.then(function () {

                return createPromise(item);

            });

        }, Promise.resolve());

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
