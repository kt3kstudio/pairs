
/**
 * @class
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
        if (this.map.select(this.ball.posAhead('up'))) { return true; }
        if (this.map.select(this.ball.posAhead('down'))) { return true; }
        if (this.map.select(this.ball.posAhead('left'))) { return true; }
        if (this.map.select(this.ball.posAhead('right'))) { return true; }

        return false;
    };

    return exports;

}());
