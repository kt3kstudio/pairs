/**
 * @class
 * Floor class handles the behaviour of floor of the Map view
 */
domain.map.Floor = subclass(function (pt) {
    'use strict';

    var FLOOR_MOVE_DUR = 400;

    pt.constructor = function (elem) {
        this.elem = elem;

        elem.registerActor(this);
    };

    pt.constructor.HEIGHT_RATE = 0.35;

    pt.appear = function () {
        this.elem.removeClass('floor-hidden');

        return this.elem.anim('floor-appear', FLOOR_MOVE_DUR);
    };

    pt.disappear = function () {
        var that = this;

        that.elem.addClass('floor-hidden');

        return this.elem.anim('floor-disappear', FLOOR_MOVE_DUR).then(function () {

            that.elem.remove();

        });
    };

});


$.assignClass('floor', domain.map.Floor);
