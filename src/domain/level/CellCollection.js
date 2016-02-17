import FieldIndexGenerator from '../../util/FieldIndexGenerator'
import {wait} from 'spn'

const {component, Coelement} = $.cc

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */
@component('cell-collection')
export default class CellCollection extends Coelement {

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */
    constructor(elem) {

        super(elem)

        this.cells = []

    }

    /**
     * @param {Grid} grid
     */
    setGrid(grid) {

        this.grid = grid

        return this

    }

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} obj The bom object
     * @return {Cell}
     */
    createCellFromObject(obj) {

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
    isEmpty() {

        return this.cells.length === 0

    }

    /**
     * Loads field cells from object list.
     *
     * @param {Array} list The list of cells (Object)
     * @return {CellCollection}
     */
    loadFromObjectList(list) {

        return this.loadList(list.map(obj => this.createCellFromObject(obj)))

    }

    /**
     * Loads field cells from cell list.
     *
     * @param {Array<Cell>}
     */
    loadList(list) {

        const indices = new FieldIndexGenerator().generate(list.length, this.usedIndices())

        list.forEach((cell, i) => {

            const nm = indices[i]

            cell.setGrid(this.grid, nm[1], nm[0])
            cell.unsetLastOne()

            this.cells.push(cell)

        })

    }

    /**
     * Processes the stream of released cells from the exit queue.
     *
     * @param {Rx.Observable<Cell[]>}
     * @return {Rx.Observable}
     */
    processCellStream(releasedCellStream) {

        return releasedCellStream.pipe(releasedCells => {

            this.loadList(releasedCells)

            return this.resetShapeAndLocate()

        })

    }

    /**
     * Appears all the cells
     *
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */
    appear() {

        return this.cells.map((cell, i) => wait(i * 56).then(() => cell.show())).pop()

    }

    /**
     * Reset the shapes of the cells and locate them.
     *
     * @return {Promise}
     */
    resetShapeAndLocate() {

        return this.cells.map((cell, i) => wait(i * 56).then(() => cell.resetShapeAndLocate())).pop()

    }

    /**
     * Selects all the cells at the position.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    select(pos) {

        return this.cells.filter(cell => cell.m === pos.m && cell.n === pos.n)

    }

    /**
     * Finds a cell at the position.
     *
     * @param {Object} pos The position.
     * @return {Cell}
     */
    find(pos) {

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
    selectRange(pos) {

        return this.cells.filter(cell => cell.m === pos.m && cell.n > pos.n)

    }

    /**
     * Removes the given cells.
     *
     * @param {Array} cells The cells
     */
    remove(cells) {

        this.cells = this.cells.filter(cell => cells.indexOf(cell) < 0)

    }

    /**
     * Returns the list of used position indices.
     *
     * @return {Array}
     */
    usedIndices() {

        return this.cells.map(cell => [cell.m, cell.n])

    }

}
