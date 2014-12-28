
/**
 * @class
 * FusionPair represents the pair of cells which perform the fusion of them.
 */
domain.level.FusionPair = (function () {
    'use strict';

    var exports = function (left, right) {
        this.left = left;
        this.right = right;
    };

    var fpPt = exports.prototype;

    /**
     * Creates a new gene from the pair of cells
     *
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */
    fpPt.newGene = function () {
        return geneFusion(this.left.gene, this.right.gene);
    };


    /**
     *
     */
    fpPt.score = function () {
        var length = this.newGene().length;

        return Math.pow(length, 2) * 10;
    };

    /**
     * Creates a new gene from a pair of genes
     *
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */
    var geneFusion = function (x, y) {
        return (x + y).replace(/(\w)(\1)/g, '$1');
    };

    return exports;

}());
