/**
 * @class
 *
 * FusionPair represents the pair of cells which perform the fusion of them.
 */
domain.level.FusionPair = subclass(function (pt) {
  'use strict'

  var meiosis = null

  /**
   * @constructor
   * @param {domain.level.Cell} left The left cell
   * @param {domain.level.Cell} right The right cell
   */
  pt.constructor = function (left, right) {
    this.left = left
    this.right = right

    this.meiosis = meiosis || (meiosis = new domain.genetics.MeioticService())
  }

  var getGene = function (cell) {
    return cell ? cell.gene : ''
  }

  var isLastOne = function (cell) {
    return cell ? cell.isLastOne() : false
  }

  /**
   * Creates a new gene from the pair of cells
   *
   * @param {String} x The first gene
   * @param {String} y The second gene
   * @returns {String} The new gene
   */
  pt.newGene = function () {
    this.__newGene__ = this.__newGene__ || this.meiosis.recombination(this.leftGene(), this.rightGene())

    return this.__newGene__
  }

  /**
   * Checks if the pair is evolving.
   *
   * @return {Boolean}
   */
  pt.isEvolving = function () {
    var prevLength = Math.max(this.meiosis.virtualLength(this.leftGene()), this.meiosis.virtualLength(this.rightGene()))

    var newLength = this.meiosis.virtualLength(this.newGene())

    return newLength > prevLength
  }

  /**
   * Returns true if the pair is the last one of the round.
   *
   * @return {Boolean}
   */
  pt.isLastOne = function () {
    return isLastOne(this.left) || isLastOne(this.right)
  }

  /**
   * Returns the left gene.
   *
   * @return {String}
   */
  pt.leftGene = function () {
    return getGene(this.left)
  }

  /**
   * Returns the right gene.
   *
   * @return {String}
   */
  pt.rightGene = function () {
    return getGene(this.right)
  }

  /**
   * Calculates the score of the pair.
   *
   * @return {Number} The score
   */
  pt.score = function () {
    var length = this.meiosis.virtualLength(this.newGene())

    var score = Math.pow(length, 2) * 10

    if (this.isLastOne()) {
      score *= 2
    }

    return score
  }
})
