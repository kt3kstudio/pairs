/**
 * The collection class of Cell.
 */
datadomain.CellCollection = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {Array} cells The array of cells
     */
    pt.constructor = function (cells) {
        /**
         * @property {Array} cells The array of the cells
         */
        this.cells = cells
    }
})
