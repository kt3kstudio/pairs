/**
 * @class
 * Floor class handles the behaviour of floor of the corridor view
 */
domain.map.Floor = subclass(function (pt) {
    'use strict';

    var FLOOR_MOVE_DUR = 400;

    pt.constructor = function () {
        this.$dom = $('.floor');
    };

    pt.constructor.HEIGHT_RATE = 0.35;

    pt.appear = function () {
        this.$dom.removeClass('floor-hidden');

        return this.$dom.anim('floor-appear', FLOOR_MOVE_DUR);
    };

    pt.disappear = function () {
        var that = this;

        that.$dom.addClass('floor-hidden');

        return this.$dom.anim('floor-disappear', FLOOR_MOVE_DUR).then(function () {


        });
    };

});
