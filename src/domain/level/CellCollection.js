import FieldIndexGenerator from '../../util/FieldIndexGenerator'
import {wait} from 'spn'

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */
domain.level.CellCollection = subclass($.cc.Coelement, function (pt, parent) {
    'use strict'

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem)

        this.cells = []

    }

    /**
     * @param {Grid} grid
     */
    pt.setGrid = function (grid) {

        this.grid = grid

        return this

    }

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} obj The bom object
     * @return {domain.level.Cell}
     */
    pt.createCellFromObject = function (obj) {

        return $('<object />', {
            data: {gene: obj.gene},
            prependTo: this.elem
        }).cc.init('cell')

    }

    /**
     * Checks if the field is empty.
     *
     * @return {Boolean}
     */
    pt.isEmpty = function () {

        return this.cells.length === 0

    }

    /**
     * Loads field cells from object list.
     *
     * @param {Array} list The list of cells (Object)
     * @return {domain.level.CellCollection}
     */
    pt.loadFromObjectList = function (list) {

        return this.loadList(list.map(function (obj) {

            return this.createCellFromObject(obj)

        }, this))

    }

    /**
     * Loads field cells from cell list.
     *
     * @param {Array} list The list of cells (domain.level.Cell)
     */
    pt.loadList = function (list) {

        var indices = new FieldIndexGenerator().generate(list.length, this.usedIndices())

        list.forEach(function (cell, i) {

            var nm = indices[i]

            cell.setGrid(this.grid, nm[1], nm[0])
            cell.unsetLastOne()

            this.cells.push(cell)

        }, this)

    }

    /**
     * Processes the stream of released cells from the exit queue.
     *
     * @param {Rx.Observable<domain.level.Cell[]>}
     * @return {Rx.Observable}
     */
    pt.processCellStream = function (releasedCellStream) {

        var self = this

        return releasedCellStream.pipe(function (releasedCells) {

            self.loadList(releasedCells)

            return self.resetShapeAndLocate()

        })

    }

    /**
     * Appears all the cells
     *
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */
    pt.appear = function () {

        return this.cells.map(function (cell, i) {

            return wait(i * 56).then(function () {

                cell.show()

            })

        }).pop()

    }

    /**
     * Reset the shapes of the cells and locate them.
     *
     * @return {Promise}
     */
    pt.resetShapeAndLocate = function () {

        return this.cells.map(function (cell, i) {

            return wait(i * 56).then(function () {

                return cell.resetShapeAndLocate()

            })

        }).pop()

    }

    /**
     * Selects all the cells at the position.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.select = function (pos) {

        return this.cells.filter(function (cell) {

            return cell.m === pos.m && cell.n === pos.n

        })

    }

    /**
     * Finds a cell at the position.
     *
     * @param {Object} pos The position.
     * @return {domain.level.Cell}
     */
    pt.find = function (pos) {

        var candidates = this.select(pos)

        if (candidates.length === 0) {

            return null

        }

        return candidates[0]

    }

    /**
     * Selects the cells below the given postion.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.selectRange = function (pos) {

        return this.cells.filter(function (cell) {

            return cell.m === pos.m && cell.n > pos.n

        })

    }

    /**
     * Removes the given cells.
     *
     * @param {Array} cells The cells
     */
    pt.remove = function (cells) {

        this.cells = this.cells.filter(function (cell) {

            return cells.indexOf(cell) < 0

        })

    }

    /**
     * Returns the list of used position indices.
     *
     * @return {Array}
     */
    pt.usedIndices = function () {

        return this.cells.map(function (cell) {

            return [cell.m, cell.n]

        })

    }

})

$.cc.assign('cell-collection', domain.level.CellCollection)
