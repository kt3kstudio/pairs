


/**
 * The model of user.
 */
datadomain.User = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} charId The id of the character currently chosen
     * @param {datadomain.UserStatistics} stat The statisctics of the user activity
     */
    pt.constructor = function (charId, stat) {

        /**
         * @property {String} charId The id of the character currently chosen
         */
        this.charId = charId;

        /**
         * @property {datadomain.UserStatistics} stat The statisctics of the user activity
         */
        this.stat = stat;

    };


    /**
     * Sets the character id.
     *
     * @param {String} charId The character id.
     */
    pt.setCharId = function (charId) {

        this.charId = charId;

    };

});
