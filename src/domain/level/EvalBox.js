/**
 * @class
 * EvalBox reporesents the next place to the field which boms get into after being indicated by the ball.
 *
 * This class also dispatch the boms which was got into here to the appropriate next places,
 * such as FusionBox, ExitQueue or TrashBox, according to the evaluation of the pair of boms.
 */
domain.level.EvalBox = (function () {
    'use strict';

    var exports = function (dimension) {
        this.dimension = dimension;
        this.leftPromise = [];
    };

    var boxPrototype = exports.prototype;


    /**
     * The duration of going to fusion preparation position.
     */
    boxPrototype.takeDur = 700;


    /**
     * Takes cell into the fusion preparing position
     *
     * @param {domain.level.Wanderer} cell
     * @return {Promise<Array<domain.level.Wanderer>>}
     */
    boxPrototype.take = function (cell) {

        if (this.leftPromise.length) {

            return Promise.all([this.leftPromise.pop(), this.setToRight(cell)]);

        }

        if (cell.isLastOne) {

            return Promise.all([this.setToLeft(cell)]);

        }

        this.leftPromise.push(this.setToLeft(cell));

        return null;

    };


    boxPrototype.involve = function (cell) {

        cell.setMetrics(this.dimension.left, this.dimension.top, this.dimension.unit);

    };


    boxPrototype.set = function (cell, x) {

        this.involve(cell);

        cell.x = x;
        cell.y = 0;

        return cell.setTransitionDuration(this.takeDur).then(function () {

            return cell.locate();

        });

    };


    boxPrototype.setToLeft = function (cell) {

        return this.set(cell, 0);

    };

    boxPrototype.setToRight = function (cell) {

        return this.set(cell, 1);

    };


    return exports;

}());
