

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 *
 * @class
 */
datadomain.Character = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     * @param {String} id The id of the character
     * @param {String} name The name of the character
     * @param {datadomain.CharPosition} position The position of the character
     * @param {datadomain.LevelHistoryCollection} histories The histories of the current floor
     */
    pt.constructor = function (id, name, position, histories) {

        /**
         * @property {String} id The id of the character
         */
        this.id = id;

        /**
         * @property {String} name The name of the character
         */
        this.name = name;

        /**
         * @property {datadomain.CharPosition} position The position of the character
         */
        this.position = position;

        /**
         * @property {datadomain.LevelHistoryCollection} histories The histories of the current floor
         */
        this.histories = histories;

    };


    /**
     * Sets the position of character.
     *
     * @param {datadomain.CharPosition} position The position of the character
     */
    pt.setPosition = function (position) {

        this.position = position;

    };


    /**
     * Reloads the levelHistories according to the current position.
     *
     * @return {Promise}
     */
    pt.reloadHistories = function () {
        var that = this;

        return new datadomain.LevelHistoryRepository().getByFloorId(this.position.floorId).then (function (histories) {

            that.histories = histories;

        });
    };


});
