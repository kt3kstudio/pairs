window.pages = window.pages || {};
pages.common = pages.common || {};

/**
 * @class
 * BackgroundService handles the animation of background colors.
 */
pages.common.BackgroundService = (function ($) {
    'use strict';

    var exports = {};

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

    return exports;

}(window.jQuery));
