import {wait} from 'spn'
/**
 * ExitQueue class represents the exit queue at the level view.
 */
export default class ExitQueue {

    /**
     * @param {Grid} grid The grid
     */
    constructor(grid) {

        this.grid = grid
        this.queue = []

    }

    /**
     * Processes the new cell stream and returns a stream of arrays of exiting cells.
     *
     * @param {Rx.Observable<Cell>} newCellStream The stream of the new cells
     * @return {Rx.Observable<Cell[]>}
     */
    processNewCellStream(newCellStream) {

        return newCellStream

        .pipe(newCell => this.enqueue(newCell).then(() => newCell))

        .filter(newCell => newCell.isLastOne())

        .map(() => {

            if (this.theLastOneIsEvolved()) {

                return this.releaseCells()

            }

            // this finishes the stream
            return null

        })

        .takeWhile(releasedCells => releasedCells != null)

    }

    /**
     * Enqueues the cell.
     *
     * @param {Cell} cell The cell
     * @return {Promise} The promise resolves with the cell.
     */
    enqueue(cell) {

        this.queue.push(new Queuee(cell, this.grid))

        return this.goForward()

    }

    /**
     * Release cells.
     *
     * @return {Array}
     */
    releaseCells() {

        return this.queue.splice(0).map(queuee => queuee.cell)

    }

    /**
     * Makes the entire queue go forward.
     *
     * @private
     * @return {Promise}
     */
    goForward() {

        const d = 200 / this.queue.length

        return this.queue.map((queuee, i) => wait(i * d).then(() => queuee.goForward())).pop()

    }

    /**
     * Checks if the queue is finished and has the last cell evolving.
     *
     * @return {Boolean}
     */
    theLastOneIsEvolved() {

        if (this.queue.length === 0) {

            return false

        }

        const cell = this.queue[this.queue.length - 1].cell

        return cell.isLastOne() && cell.isEvolved()

    }

}

/**
 * Queuee class is the role of the cell which is queued in the ExitQueue.
 */
class Queuee {
    /*
     * @constructor
     * @param {Cell} cell The queueing cell
     * @param {Grid} grid The grid
     */
    constructor(cell, grid) {

        this.cell = cell
        this.cell.setGrid(grid, -1, 0)
        this.cell.setTransitionDuration(500)

    }

    /**
     * Goes forward in the queue.
     */
    goForward() {

        if (this.cell.m < 4) {

            this.cell.m += 1

        } else {

            this.cell.n += 1

        }

        return this.cell.updateElemOnGrid()

    }

}
