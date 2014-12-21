/**
 * @class
 *
 * FusionBox represents the box in which the two cells combine and give birth to a new cell.
 */
domain.level.FusionBox = (function () {
    'use strict';

    var exports = function (metrics) {
        this.metrics = metrics;
    };

    var fusionPt = exports.prototype;

    fusionPt.take = function (pair) {

        var that = this;

        return this.getToReactor(pair).then(function () {

            return that.fusion(pair);

        });
    };

    fusionPt.getToReactor = function (pair) {
        var dur = 1000;

        pair.left.$dom.animation('get-to-reactor-left ' + dur + 'ms');
        pair.right.$dom.animation('get-to-reactor-right ' + dur + 'ms');

        return wait(dur).then(function () {
            pair.left.remove();
            pair.right.remove();
        });
    };

    fusionPt.fusion = function (pair) {
        var dur = 600;

        var bom = new domain.level.Wanderer(0, 0, pair.newGene(), this.metrics.left, this.metrics.top, this.metrics.unit);

        bom.locate();

        bom.$dom.prependTo('#main');

        return bom.$dom.anim('bom-born', dur).then(function () {

            return bom;

        });
    };

    return exports;

}());
