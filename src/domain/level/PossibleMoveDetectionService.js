/**
 * PossibleMoveDetectionService provides the functionality of detecting the possible moves in the play field.
 *
 * @class
 */
domain.level.PossibleMoveDetectionService = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {domain.level.Ball} ball The ball
     * @param {domain.level.CellCollection} cells The field cells
     */
    pt.constructor = function (ball, cells) {
        this.ball = ball
        this.cells = cells
    }

    /**
     * Check if there is any space left in the play field.
     *
     * @returns {Boolean} true if possible move available
     */
    pt.possible = function () {
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
    pt.cellRemainsAtBall = function () {
        return this.cells.find(this.ball.pos()) != null
    }
})
