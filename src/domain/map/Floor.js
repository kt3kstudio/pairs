/**
 * @class
 * Floor class handles the behaviour of floor of the corridor view
 */
domain.map.Floor = (function () {
    'use strict';

    var FLOOR_MOVE_DUR = 400;

    var exports = function () {
        this.$dom = $('.floor');
    };

    exports.HEIGHT_RATE = 0.35;

    var floorPrototype = exports.prototype;

    floorPrototype.appear = function () {
        this.$dom.removeClass('floor-hidden');

        return this.$dom.anim('floor-appear', FLOOR_MOVE_DUR);
    };

    floorPrototype.disappear = function () {
        var that = this;

        that.$dom.addClass('floor-hidden');

        return this.$dom.anim('floor-disappear', FLOOR_MOVE_DUR).then(function () {


        });
    };

    return exports;
}());
