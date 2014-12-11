
/**
 * @class
 * Level class is the domain model which represents each level.
 */
datadomain.Level = (function () {
    'use strict';

    var exports = function (id, name, goals, threshold0, threshold1, cells) {
        this.id = id;
        this.name = name;
        this.goals = goals;
        this.threshold0 = threshold0;
        this.threshold1 = threshold1;
        this.cells = cells;
    };

    var levelPt = exports.prototype;

    levelPt.stars = function (score) {

        if (score < this.threshold0) {

            return 1;

        } else if (score < this.threshold1) {

            return 2;

        } else {

            return 3;

        }

    };

    return exports;

}());
