/**
 * @class
 * FusionPreparationService takes cells in sequence and move them into the preparation position. After that it emits the list of cells for the actual fusion.
 */
domain.level.FusionPreparationService = (function () {
    'use strict';

    /**
     * @constructor
     */
    var exports = function (dimension) {
        this.stack = new PreparationStack(dimension);
    };

    var fpsPt = exports.prototype;


    /**
     * Takes cell into the fusion preparing position.
     *
     * @param {domain.level.Wanderer} cell The cell
     * @return {Promise<Array<domain.level.Wanderer>>}
     */
    fpsPt.take = function (cell) {

        this.stack.push(cell);

        return this.stack.isPrepared() ?  Promise.all(this.stack.getStack()) : null;

    };


    /**
     * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
     *
     * @class domain.level.EvalBox.PreparationStack
     * @private
     */
    var PreparationStack = function (dimension) {
        this.dimension = dimension;
        this.stack = [];
        this.isFinished = false;
    };

    var psPt = PreparationStack.prototype;

    /**
     * The duration of going to fusion preparation position.
     */
    psPt.takeDur = 700;


    /**
     * Pushes to the stack.
     *
     * @param {domain.level.Wanderer} cell The cell
     */
    psPt.push = function (cell) {
        var p = this.set(cell, this.stack.length);

        this.isFinished = cell.isLastOne;

        this.stack.push(p);
    };


    /**
     * Involves a cell into the preparation dimension.
     *
     * @private
     * @param {domain.level.Wanderer} cell The cell
     */
    psPt.involve = function (cell) {

        cell.setMetrics(this.dimension.left, this.dimension.top, this.dimension.unit);

    };


    psPt.set = function (cell, index) {

        this.involve(cell);

        cell.x = index;
        cell.y = 0;

        return cell.setTransitionDuration(this.takeDur).then(function () {

            return cell.locate();

        });

    };

    psPt.isPrepared = function () {

        return this.isFinished || this.isFull();

    };

    psPt.isFull = function () {

        return this.stack.length >= 2;

    };

    psPt.getStack = function () {

        return this.stack.splice(0);

    };

    return exports;

}());
