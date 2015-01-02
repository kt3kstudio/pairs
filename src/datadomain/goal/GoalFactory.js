
/**
 * GoalFactory is the factory class of goal models
 */
datadomain.goal.GoalFactory = (function () {
    'use strict';

    var exports = function () {
    };

    var gfPt = exports.prototype;

    /**
     * Creates goals from object list.
     *
     * @param {Array} list The lisf of goal objects.
     * @return {Array}
     */
    gfPt.createFromObjectList = function (list) {
        return this.createFromObject(list[0]);
    };

    /**
     * Creates a goal from the given object.
     *
     * @param {Object} obj The goal object
     * @return {datadomain.goal.Goal} The goal
     */
    gfPt.createFromObject = function (obj) {
        var type = obj.type;

        switch (type) {
            case 'C': return new datadomain.goal.CollectGoal(obj.type, obj.opts);
            case 'L': return new datadomain.goal.ClearGoal(obj.type, obj.opts);
            case 'F': return new datadomain.goal.FusionGoal(obj.type, obj.opts);
            case 'S': return new datadomain.goal.ScoreGoal(obj.type, obj.opts);
        }
    };

    return exports;

}());
