/**
 * Floor class handles the behaviour of floor of the Map view
 *
 * @class
 * @extends domain.common.Being
 */
domain.map.Floorboard = subclass(domain.common.Being, function (pt) {
    'use strict'

    var FLOORBOARD_MOVE_DUR = 400

    pt.constructor.HEIGHT_RATE = 0.35

    /**
     * Returns the y coordinate of the ground line.
     *
     * @return {Number}
     */
    pt.constructor.groundLevel = function () {
        return $(window).height() * (1 - pt.constructor.HEIGHT_RATE)
    }

    /**
     * Returns the visual height of the ground on the screen.
     *
     * @return {Number}
     */
    pt.constructor.groundHeight = function () {
        return $(window).height() * pt.constructor.HEIGHT_RATE
    }

    pt.willShow = function () {
        this.elem.css('height', pt.constructor.groundHeight())
        this.elem.css('top', pt.constructor.groundLevel())
        this.elem.css('transform', 'scale(1)')

        return wait(FLOORBOARD_MOVE_DUR)
    }

    pt.willHide = function () {
        this.elem.css('transform', 'scale(1, 0)')

        return wait(FLOORBOARD_MOVE_DUR)
    }
})

$.cc.assign('floorboard', domain.map.Floorboard)
