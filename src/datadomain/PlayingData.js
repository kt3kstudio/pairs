

/**
 * PlayingData model represents the current playing status of the level.
 */
datadomain.PlayingData = (function () {
    'use strict';


    /**
     * @constructor
     */
    var exports = function (score, field, queue, goal) {
        this.score = score;
        this.field = field;
        this.queue = queue;
        this.goal = goal;
    };

    /**
     *
     * @param {Object} obj
     * @param {Number} obj.score
     * @param {Array} obj.field
     * @param {Array} obj.queue
     * @param {Object} obj.goal
     */
    exports.createFromObject = function (obj) {
        return new exports(obj.score, obj.field, obj.queue, obj.goal);
    };

    /**
     *
     */
    exports.createInitialStateData = function () {
        return new exports(0, [], [], []);
    };

    var pdPt = exports.prototype;

    pdPt.toObject = function () {
        return {
            score: this.score,
            field: this.field,
            queue: this.queue,
            goal: this.goal
        }
    };

    pdPt.gotScore = function (score) {
        this.score += score;
    };

    pdPt.updateField = function (field) {
        this.field = field;
    };

    pdPt.updateQueue = function (queue) {
        this.queue = queue;
    };

    pdPt.updateGoal = function (goal) {
        this.goal = goal;
    };

    return exports;

}());
