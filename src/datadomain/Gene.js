/**
 * Gene model
 *
 * ValueObject
 *
 * @class
 */
datadomain.Gene = subclass(function (pt) {
  'use strict'

  /**
   * @constructor
   * @param {String} gene The gene
   */
  pt.constructor = function (gene) {
    this.gene = gene

  }

  /**
   * Returns true if the given gene is the same.
   *
   * @param {datadomain.Gene} gene The gene to compare
   * @return {Boolean}
   */
  pt.equals = function (gene) {
    return gene instanceof datadomain.Gene && this.gene === gene.gene

  }

})
