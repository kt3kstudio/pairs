window.pages = window.pages || {};
pages.level = pages.level || {};

// Util
// calculate TOP, LEFT, UNIT, M, N when given top, fieldWidthPercent, M

/**
 * @class
 * Positioner creates metrics for each component.
 */
pages.level.Positioner = (function ($) {
    'use strict';

    var exports = function (top, fieldWidthPercent, m) {
        this.top = top;
        this.fwp = fieldWidthPercent;
        this.m = m;
        this.calc();
    };

    var positionerPt = exports.prototype;

    positionerPt.calc = function () {
        this.width = $(window).width();
        this.height = $(window).height();

        var shorter = Math.min(this.width, this.height - this.top);

        this.fieldWidth = shorter * this.fwp / 100;

        this.LEFT = Math.floor((this.width - this.fieldWidth) / 2);
        this.TOP = this.top;

        this.UNIT = Math.floor(this.fieldWidth / this.m);
    };

    positionerPt.metrics = function () {
        return {top: this.TOP, left: this.LEFT, unit: this.UNIT, width: this.UNIT * this.m};
    };

    return exports;
}(window.jQuery));
