const {subclass} = $.cc

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */
datadomain.Character = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {String} id The id of the character
     * @param {String} name The name of the character
     * @param {datadomain.CharPosition} position The position of the character
     * @param {datadomain.LevelHistoryCollection} histories The histories of the current floor
     * @param {datadomain.PlayingState} playingState The state of playing at the current level
     * @param {datadomain.LevelLockCollection} locks The collection of the level locks
     */
    pt.constructor = function (id, name, position, histories, playingState, locks) {
        /**
         * @property {String} id The id of the character
         */
        this.id = id

        /**
         * @property {String} name The name of the character
         */
        this.name = name

        /**
         * @property {datadomain.CharPosition} position The position of the character
         */
        this.position = position

        /**
         * @property {datadomain.LevelHistoryCollection} histories The histories of the current floor
         */
        this.histories = histories

        /**
         * @property {datadomain.PlayingState} playingState The state of playing at the current level
         */
        this.playingState = playingState

        /**
         * @property {datadomain.LevelLockCollection} collection The collection of the locks
         */
        this.locks = locks
    }

    /**
     * Sets the position of character.
     *
     * @param {datadomain.CharPosition} position The position of the character
     */
    pt.setPosition = function (position) {
        this.position = position
    }

    /**
     * Reloads the levelHistories according to the current position.
     *
     * @return {Promise} resolves with updated character
     */
    pt.reloadHistories = function () {
        var that = this

        if (this.position == null) {
            return Promise.resolve(this)
        }

        return new datadomain.LevelHistoryRepository(this.id).getByFloorId(this.position.floorId).then(function (histories) {
            that.histories = histories

            return that
        })
    }

    /**
     * Saves the LevelHistories.
     *
     * @return {Promise}
     */
    pt.saveHistories = function () {
        var that = this

        return new datadomain.LevelHistoryRepository(this.id).saveByFloorId(this.position.floorId, this.histories).then(function () {
            return that
        })
    }

    /**
     * Reloads the level locks.
     */
    pt.reloadLocks = function () {
        var that = this

        if (this.position == null) {
            return Promise.resolve(this)
        }

        return new datadomain.LevelLockRepository(this.id).getByFloorId(this.position.floorId).then(function (locks) {
            that.locks = locks

            return that
        })
    }

    /**
     * Saves the current level locks.
     */
    pt.saveLocks = function () {
        var that = this

        return new datadomain.LevelLockRepository(this.id).saveByFloorId(this.position.floorId, this.locks).then(function () {
            return that
        })
    }

    /**
     * Reloads the playingState
     *
     * @return {Promise}
     */
    pt.reloadPlayingState = function () {
        var that = this

        return new datadomain.PlayingStateRepository().getByCharIdLevelId(this.id, this.position.floorObjectId).then(function (playingState) {
            that.playingState = playingState

            return that
        })
    }

    /**
     * Saves the playing state.
     *
     * @return {Promise}
     */
    pt.savePlayingState = function () {
        var that = this

        return new datadomain.PlayingStateRepository().save(this.playingState).then(function () {
            return that
        })
    }

    /**
     * Clears the playing state.
     *
     * @return {Promise}
     */
    pt.clearPlayingState = function () {
        return new datadomain.PlayingStateRepository().clearByCharId(this.id)
    }
})
