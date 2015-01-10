debug.FusionCounter = (function () {
    'use strict';

    var exports = function () {
        this.table = {};
    };

    var fcPt = exports.prototype;

    fcPt.count = function (pair) {

        var gene = pair.newGene();

        this.table[gene] = this.table[gene] || 0;

        this.table[gene]++;

    };

    fcPt.toString = function () {

        return Object.keys(this.table).map(function (key) {
            return key + '(' + this.table[key] + ')';
        }, this).join(' ');

    };

    return exports;
}());
