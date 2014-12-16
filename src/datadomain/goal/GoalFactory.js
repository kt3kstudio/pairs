
datadomain.goal.GoalFactory = (function () {
    'use strict';

    var exports = function () {
    };

    var gfPt = exports.prototype;

    gfPt.createFromObjectList = function (list) {
        return this.createFromObject(list[0]);
    };

    gfPt.createFromObject = function (obj) {
        var type = obj.type;

        if (type === 'C') {
            return new datadomain.goal.CollectGoal(obj.type, obj.opts);
        }

        // other goals
    };

    return exports;

}());
