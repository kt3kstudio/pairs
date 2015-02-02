


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
    pt.constructor = function (chr, score, star, cleared, ctime, mtime) {

        this.chr = chr;
        this.score = score;
        this.star = star;
        this.cleared = cleared;
        this.ctime = ctime;
        this.mtime = mtime;

    };

});
