
/**
 * @class
 *
 * PossibleMoveDetectionService provides the functionality of detecting the possible moves in the play field.
 */
domain.level.PossibleMoveDetectionService = (function () {
    'use strict';

    var exports = function (ball, map) {
        this.ball = ball;
        this.map = map;
    };

    var pmdsPt = exports.prototype;

    /**
     * Check if there is any space left in the play field.
     *
     * @returns {Boolean} true if possible move available
     */
    pmdsPt.possible = function () {
        // if any of the next cells has a bom, then the next move is possible.
        if (this.map.find(this.ball.posAhead('up'))) { return true; }
        if (this.map.find(this.ball.posAhead('down'))) { return true; }
        if (this.map.find(this.ball.posAhead('left'))) { return true; }
        if (this.map.find(this.ball.posAhead('right'))) { return true; }

        return false;
    };

    /**
     * Check if there is a cell at the position of the ball.
     *
     * @return {Boolean} true iff there is a cell at the ball
     */
    pmdsPt.cellRemainsAtBall = function () {
        return this.map.find(this.ball.pos()) != null;
    };

    return exports;

}());
