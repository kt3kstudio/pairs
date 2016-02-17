const {subclass} = $.cc

/**
 * The collection class of LevelLocks.
 */
datadomain.LevelLockCollection = subclass(function (pt) {
    'use strict'

    /**
     * @param {Array} locks
     */
    pt.constructor = function (locks) {
        this.locks = locks || []
    }

    /**
     * Finds the level of the given level id, or returns null when the level not found.
     *
     * @private
     * @param {String} levelId The id of the level
     * @return {datadomain.LevelLock}
     */
    pt.find = function (levelId) {
        var locks = this.locks.filter(function (lock) {
            return lock.levelId === levelId
        })

        if (locks.length === 0) {
            return null
        }

        return locks[0]
    }

    /**
     * Unlocks the level of the given id.
     *
     * @param {String} levelId The id of the level
     */
    pt.unlock = function (levelId) {
        var lock = this.find(levelId)

        if (lock != null) {
            lock.unlock()

            return
        }

        // Create a new lock object if it doesn't exist
        lock = new datadomain.LevelLockFactory().createFromObject({
            levelId: levelId,
            locked: false
        })

        this.locks.push(lock)
    }

    /**
     * Checks if the lock of the given level id is locked.
     *
     * @param {String} levelId The id of the level
     * @return {Boolean}
     */
    pt.isLocked = function (levelId) {
        var lock = this.find(levelId)

        if (!lock) {
            // If lock object doesn't exist, then it means the level is locked.
            return true
        }

        return lock.isLocked()
    }
})
