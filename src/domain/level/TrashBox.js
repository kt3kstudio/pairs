/**
 * @class
 * TrashBox class handles the behaviour of the trash where boms disappear.
 */
domain.level.TrashBox = (function () {
    'use strict';

    var exports = function (metrics) {
        this.metrics = metrics;
    };

    var trashPrototype = exports.prototype;

    trashPrototype.take = function (cell) {
        var dur = 1000;

        var durGoInto = 800;

        cell.setMetrics(this.metrics.left, this.metrics.top, this.metrics.unit);
        cell.setTransitionDuration(dur);

        return wait(10).then(function () {

            cell.locate();

            return wait(dur);

        }).then(function () {

            cell.$dom.animation('go-to-trash ' + durGoInto + 'ms');

            return wait(durGoInto);

        }).then(function () {
            return cell.remove();
        });
    };

    return exports;
}());
