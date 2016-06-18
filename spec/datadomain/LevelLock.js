describe('LevelLock', function () {
  'use strict'

  describe('isLocked', function () {
    it('returns if it is locked', function () {
      var lock0 = new datadomain.LevelLock('701', false)
      var lock1 = new datadomain.LevelLock('702', true)

      expect(lock0.isLocked()).to.be.false
      expect(lock1.isLocked()).to.be.true
    })
  })

  describe('unlock', function () {
    it('unlocks the lock', function () {
      var lock0 = new datadomain.LevelLock('702', true)

      lock0.unlock()

      expect(lock0.isLocked()).to.be.false
    })
  })
})
