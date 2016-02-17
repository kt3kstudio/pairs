const {subclass} = $.cc

/**
 * The level lock model
 *
 * @class
 */
datadomain.LevelLock = subclass(function (pt) {
    'use strict'

    pt.constructor = function (levelId, locked) {
        this.levelId = levelId
        this.locked = locked
    }

    /**
     * Returns if the level is locked.
     *
     * @return {Boolean}
     */
    pt.isLocked = function () {
        return this.locked
    }

    /**
     * Unlocks the level
     */
    pt.unlock = function () {
        this.locked = false
    }
})
