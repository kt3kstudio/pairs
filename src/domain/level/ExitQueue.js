/**
 * ExitQueue class represents the exit queue at the level view.
 *
 * @class
 */
domain.level.ExitQueue = subclass(function (pt) {
    'use strict'

    /**
     * @param {domain.common.Grid} grid The grid
     */
    pt.constructor = function (grid) {

        this.grid = grid
        this.queue = []

    }

    /**
     * Enqueues the cell.
     *
     * @param {domain.level.Cell} cell The cell
     * @return {Promise} The promise resolves with the cell.
     */
    pt.enqueue = function (cell) {

        this.queue.push(new Queuee(cell, this.grid))

        return this.goForward()

    }

    /**
     * Release cells.
     *
     * @return {Array}
     */
    pt.releaseCells = function () {

        return this.queue.splice(0).map(function (queuee) {

            return queuee.cell

        })

    }

    /**
     * Makes the entire queue go forward.
     *
     * @private
     * @return {Promise}
     */
    pt.goForward = function () {

        var d = 200 / this.queue.length

        return this.queue.map(function (queuee, i) {

            return wait(i * d).then(function () {

                return queuee.goForward()

            })

        }).pop()

    }

    /**
     * Checks if the queue is finished and has the last cell evolving.
     *
     * @return {Boolean}
     */
    pt.theLastOneIsEvolved = function () {

        if (this.queue.length === 0) {

            return false

        }

        var cell = this.queue[this.queue.length - 1].cell

        return cell.isLastOne() && cell.isEvolved()

    }

    /**
     * Queuee class is the role of the cell which is queued in the ExitQueue.
     *
     * @class domain.level.ExitQueue.Queuee
     * @private
     */
    var Queuee = subclass(function (pt) {
        /*
         * @constructor
         * @param {domain.level.Cell} cell The queueing cell
         * @param {domain.common.Grid} grid The grid
         */
        pt.constructor = function (cell, grid) {

            this.cell = cell
            this.cell.setGrid(grid, -1, 0)
            this.cell.setTransitionDuration(500)

        }

        /**
         * Goes forward in the queue.
         */
        pt.goForward = function () {

            if (this.cell.m < 4) {

                this.cell.m += 1

            } else {

                this.cell.n += 1

            }

            return this.cell.updateElemOnGrid()

        }

    })

})
