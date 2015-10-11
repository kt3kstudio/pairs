/**
 * SplashScene controls the splash screen.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.splash.SplashScene = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        setTimeout(function () {

            that.main();

        });

    };

    pt.main = function () {

        var self = this;

        return util.chainPromise(this.elem.find('.splash-logo').toArray(), function (item) {

            var logo = $(item).cc.get('splash-logo');

            return logo.appear().then(function () {

                return wait(700);

            }).then(function () {

                return logo.disappear();

            });

        }).then(function () {

            self.goToTitle();

        });

    }.event('cc-main');

    /**
     * The scene goes to the title.
     */
    pt.goToTitle = function () {

        location.replace('title.html');

    }.event('click', '.splash-logo');

});

$.cc.assign('splash-scene', domain.splash.SplashScene);
