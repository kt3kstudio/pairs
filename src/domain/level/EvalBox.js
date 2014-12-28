// The box above the grid
window.domain = window.domain || {};
domain.level = domain.level || {};
/**
 * @class
 * EvalBox reporesents the next place to the field which boms get into after being indicated by the ball.
 *
 * This class also dispatch the boms which was got into here to the appropriate next places,
 * such as FusionBox, ExitQueue or TrashBox, according to the evaluation of the pair of boms.
 */
domain.level.EvalBox = (function () {
    'use strict';

    var exports = function (metrics) {
        this.metrics = metrics;
    };

    var boxPrototype = exports.prototype;

    boxPrototype.take = function (wanderer) {

        if (this.leftPromise == null) {

            this.leftPromise = this.setToLeft(wanderer);

            return this.leftPromise.then(function () {

                return null;

            });
        }

        var leftPromise = this.leftPromise;
        delete this.leftPromise;

        return Promise.all([this.setToRight(wanderer), leftPromise]).then(function (res) {

            var right = res[0];
            var left = res[1];

            return evaluate(left, right);

        });

    };

    var evaluate = function (left, right) {

        return new domain.level.FusionPair(left, right);

    };

    boxPrototype.involve = function (wanderer) {
        wanderer.setMetrics(this.metrics.left, this.metrics.top, this.metrics.unit);
    };

    boxPrototype.setToLeft = function (wanderer) {

        var dur = 700;

        this.involve(wanderer);

        wanderer.x = 0;
        wanderer.y = 0;

        return wanderer.setTransitionDuration(dur).then(function () {

            return wanderer.locate();

        });

    };

    boxPrototype.setToRight = function (wanderer) {

        var dur = 700;

        this.involve(wanderer);

        wanderer.x = 1;
        wanderer.y = 0;

        return wanderer.setTransitionDuration(dur).then(function () {

            return wanderer.locate();

        });

    };

    boxPrototype.reset = function () {

        if (this.left != null) { this.left.remove(); }
        if (this.right != null) { this.right.remove(); }

        this.left = null;
        this.right = null;

    };

    return exports;

}());
