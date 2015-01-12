/**
 * @class
 *
 * ExitQueue class represents the exit queue at the level view.
 */
domain.level.ExitQueue= (function () {
    'use strict';

    var QUEUE_MAX = 32;

    var exports = function (dimension) {
        this.dimension = dimension;
        this.queue = [];
        this.queueMax = QUEUE_MAX;
    };

    var eqPt = exports.prototype;


    /**
     * Enqueues the cell.
     *
     * @param {domain.level.Cell} cell The cell
     * @return {Promise} The promise resolves with the cell.
     */
    eqPt.enqueue = function (cell) {

        var that = this;

        return this.involve(new Queuee(cell)).then(function () {

            return that.goForward();

        });

    };


    /**
     * Release cells.
     *
     * @return {Array}
     */
    eqPt.releaseCells = function () {

        return this.queue.splice(0).map(function (queuee) {

            return queuee.cell;

        });

    };


    /**
     * Makes the entire queue go forward.
     *
     * @private
     * @return {Promise}
     */
    eqPt.goForward = function () {

        var d = 200 / this.queue.length;

        return this.queue.map(function (queuee, i) {

            queuee.goForward();

            return wait(i * d).then(function () {
                return queuee.locate();
            });

        }).pop();
    };

    eqPt.involve = function (queuee) {

        this.queue.push(queuee);

        if (this.queue.length > this.queueMax) {

            this.queue.shift().remove();

        }

        return queuee.goOrigin().setDimension(this.dimension).setTransitionDuration(600);
    };

    eqPt.reset = function () {
        this.queue = [];
    };

    /**
     * @class domain.level.ExitQueue.Queuee
     * @private
     *
     * Queue class is the role of the cell which is queued in the ExitQueue.
     */

    /*
     * @constructor
     * @param {domain.level.Cell} cell The queueing cell
     */
    var Queuee = function (cell) {
        this.cell = cell;
    };

    var qPt = Queuee.prototype;


    /**
     * Goes forward in the queue.
     */
    qPt.goForward = function () {
        if (this.cell.x < 4) {
            this.cell.x += 1;
        } else {
            this.cell.y += 1;
        }

        return this;
    };

    /**
     * Locates the cell.
     */
    qPt.locate = function () {
        return this.cell.locate();
    };

    /**
     * Removes the cell.
     */
    qPt.remove = function () {
        this.cell.remove();
    };


    /**
     * Goes to the origin of the queue dimension.
     */
    qPt.goOrigin = function () {
        this.cell.x = -1;
        this.cell.y = 0;

        return this;
    };


    /**
     * Sets the transion duraiton.
     *
     * @param {Number} dur The duration
     * @return {Promise} of domain.level.Cell
     */
    qPt.setTransitionDuration = function (dur) {
        return this.cell.setTransitionDuration(dur);
    };


    /**
     * Sets the dimension.
     *
     * @param {Object} dimension The dimension
     * @return {domain.level.ExitQueue.Queuee}
     */
    qPt.setDimension = function (dimension) {
        this.cell.setDimension(dimension);

        return this;
    };

    return exports;

}());
