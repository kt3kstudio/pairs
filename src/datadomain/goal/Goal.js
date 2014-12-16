
datadomain.goal.Goal = (function () {
    'use strict';

    var exports = function (type, options) {
        this.type = type;
        this.options = options;
    };

    var gPt = exports.prototype;

    gPt.toString = function () {
    };

    return exports;

}());
