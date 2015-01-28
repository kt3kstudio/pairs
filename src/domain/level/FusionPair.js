
/**
 * @class
 *
 * FusionPair represents the pair of cells which perform the fusion of them.
 */
domain.level.FusionPair = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {domain.level.Cell} left The left cell
     * @param {domain.level.Cell} right The right cell
     */
    pt.constructor = function (left, right) {
        this.left = left;
        this.right = right;
    };


    var getGene = function (cell) {

        return cell ? cell.gene : '';

    };

    var isLastOne = function (cell) {

        return cell ? cell.isLastOne() : false;

    };


    /**
     * Creates a new gene from the pair of cells
     *
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */
    pt.newGene = function () {

        this.__newGene__ = this.__newGene__ || geneFusion(this.leftGene(), this.rightGene());

        return this.__newGene__;

    };


    /**
     * Checks if the pair is evolving.
     *
     * @return {Boolean}
     */
    pt.isEvolving = function () {

        return this.newGene().length > Math.max(this.leftGene().length, this.rightGene().length);

    };


    /**
     * Returns true if the pair is the last one of the round.
     *
     * @return {Boolean}
     */
    pt.isLastOne = function () {

        return isLastOne(this.left) || isLastOne(this.right);

    };


    /**
     * Returns the left gene.
     *
     * @return {String}
     */
    pt.leftGene = function () {

        return getGene(this.left);

    };


    /**
     * Returns the right gene.
     *
     * @return {String}
     */
    pt.rightGene = function () {

        return getGene(this.right);

    };


    /**
     * Calculates the score of the pair.
     *
     * @return {Number} The score
     */
    pt.score = function () {

        var length = this.newGene().length;

        var score = Math.pow(length, 2) * 10;

        if (this.isLastOne()) {
            score *= 2;
        }

        return score;

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

});
