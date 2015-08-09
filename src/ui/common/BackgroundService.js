/**
 * BackgroundService handles the animation of background colors.
 *
 * @class
 */
ui.common.BackgroundService = subclass(function (pt) {
    'use strict';

    var exports = pt.constructor;

    exports.transDur = 700;

    exports.turnWhite = function (dur) {
        dur = dur || exports.transDur;

        $(document.body).removeClass('dark-bg').css('background-color', '');

        return wait(dur);
    };

    exports.turnBlack = function (dur) {
        dur = dur || exports.transDur;

        $(document.body).addClass('dark-bg').css('background-color', '');

        return wait(dur);
    };

    exports.turnYellow = function (dur) {
        dur = dur || exports.transDur;

        $(document.body).removeClass('dark-bg').css('background-color', 'yellow');

        return wait(dur);
    };

});
