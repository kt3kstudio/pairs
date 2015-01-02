/**
 * @class
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 */
domain.level.BallMoveMobLeaveService = (function () {
    'use strict';

    /**
     * @constructor
     * @param {domain.level.Ball} ball The ball
     * @param {Array} cells The cells
     */
    var exports = function (ball, cells) {
        this.ball = ball;
        this.mobs = new Mobs(cells);

        this.pmds = new domain.level.PossibleMoveDetectionService(this.ball, cells);
    };

    var bmsPrototype = exports.prototype;

    /**
     * Makes the ball move to the specified direction and a mob leave the field.
     *
     * @param {String} dir The direction the ball moves (up|down|right|left)
     * @returns {domain.level.Cell|Rx.Observable} A promise which resolves when the mob(bom) left the field
     */
    bmsPrototype.ballMoveAndLeaveOne = function (dir) {

        // position interface
        // pos.x x-coordinate
        // pos.y y-coordinate
        var pos = this.ball.posAhead(dir);

        if (this.mobs.find(pos) == null) {

            this.ball.refuseToMove(dir);

            return null;
        }

        this.ball.move(dir);

        return this.leaveAtPos(pos);

    };

    /**
     * Make the mob at the ball leave the field.
     *
     * @return {domain.level.Cell}
     */
    bmsPrototype.leaveLastOneAtBall = function () {

        var mob = this.mobs.leave(this.ball.pos());

        mob.isLastOne = true;

        return mob;

    };

    /**
     * Make a mob at the specified position leave the field.
     *
     * @param {Object} pos The position
     * @return {domain.level.Cell|Rx.Observable}
     */
    bmsPrototype.leaveAtPos = function (pos) {

        var that = this;

        var mob = this.mobs.leave(pos);


        if (this.pmds.possible()) {

            return mob;

        }

        console.log('no more move!');

        if (this.pmds.cellRemainsAtBall()) {

            console.log('cell remains at ball');

            return [mob, wait(600).then(function () {

                return that.leaveLastOneAtBall();

            })].toFlatStream();

        }

        console.log('no cell left');

        mob.isLastOne = true;

        return mob;

    };

    /**
     * Mobs is the role class which represents the collection of cells on and below the field.
     *
     * Mobs is the adaptor class of domain.level.Map class into the BallMoveMobLeaveService context.
     *
     * @class domain.level.BallMoveMobLeaveService.Mobs
     * @private
     */
    var Mobs =


    /**
     * @constructor
     * @param {Array} cells The array of cells
     */
    function (cells) {
        this.cells = cells;
    };

    var mobsPrototype = Mobs.prototype;

    /**
     * Check if the field is empty of cells.
     *
     * @return {Boolean}
     */
    mobsPrototype.isEmpty = function () {
        return this.cells.isEmpty();
    };

    /**
     * Makes the cell at the position leave the field.
     *
     * @param {Object} pos The position
     */
    mobsPrototype.leave = function (pos) {
        var w = this.cells.select(pos);

        this.cells.filter(w);

        w = w[0];

        this.cells.selectRange(pos).forEach(function (cell) {
            cell.up();
        });

        return w;
    };


    /**
     * Finds the cell at the position.
     *
     * @param {Object} pos The position
     */
    mobsPrototype.find = function (pos) {
        return this.cells.find(pos);
    };

    return exports;

}());
