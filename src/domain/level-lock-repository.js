const LevelLockFactory = require('./level-lock-factory')

/**
 * The repository class of the LevelLock.
 *
 * This repository saves and restores the LevelLocks in JSON format using the infrastructure.storage persistent interface.
 *
 * The storage key of the collection of the level locks is as follows:
 *
 * level-lock-[charId]-[floorId]
 *
 * e.g. if charId is 'ma' and floorId is '7', then the storage key is 'level-lock-ma-7'
 */
class LevelLockRepository {
  /**
   * @param {string} charId The character id
   */
  constructor (charId) {
    this.charId = charId
  }

  /**
   * Gets the collection of the level locks by the floor id and char id.
   * @param {string} floorId The floor id
   * @param {string} charId The floor id
   * @return {Promise} which resolves with the collection of the locks of the given floor id
   */
  getByFloorId (floorId) {
    const factory = new LevelLockFactory()
    return infrastructure.storage.get(this.createStorageKey(floorId), []).then(objList => {
      return factory.createCollectionFromObjectList(objList)
    })
  }

  /**
   * Saves the collection of the locks by the floor id and char id.
   * @param {String} floorId The floor id
   * @param {LevelLockCollection} collection The level lock collection
   */
  saveByFloorId (floorId, collection) {
    return infrastructure.storage.set(this.createStorageKey(floorId), this.toObjectList(collection))
  }

  /**
   * Converts the collection of the locks to an object list.
   * @private
   * @param {LevelLockCollection} collection The level lock collection
   * @return {Array} the array of the objects
   */
  toObjectList (collection) {
    return collection.locks.map(lock => this.toObject(lock))
  }

  /**
   * Converts the lock to an object.
   * @private
   * @param {LevelLock} lock The lock
   * @return {Object}
   */
  toObject (lock) {
    return {
      levelId: lock.levelId,
      locked: lock.locked
    }
  }

  /**
   * Creates the storage key of the given floor id and char id.
   *
   * @private
   * @param {String} floorId The floor id
   * @param {String} charId The char id
   * @return {String}
   */
  createStorageKey (floorId) {
    return 'level-lock-' + this.charId + '-' + floorId
  }
}

module.exports = LevelLockRepository
