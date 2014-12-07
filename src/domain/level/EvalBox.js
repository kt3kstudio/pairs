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

        var result = {};
        result.isLastOne = wanderer.isLastOne;
        result.goTrash = [];
        result.goFusion = [];
        result.goQueue = [];

        if (this.leftPromise == null) {

            this.leftPromise = this.setToLeft(wanderer);

            return Promise.resolve(result);
        }

        var leftPromise = this.leftPromise;
        delete this.leftPromise;

        return this.setToRight(wanderer).then(function (right) {

            return leftPromise.then(function (left) {

                return evaluate(left, right, result);

            });

        });

    };

    var evaluate = function (left, right, result) {

        result.left = left;
        result.right = right;


        if (left.gender === right.gender) {

            result.score = 10;
            result.goTrash.push(right);
            result.goTrash.push(left);

        } else {

            result.score = 100;
            result.goFusion.push({left: left, right: right});

        }

        return result;

    };

    boxPrototype.involve = function (wanderer) {
        wanderer.setMetrics(this.metrics.left, this.metrics.top, this.metrics.unit);
    };

    boxPrototype.setToLeft = function (wanderer) {

        var dur = 800;

        this.involve(wanderer);

        wanderer.x = 0;
        wanderer.y = 0;

        return wanderer.setTransitionDuration(dur).then(function () {

            return wanderer.locate();

        });

    };

    boxPrototype.setToRight = function (wanderer) {

        var dur = 800;

        this.involve(wanderer);

        wanderer.setTransitionDuration(dur);


        return wait(10).then(function () {

            wanderer.x = 1;
            wanderer.y = 0;
            wanderer.locate();

            return wait(dur);

        }).then(function () {

            return wanderer;

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
