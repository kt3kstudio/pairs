const {subclass} = $.cc

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
datadomain.LevelLockRepository = subclass(function (pt) {
  'use strict'

  /**
   * @param {String} charId The character id
   */
  pt.constructor = function (charId) {
    this.charId = charId
  }

  /**
   * Gets the collection of the level locks by the floor id and char id.
   *
   * @param {String} floorId The floor id
   * @param {String} charId The floor id
   * @return {Promise} which resolves with the collection of the locks of the given floor id
   */
  pt.getByFloorId = function (floorId) {
    return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (objList) {
      return new datadomain.LevelLockFactory().createCollectionFromObjectList(objList)
    })
  }

  /**
   * Saves the collection of the locks by the floor id and char id.
   *
   * @param {String} floorId The floor id
   * @param {datadomain.LevelLockCollection} collection The level lock collection
   */
  pt.saveByFloorId = function (floorId, collection) {
    return infrastructure.storage.set(this.createStorageKey(floorId), this.toObjectList(collection))
  }

  /**
   * Converts the collection of the locks to an object list.
   *
   * @private
   * @param {datadomain.LevelLockCollection} collection The level lock collection
   * @return {Array} the array of the objects
   */
  pt.toObjectList = function (collection) {
    return collection.locks.map(function (lock) {
      return this.toObject(lock)
    }, this)
  }

  /**
   * Converts the lock to an object.
   *
   * @private
   * @param {datadomain.LevelLock} lock The lock
   * @return {Object}
   */
  pt.toObject = function (lock) {
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
  pt.createStorageKey = function (floorId) {
    return 'level-lock-' + this.charId + '-' + floorId
  }
})
