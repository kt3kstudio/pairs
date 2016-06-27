
/**
 * The collection class of LevelLocks.
 */
class LevelLockCollection {
  /**
   * @param {Array} locks
   */
  constructor (locks) {
    this.locks = locks || []

    const LevelLockFactory = require('./level-lock-factory')
    this.factory = new LevelLockFactory()
  }

  /**
   * Finds the level of the given level id, or returns null when the level not found.
   * @private
   * @param {String} levelId The id of the level
   * @return {LevelLock}
   */
  find (levelId) {
    const locks = this.locks.filter(lock => lock.levelId === levelId)

    if (locks.length === 0) {
      return null
    }

    return locks[0]
  }

  /**
   * Unlocks the level of the given id.
   * @param {String} levelId The id of the level
   */
  unlock (levelId) {
    let lock = this.find(levelId)

    if (lock != null) {
      lock.unlock()

      return
    }

    // Create a new lock object if it doesn't exist
    lock = this.factory.createFromObject({
      levelId: levelId,
      locked: false
    })

    this.locks.push(lock)
  }

  /**
   * Checks if the lock of the given level id is locked.
   * @param {String} levelId The id of the level
   * @return {Boolean}
   */
  isLocked (levelId) {
    const lock = this.find(levelId)

    if (!lock) {
      // If lock object doesn't exist, then it means the level is locked.
      return true
    }

    return lock.isLocked()
  }
}

module.exports = LevelLockCollection
