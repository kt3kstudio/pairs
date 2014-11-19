

window.domain = window.domain || {};
domain.level = domain.level || {};
/**
 *
 */
domain.level.FusionBox = (function () {
    'use strict';

    var exports = function (metrics) {
        this.metrics = metrics;
    };

    var fusionPt = exports.prototype;

    fusionPt.take = function (pair) {

        var that = this;

        return this.getToReactor(pair).then(function () { that.fusion(pair); });
    };

    fusionPt.getToReactor = function (pair) {
        var dur = 1000;
        console.log(pair);

        pair.left.$dom.animation('get-to-reactor-left ' + dur + 'ms');
        pair.right.$dom.animation('get-to-reactor-right ' + dur + 'ms');

        return wait(dur).then(function () {
            pair.left.remove();
            pair.right.remove();
        });
    };

    fusionPt.fusion = function (pair) {
        var dur = 600;
        var bom = new domain.level.Wanderer(0, 0, pair.left.gender, this.metrics.left, this.metrics.top, this.metrics.unit);

        bom.$dom.animation('bom-born ' + dur + 'ms');

        return wait(dur);
    };

    return exports;
}());
