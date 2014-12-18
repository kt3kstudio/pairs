

/**
 * @class
 * ResultPane represents the pane which appears when the game finished with score.
 */
ui.level.ResultPane = (function () {
    'use strict';

    var exports = function () {
    };

    var rpPt = exports.prototype;

    rpPt.createDom = function () {
    };

    rpPt.show = function () {

        this.$dom = this.$dom || this.createDom();

        this.$dom.show();

    };

    rpPt.hide = function () {
    };

    return exports;

}());
