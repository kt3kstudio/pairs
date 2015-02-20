
/**
 * The level model.
 *
 * [AggregateRoot]
 *
 * @class
 */
datadomain.Level = subclass(function (pt) {
    'use strict';

    pt.constructor = function (name, goal, cells) {
        this.name = name;
        this.goal = goal;
        this.cells = cells;
    };

});
