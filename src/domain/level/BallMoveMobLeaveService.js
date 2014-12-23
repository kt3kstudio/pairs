// Domain layer
window.domain = window.domain || {};
domain.level = domain.level || {};
/**
 * @class
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 */
domain.level.BallMoveMobLeaveService = (function () {
    'use strict';

    var exports = function (ball, wanderers, box) {
        this.ball = ball;
        this.mobs = new Mobs(wanderers);
        this.box = box;

        this.pmds = new domain.level.PossibleMoveDetectionService(this.ball, wanderers);
    };

    var bmsPrototype = exports.prototype;

    /**
     * Make the ball to the specified direction and a mob leave the field.
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

            return Promise.reject();
        }

        this.ball.move(dir);

        return this.leaveAtPos(pos);

    };

    /**
     * Make a mob leave the field.
     */
    bmsPrototype.leaveOne = function () {

        return this.leaveAtPos(this.ball.pos());

    };

    /**
     * Make a mob at the specified position leave the field.
     */
    bmsPrototype.leaveAtPos = function (pos) {

        var that = this;

        var mob = this.mobs.leave(pos);

        if (!this.pmds.possible()) {

            console.log('no more move!');

            if (this.pmds.cellRemainsAtBall()) {

                console.log('last one cell');

                wait(600).then(function () {

                    return that.leaveOne();

                });

            } else {

                console.log('no cell left');

                mob.isLastOne = true;
            }

        }

        return this.box.take(mob);

    };

    // `Mobs` role (extends Map)
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
