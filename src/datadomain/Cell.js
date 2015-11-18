/**
 * The cell.
 *
 * [ValueObject]
 *
 * @class
 */
datadomain.Cell = subclass(function (pt) {
  'use strict'

  pt.constructor = function (gene) {
    /**
     * @property {String} gene The gene
     */
    this.gene = gene
  }
})
