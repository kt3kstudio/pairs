



domain.splash.Logo = $.cc.subclass(domain.common.Being, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.apply(this, arguments);

        this.__loaded__ = new Promise(function (resolve) {

            elem.on('load', resolve);

        });

    };

    pt.willShow = function () {

        return this.__loaded__;

    };

    pt.didShow = function () {

        this.elem.css('opacity', 1);

    };

    pt.didHide = function () {

        this.elem.css('opacity', 0);

    };

    pt.showAnim = 'logo-show';
    pt.showAnimDur = 350;

    // pt.showAnimation = new domain.common.Animation('logo-anim', 500);

    pt.hideAnim = 'logo-hide';
    pt.hideAnimDur = 350;

});

$.cc.assign('splash-logo', domain.splash.Logo);
