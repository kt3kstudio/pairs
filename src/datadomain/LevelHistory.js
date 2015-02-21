


/**
 * LevelHistory is model class which represents the history of the level clearance.
 *
 * @class
 */
datadomain.LevelHistory = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} levelId The id of the level
     * @param {Number} score The score
     * @param {String} heighestGene The heighest gene
     * @param {Boolean} cleared If cleared or not
     * @param {Date} clearedAt The datetime of the clear
     */
    pt.constructor = function (levelId, score, highestGene, cleared, clearedAt) {

        /**
         * @property {String} levelId The id of the level
         */
        this.levelId = levelId;

        /**
         * @property {Number} score The score
         */
        this.score = score;

        /**
         * @property {String} heighestGene The heighest gene
         */
        this.highestGene = highestGene;

        /**
         * @property {Boolean} cleared If cleared or not
         */
        this.cleared = cleared;

        /**
         * @property {Date} clearedAt The datetime of the clear
         */
        this.clearedAt = clearedAt;

    };

});
