/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
domain.map.FloorAsset = subclass(domain.common.DimensionalBeing, function (pt, parent) {
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


    pt.centerX = function () {

        return this.x;

    };

    pt.centerY = function () {

        return this.y;

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