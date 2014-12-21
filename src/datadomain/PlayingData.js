

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
     * Creates instance from the object.
     *
     * @param {Object} obj The source object
     * @param {Number} obj.score The score
     * @param {Array} obj.field The state of the field
     * @param {Array} obj.queue The state of the queue
     * @param {Object} obj.goal The state of the goal completion
     */
    exports.createFromObject = function (obj) {
        return new exports(obj.score, obj.field, obj.queue, obj.goal);
    };

    /**
     * Creates initial state of the playing data.
     *
     * @return {datadomain.PlayingData}
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
        };
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
