const LevelLock = require('../../src/domain/level-lock')

describe('LevelLock', () => {
  'use strict'

  describe('isLocked', () => {
    it('returns if it is locked', () => {
      const lock0 = new LevelLock('701', false)
      const lock1 = new LevelLock('702', true)

      expect(lock0.isLocked()).to.be.false
      expect(lock1.isLocked()).to.be.true
    })
  })

  describe('unlock', () => {
    it('unlocks the lock', () => {
      const lock0 = new LevelLock('702', true)

      lock0.unlock()

      expect(lock0.isLocked()).to.be.false
    })
  })
})
