/**
 * SplashScene controls the splash screen.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.splash.SplashScene = subclass(domain.common.Role, function (pt) {
    'use strict';

    pt.main = function () {

        var self = this;

        this.elem.find('.splash-logo.studio').cc.get('splash-logo').perform().then(function () {

            return self.elem.find('.splash-logo.straw').cc.get('splash-logo').perform();

        }).then(function () {

            return self.goToTitle();

        });

    }.event('scene-start');


    /**
     * The scene goes to the title.
     */
    pt.goToTitle = function () {

        location.replace('title.html');

    }.event('click', '.splash-logo');

});

$.cc.assign('splash-scene', domain.splash.SplashScene);
