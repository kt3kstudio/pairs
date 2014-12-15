// Util
// calculate positions of each component

/**
 * @class
 * Positioner creates metrics for each component.
 */
pages.level.Positioner = (function ($) {
    'use strict';

    var TOP_UI_HEIGHT = 50;
    var BOTTOM_UI_HEIGHT = 50;

    // height / width
    var PLAY_FIELD_RATIO = 6 / 4;

    var exports = function () {
        this.calc();
    };

    var posPt = exports.prototype;

    posPt.calcAvailableArea = function () {
        var w = this.width = $(window).width();
        var h = this.height = $(window).height();

        this.availableHeight = h - TOP_UI_HEIGHT - BOTTOM_UI_HEIGHT;
        this.availableWidth = w;
    };

    posPt.calcBestArea = function () {
        this.calcAvailableArea();

        if (this.availableWidth * PLAY_FIELD_RATIO > this.availableHeight) {

            // height dominant screen
            this.bestWidth = this.availableHeight / PLAY_FIELD_RATIO;
            this.bestHeight = this.availableHeight;
        } else {

            // width dominant screen
            this.bestWidth = this.availableWidth;
            this.bestHeight = this.availableWidth * PLAY_FIELD_RATIO;
        }
    };

    posPt.calcLeft = function () {
        this.left = (this.width - this.bestWidth) / 2;
    };

    posPt.calc = function () {
        this.calcBestArea();
        this.calcLeft();

        this.UNIT = this.bestWidth / 4;
        this.LEFT = this.left + this.UNIT / 2;
        this.TOP = TOP_UI_HEIGHT;
    };

    posPt.topUIPosition = function () {
        return {top: 0, left: this.left};
    };

    posPt.gridPosition = function (x, y, w) {
        var u = this.UNIT;

        return {top: this.TOP + u * y, left: this.LEFT + u * x, unit: u, width: u * w};
    };

    posPt.fieldMetrics = function () {
        return this.gridPosition(0, 2, 3);
    };

    posPt.evalRoomMetrics = function () {
        return this.gridPosition(0, 1, 2);
    };

    posPt.leftDoorMetrics = function () {
        return this.gridPosition(0, 0, 1);
    };

    posPt.rightDoorMetrics = function () {
        return this.gridPosition(2, 1, 1);
    };

    posPt.queueMetrics = function () {
        var pos = this.gridPosition(1, 0, 1);

        pos.unit /= 2;
        pos.left -= pos.unit / 4;

        return pos;
    };

    posPt.fusionBoxMetrics = function () {
        var pos = this.gridPosition(1, 1, 1);

        pos.unit /= 1.5;
        pos.left -= pos.unit / 4;

        return pos;
    };

    posPt.paperPos = function () {
        return {left: this.width / 2, top: this.TOP + this.UNIT * 4};
    };

    return exports;

}(window.jQuery));
