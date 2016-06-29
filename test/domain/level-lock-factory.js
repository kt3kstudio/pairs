const LevelLockFactory = require('../../src/domain/level-lock-factory')
const LevelLockCollection = require('../../src/domain/level-lock-collection')
const LevelLock = require('../../src/domain/level-lock')

describe('LevelLockFactory', () => {
  'use strict'

  let factory = null

  beforeEach(() => {
    factory = new LevelLockFactory()
  })

  describe('createFromObject', () => {
    it('creates a LevelLock from the object', () => {
      const lock = factory.createFromObject({
        locked: false,
        levelId: '701'
      })

      expect(lock).to.be.instanceof(LevelLock)
    })

    it('returns null if the given parameter is null', () => {
      const lock = factory.createFromObject(null)

      expect(lock).to.be.null
    })
  })

  describe('createCollectionFromObjectList', () => {
    it('creates a LevelLockCollection from the list of the objects', () => {
      const locks = factory.createCollectionFromObjectList([{
        levelId: '701',
        locked: false
      }, {
        levelId: '702',
        locked: true
      }])

      expect(locks).to.be.instanceof(LevelLockCollection)
    })
  })
})
