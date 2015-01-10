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
     * @param {domain.level.Cell} cell The cell
     * @return {Promise} {Promise<Array<domain.level.Cell>>}
     */
    fpsPt.take = function (cell) {

        this.stack.push(cell);

        return this.stack.isPrepared() ?  Promise.all(this.stack.getStack()) : null;

    };


    /**
     * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
     *
     * @class domain.level.FusionPreparationService.PreparationStack
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
     * @param {domain.level.Cell} cell The cell
     */
    psPt.push = function (cell) {
        this.isFinished = cell.isLastOne();

        this.stack.push(this.locate(cell, this.stack.length));
    };


    /**
     * locate the cell at the index.
     *
     * @param {domain.level.Cell} cell The cell
     * @param {Number} index The index
     * @return {Promise}
     */
    psPt.locate = function (cell, index) {

        cell.setDimension(this.dimension);

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
