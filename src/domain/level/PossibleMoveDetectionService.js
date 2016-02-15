/**
 * PossibleMoveDetectionService provides the functionality of detecting the possible moves in the play field.
 */
export default class PossibleMoveDetectionService {

    /**
     * @constructor
     * @param {Ball} ball The ball
     * @param {domain.level.CellCollection} cells The field cells
     */
    constructor(ball, cells) {

        this.ball = ball
        this.cells = cells

    }

    /**
     * Check if there is any space left in the play field.
     *
     * @returns {Boolean} true if possible move available
     */
    possible() {

        // if any of the next cells has a bom, then the next move is possible.
        if (this.cells.find(this.ball.posAhead('up'))) { return true }
        if (this.cells.find(this.ball.posAhead('down'))) { return true }
        if (this.cells.find(this.ball.posAhead('left'))) { return true }
        if (this.cells.find(this.ball.posAhead('right'))) { return true }

        return false

    }

    /**
     * Check if there is a cell at the position of the ball.
     *
     * @return {Boolean} true iff there is a cell at the ball
     */
    cellRemainsAtBall() {

        return this.cells.find(this.ball.pos()) != null

    }

}
