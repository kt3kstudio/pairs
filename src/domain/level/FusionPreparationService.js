import FusionPair from './FusionPair'

/**
 * FusionPreparationService takes cells in sequence and move them into the preparation position. After that it emits the list of cells for the actual fusion.
 *
 * @class
 */
domain.level.FusionPreparationService = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {Grid} grid The grid
     */
    pt.constructor = function (grid) {

        this.stack = new PreparationStack(grid)

    }

    /**
     * Processes the cell stream and returns the fusion pair stream.
     *
     * @param {Rx.Observable<domain.level.Cell>} cellStream
     * @return {Rx.Observable<FunsionPair>}
     */
    pt.processCellStream = function (cellStream) {

        var self = this

        return cellStream.pipe(function (cell) {

            return self.take(cell)

        }).filterNull()

    }

    /**
     * Takes cell into the fusion preparing position.
     *
     * @param {domain.level.Cell} cell The cell
     * @return {Promise} {Promise<FusionPair>}
     */
    pt.take = function (cell) {

        this.stack.push(cell)

        if (!this.stack.isPrepared()) {

            return

        }

        return Promise.all(this.stack.popAll()).then(([left, right]) => new FusionPair(left, right))

    }

    /**
     * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
     *
     * @class domain.level.FusionPreparationService.PreparationStack
     * @private
     */
    var PreparationStack = subclass(function (pt) {
        /**
         * @constructor
         * @param {Grid} grid The grid
         */
        pt.constructor = function (grid) {

            this.grid = grid
            this.stack = []
            this.isFinished = false

        }

        /**
         * The duration of going to fusion preparation position.
         */
        pt.takeDur = 700

        /**
         * Pushes to the stack.
         *
         * @param {domain.level.Cell} cell The cell
         */
        pt.push = function (cell) {

            this.isFinished = cell.isLastOne()

            this.stack.push(this.locate(cell, this.stack.length))

        }

        /**
         * locate the cell at the index.
         *
         * @param {domain.level.Cell} cell The cell
         * @param {Number} index The index
         * @return {Promise<domain.level.Cell>}
         */
        pt.locate = function (cell, index) {

            cell.setGrid(this.grid)

            cell.m = index
            cell.n = 0

            cell.setTransitionDuration(this.takeDur)

            return cell.fitToGrid().then(function () {

                return cell

            })

        }

        pt.isPrepared = function () {

            return this.isFinished || this.isFull()

        }

        pt.isFull = function () {

            return this.stack.length >= 2

        }

        /**
         * Pops all the cells.
         *
         * @return {Array<Promise<domain.level.Cell>>}
         */
        pt.popAll = function () {

            return this.stack.splice(0)

        }

    })

})
