window.domain = window.domain || {};
domain.common = domain.common || {};

/**
 *
 */
domain.common.BackgroundService = (function () {
    'use strict';

    var exports = {};

    exports.turnWhite = function () {
        $(document.body).removeClass('dark-bg');

        return wait(1000);
    };

    exports.turnBlack = function () {
        $(document.body).addClass('dark-bg');

        return wait(1000);
    };

    return exports;
}());
