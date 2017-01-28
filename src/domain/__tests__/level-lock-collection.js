const LevelLock = require('../level-lock')
const LevelLockCollection = require('../level-lock-collection')

describe('LevelLockCollection', () => {
  'use strict'

  describe('unlock', () => {
    it('unlocks the lock of the given id', () => {
      const lock0 = new LevelLock('701', false)
      const lock1 = new LevelLock('702', true)

      const collection = new LevelLockCollection([lock0, lock1])

      collection.unlock('702')

      expect(lock1.isLocked()).to.be.false
    })

    it('creates a new lock object which is unlocked for the given level when the level of the given id is not found', () => {
      const lock0 = new LevelLock('701', false)
      const lock1 = new LevelLock('702', true)

      const collection = new LevelLockCollection([lock0, lock1])

      collection.unlock('703')

      expect(lock0.isLocked()).to.be.false
      expect(lock1.isLocked()).to.be.true

      expect(collection.locks).to.have.length(3)
      expect(collection.isLocked('703')).to.equal(false)
    })
  })

  describe('isLocked', () => {
    it('returns if the level of the given id is locked when the level of the given id exists', () => {
      const lock0 = new LevelLock('701', false)
      const lock1 = new LevelLock('702', true)

      const collection = new LevelLockCollection([lock0, lock1])

      expect(collection.isLocked('701')).to.be.false
      expect(collection.isLocked('702')).to.be.true
    })

    it('returns true if the level of the given id is not found', () => {
      const lock0 = new LevelLock('701', false)
      const lock1 = new LevelLock('702', true)

      const collection = new LevelLockCollection([lock0, lock1])

      expect(collection.isLocked('703')).to.be.true
    })
  })
})
