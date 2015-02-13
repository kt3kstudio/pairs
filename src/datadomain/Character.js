

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
     * @param {String} name
     */
    pt.constructor = function (name, charPosition, histories) {

        this.name = name;
        this.charPosition = charPosition;
        this.histories = histories;

    };


    /**
     * Sets the position of character.
     *
     * @param {datadomain.CharPosition} charPosition
     */
    pt.setCharPosition = function (charPosition) {

        this.charPosition = charPosition;

    };


    /**
     * Sets the level histories of the current floor.
     *
     * @param {datadomain.LevelHistoryCollection} histories
     */
    pt.setHistories = function (histories) {

        this.histories = histories;

    };

});
