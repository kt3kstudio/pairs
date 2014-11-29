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
    };

    var bmsPrototype = exports.prototype;

    bmsPrototype.move = function (dir) {

        // position interface
        // pos.x x-coordinate
        // pos.y y-coordinate
        var pos = this.ball.posAhead(dir);

        if (this.mobs.find(pos) == null) {

            this.ball.refuseToMove(dir);

            return Promise.reject();
        }

        this.ball[dir]();

        var w = this.mobs.leave(pos);

        return this.box.take(w);
    };

    bmsPrototype.up = function () { return this.move('up'); };
    bmsPrototype.down = function () { return this.move('down'); };
    bmsPrototype.right = function () { return this.move('right'); };
    bmsPrototype.left = function () { return this.move('left'); };

    // `Mobs` role (extends Map)
    var Mobs = function (wanderers) {
        this.wanderers = wanderers;
    };

    var mobsPrototype = Mobs.prototype;

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
