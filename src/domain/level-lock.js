/**
 * The level lock model
 */
class LevelLock {

  static get Repository () {
    return require('./level-lock-repository')
  }

  /**
   * @param {string} levelId The level id
   * @param {boolean} locked True iff the level is locked
   */
  constructor (levelId, locked) {
    this.levelId = levelId
    this.locked = locked
  }

  /**
   * Returns if the level is locked.
   * @return {boolean}
   */
  isLocked () {
    return this.locked
  }

  /**
   * Unlocks the level.
   */
  unlock () {
    this.locked = false
  }
}

module.exports = LevelLock
