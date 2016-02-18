import FusionPair from './FusionPair'

/**
 * FusionPreparationService takes cells in sequence and move them into the preparation position. After that it emits the list of cells for the actual fusion.
 *
 * @class
 */
export default class FusionPreparationService {

    /**
     * @constructor
     * @param {Grid} grid The grid
     */
    constructor(grid) {

        this.stack = new PreparationStack(grid)

    }

    /**
     * Processes the cell stream and returns the fusion pair stream.
     *
     * @param {Rx.Observable<Cell>} cellStream
     * @return {Rx.Observable<FunsionPair>}
     */
    processCellStream(cellStream) {

        return cellStream.pipe(cell => this.take(cell)).filterNull()

    }

    /**
     * Takes cell into the fusion preparing position.
     *
     * @param {Cell} cell The cell
     * @return {Promise} {Promise<FusionPair>}
     */
    take(cell) {

        this.stack.push(cell)

        if (!this.stack.isPrepared()) {

            return

        }

        return Promise.all(this.stack.popAll()).then(([left, right]) => new FusionPair(left, right))

    }

}

/**
 * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
 */
class PreparationStack {

    /**
     * @constructor
     * @param {Grid} grid The grid
     */
    constructor(grid) {

        this.grid = grid
        this.stack = []
        this.isFinished = false
        this.takeDur = 700 // The duration of going to fusion preparation position.

    }

    /**
     * Pushes to the stack.
     *
     * @param {Cell} cell The cell
     */
    push(cell) {

        this.isFinished = cell.isLastOne()

        this.stack.push(this.locate(cell, this.stack.length))

    }

    /**
     * locate the cell at the index.
     *
     * @param {Cell} cell The cell
     * @param {Number} index The index
     * @return {Promise<Cell>}
     */
    locate(cell, index) {

        cell.setGrid(this.grid)

        cell.m = index
        cell.n = 0

        cell.setTransitionDuration(this.takeDur)

        return cell.fitToGrid().then(() => cell)

    }

    isPrepared() {

        return this.isFinished || this.isFull()

    }

    isFull() {

        return this.stack.length >= 2

    }

    /**
     * Pops all the cells.
     *
     * @return {Array<Promise<Cell>>}
     */
    popAll() {

        return this.stack.splice(0)

    }

}
