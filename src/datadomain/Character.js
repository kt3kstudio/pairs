

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharPosition and LevelHistoryCollection as its components.
 *
 * @class Character
 */
datadomain.Character = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     * @param {String} name The name of the character
     * @param {datadomain.CharPosition} charPosition The position of the character
     * @param {datadomain.LevelHistoryCollection} histories The histories of the current floor
     */
    pt.constructor = function (name, charPosition, histories) {

        this.name = name;
        this.charPosition = charPosition;
        this.histories = histories;

    };


    /**
     * Sets the position of character.
     *
     * @param {datadomain.CharPosition} charPosition The position of the character
     */
    pt.setCharPosition = function (charPosition) {

        this.charPosition = charPosition;

    };


    /**
     * Reloads the levelHistories according to the current position.
     *
     * @return {Promise}
     */
    pt.reloadHistories = function () {
        var that = this;

        return new LevelHistoryRepository().getCollectionByFloor(this.charPosition.floor).then (function (histories) {

            that.histories = histories;

        });
    };


});
