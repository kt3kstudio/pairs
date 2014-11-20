

window.domain = window.domain || {};
domain.level = domain.level || {};
/**
 *
 */
domain.level.ExitQueue= (function () {
    'use strict';

    var QUEUE_MAX = 4;

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

        this.queue.forEach(function (cell) {
            p = p.then(function () {
                cell.x += 1;
                cell.locate();

                return wait(40);
            });
        });

        return p;
    };

    eqPrototype.involve = function (cell) {
        this.queue.push(cell);

        if (this.queue.length > this.queueMax) {
            var leaving = this.queue.shift();

            leaving.remove();
        };

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
