

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

        return this.getToReactor(pair).then(function () { return that.fusion(pair); });
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

    /**
     * Creates a new gene from a pair of genes
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */
    fusionPt.newGene = function (x, y) {
        return (x + y).replace(/(\w)(\1)/g, '$1');
    };

    fusionPt.fusion = function (pair) {
        var dur = 600;

        var newGene = this.newGene(pair.left.gene, pair.right.gene);

        var bom = new domain.level.Wanderer(0, 0, newGene, this.metrics.left, this.metrics.top, this.metrics.unit);

        bom.locate();

        bom.$dom.prependTo('#main');
        bom.$dom.animation('bom-born ' + dur + 'ms');

        return wait(dur).then(function () { return bom; });
    };

    return exports;
}());
