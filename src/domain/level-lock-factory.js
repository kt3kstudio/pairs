const LevelLock = require('./level-lock')
const LevelLockCollection = require('./level-lock-collection')

/**
 * The factory class of LevelLocks.
 */
class LevelLockFactory {
  /**
   * Creates a LevelLock from the object.
   *
   * @param {Object} obj The object
   * @return {LevelLock}
   */
  createFromObject (obj) {
    if (obj == null) {
      return null
    }

    return new LevelLock(obj.levelId, obj.locked)
  }

  /**
   * Creates a LevelLockCollection from the list of the object.
   * @param {Array} objList The list of objects
   * @return {Array}
   */
  createCollectionFromObjectList (objList) {
    objList = objList || []

    return new LevelLockCollection(objList.map(obj => this.createFromObject(obj)))
  }
}

module.exports = LevelLockFactory
