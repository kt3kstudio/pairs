/**
 * Floor class handles the behaviour of floor of the Map view
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.Floorboard = subclass(domain.common.Being, function (pt) {
    'use strict';

    var FLOORBOARD_MOVE_DUR = 400;

    pt.constructor.HEIGHT_RATE = 0.35;

    pt.willShow = function () {

        this.elem.css('height', $(window).height() * pt.constructor.HEIGHT_RATE);
        this.elem.css('top', $(window).height() * (1 - pt.constructor.HEIGHT_RATE));
        this.elem.css('transform', 'scale(1)');

        return wait(FLOORBOARD_MOVE_DUR);

    };

    pt.willHide = function () {

        this.elem.css('transform', 'scale(1, 0)');

        return wait(FLOORBOARD_MOVE_DUR);

    };

});


$.assignClassComponent('floorboard', domain.map.Floorboard);
