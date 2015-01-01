/**
 * @class
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 */
domain.level.BallMoveMobLeaveService = (function () {
    'use strict';

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
     * @returns {Promise} A promise which resolves when the mob(bom)
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
     */
    bmsPrototype.leaveLastOneAtBall = function () {

        var mob = this.mobs.leave(this.ball.pos());

        mob.isLastOne = true;

        return mob;

    };

    /**
     * Make a mob at the specified position leave the field.
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

    // `Mobs` role (extends Map)
    /**
     * Mobs is the role class which represents the collection of cells on and below the field.
     *
     * Mobs is the adaptor class of domain.level.Map class into the BallMoveMobLeaveService context.
     *
     * @class domain.level.BallMoveMobLeaveService.Mobs
     * @private
     */
    /**
     * @constructor
     * @param {Array} The array of cells
     */
    var Mobs = function (wanderers) {
        this.wanderers = wanderers;
    };

    var mobsPrototype = Mobs.prototype;

    mobsPrototype.isEmpty = function () {
        return this.wanderers.isEmpty();
    };

    mobsPrototype.leave = function (pos) {
        var w = this.wanderers.select(pos);
        this.wanderers.filter(w);

        w = w[0];

        this.wanderers.selectRange(pos).forEach(function (cell) {
            cell.up();
        });

        return w;
    };

    mobsPrototype.find = function (pos) {
        return this.wanderers.find(pos);
    };

    return exports;

}());
