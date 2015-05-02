/**
 * @class
 * WallObject is an abstract class which represents the something on the wall in the map view.
 */
domain.map.WallObject = subclass(function (pt) {
    'use strict';

    pt.constructor = function (elem) {

        this.elem = elem;

        this.w = +elem.attr('w');
        this.h = +elem.attr('h');
        this.x = +elem.attr('x');
        this.y = +elem.attr('y');

        this.id = elem.attr('id');

        this.elem.width(this.w).height(this.h).offset({left: this.x, top: this.y});

        this.elem.registerActor(this);

    };

    pt.rightLimit = function () {
        return this.x + this.w;
    };

    pt.centerX = function () {
        return this.x + this.w / 2;
    };

    pt.centerY = function () {
        return this.y + this.h;
    };

    pt.appear = function () {
        return this.elem.anim(this.appearAnim, this.appearDur);
    };

    pt.disappear = function () {
        var that = this;

        return this.elem.anim(this.disappearAnim, this.disappearDur).then(function () {
            that.elem.remove();
        });
    };

    pt.open = function () {
        return Promise.resolve();
    };

    pt.close = function () {
        return Promise.resolve();
    };

});
