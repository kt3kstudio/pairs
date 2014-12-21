/**
 * ExitQueue class represents the exit queue at the level view.
 */
domain.level.ExitQueue= (function () {
    'use strict';

    var QUEUE_MAX = 32;

    var exports = function (metrics) {
        this.metrics = metrics;
        this.queue = [];
        this.queueMax = QUEUE_MAX;
    };

    var eqPrototype = exports.prototype;

    eqPrototype.take = function (cell) {

        var that = this;

        return this.goForward().then(function () {

            return that.involve(cell);

        }).then(function () {

            return cell.locate();

        });
    };

    eqPrototype.goForward = function () {
        var p = Promise.resolve();

        var diffDur = 200 / this.queue.length;

        this.queue.forEach(function (cell) {
            p = p.then(function () {

                if (cell.x < 4) {
                    cell.x += 1;
                } else {
                    cell.y += 1;
                }

                cell.locate();

                return wait(diffDur);
            });
        });

        return p;
    };

    eqPrototype.involve = function (cell) {
        this.queue.push(cell);

        if (this.queue.length > this.queueMax) {
            var leaving = this.queue.shift();

            leaving.remove();
        }

        cell.x = 0;
        cell.y = 0;

        cell.setMetrics(this.metrics.left, this.metrics.top, this.metrics.unit);

        return cell.setTransitionDuration(600);
    };

    eqPrototype.reset = function () {
        this.queue = [];
    };

    return exports;
}());
