


/**
 * LevelHistory is model class which represents the history of the level clearance.
 *
 * @class
 */
datadomain.LevelHistory = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     */
    pt.constructor = function (levelName, score, star, cleared, clearedAt) {

        this.levelName = levelName;
        this.score = score;
        this.star = star;
        this.cleared = cleared;
        this.clearedAt = clearedAt;

    };

});
