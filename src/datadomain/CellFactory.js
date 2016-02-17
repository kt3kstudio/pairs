const {subclass} = $.cc

/**
 * The factory for Cell.
 *
 * @class
 */
datadomain.CellFactory = subclass(function (pt) {
    'use strict'

    /**
     * Creates a cell from the object.
     *
     * @param {Object} obj The object
     * @return {datadomain.Cell}
     */
    pt.createFromObject = function (obj) {

        return new datadomain.Cell(obj.gene)

    }

    /**
     * Creates a collection of the cells from the array.
     *
     * @param {Array} array The array
     * @return {datadomain.CellCollection}
     */
    pt.createCollectionFromArray = function (array) {

        var that = this

        return new datadomain.CellCollection(array.map(function (obj) {

            return that.createFromObject(obj)

        }))

    }

})
