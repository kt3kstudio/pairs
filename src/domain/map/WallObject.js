/**
 * WallObject is an abstract class which represents the something on the wall in the map view.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.WallObject = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.w = +elem.attr('w');
        this.h = +elem.attr('h');
        this.x = +elem.attr('x');
        this.y = +elem.attr('y');

        this.id = elem.attr('id');

    };


    /**
     * Knocks the door (figuratively).
     */
    pt.doorKnock = function () {

        this.elem.trigger('door-knock', [this]);

    };


    pt.setupDom = function () {

        this.elem.width(this.w).height(this.h).offset({left: this.x, top: this.y});

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

        this.setupDom();

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


    pt.onGetWalker = function () {
        return Promise.resolve();
    };

});
