
/**
 * @class
 *
 * FusionPair represents the pair of cells which perform the fusion of them.
 */
domain.level.FusionPair = (function () {
    'use strict';

    var exports = function (left, right) {
        this.left = left;
        this.right = right;
    };


    var getGene = function (cell) {

        return cell ? cell.gene : '';

    };

    var isLastOne = function (cell) {

        return cell ? cell.isLastOne : false;

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

        this.__newGene__ = this.__newGene__ || geneFusion(this.leftGene(), this.rightGene());

        return this.__newGene__;

    };


    fpPt.isLastOne = function () {

        return isLastOne(this.left) || isLastOne(this.right);

    };


    fpPt.leftGene = function () {

        return getGene(this.left);

    };


    fpPt.rightGene = function () {

        return getGene(this.right);

    };


    /**
     * Calculates the score of the pair.
     *
     * @return {Number} The score
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
