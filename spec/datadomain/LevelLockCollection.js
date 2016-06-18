describe('LevelLockCollection', function () {
  'use strict'

  describe('unlock', function () {
    it('unlocks the lock of the given id', function () {
      var lock0 = new datadomain.LevelLock('701', false)
      var lock1 = new datadomain.LevelLock('702', true)

      var collection = new datadomain.LevelLockCollection([lock0, lock1])

      collection.unlock('702')

      expect(lock1.isLocked()).to.be.false
    })

    it('creates a new lock object which is unlocked for the given level when the level of the given id is not found', function () {
      var lock0 = new datadomain.LevelLock('701', false)
      var lock1 = new datadomain.LevelLock('702', true)

      var collection = new datadomain.LevelLockCollection([lock0, lock1])

      collection.unlock('703')

      expect(lock0.isLocked()).to.be.false
      expect(lock1.isLocked()).to.be.true

      expect(collection.locks).to.have.length(3)
      expect(collection.isLocked('703')).to.equal(false)
    })
  })

  describe('isLocked', function () {
    it('returns if the level of the given id is locked when the level of the given id exists', function () {
      var lock0 = new datadomain.LevelLock('701', false)
      var lock1 = new datadomain.LevelLock('702', true)

      var collection = new datadomain.LevelLockCollection([lock0, lock1])

      expect(collection.isLocked('701')).to.be.false
      expect(collection.isLocked('702')).to.be.true
    })

    it('returns true if the level of the given id is not found', function () {
      var lock0 = new datadomain.LevelLock('701', false)
      var lock1 = new datadomain.LevelLock('702', true)

      var collection = new datadomain.LevelLockCollection([lock0, lock1])

      expect(collection.isLocked('703')).to.be.true
    })
  })
})
