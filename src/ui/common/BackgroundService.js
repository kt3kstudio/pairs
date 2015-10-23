/**
 * BackgroundService handles the animation of background colors.
 *
 * @class
 */
ui.common.BackgroundService = subclass(function (pt) {
    'use strict';

    var Dur = 700;

    /**
     * Turns the bg color white.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */
    pt.constructor.turnWhite = function (dur) {

        return this.turn('', dur, false);

    };

    /**
     * Turns the bg color white.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */
    pt.constructor.turnBlack = function (dur) {

        return this.turn('', dur, true);

    };

    /**
     * Turns the bg color to the given color.
     *
     * @private
     * @param {String} color The color in css color
     * @param {Number} dur The duration
     * @param {Boolean} darkBg True if use dark background format
     * @return {Promise}
     */
    pt.constructor.turn = function (color, dur, darkBg) {

        dur = dur || Dur;

        $(document.body).toggleClass('dark-bg', darkBg).css('background-color', color);

        return wait(dur);

    };

});
