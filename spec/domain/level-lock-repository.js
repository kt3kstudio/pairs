const LevelLockFactory = require('../../src/domain/level-lock-factory')
const LevelLockCollection = require('../../src/domain/level-lock-collection')
const LevelLockRepository = require('../../src/domain/level-lock-repository')

describe('LevelLockRepository', () => {
  'use strict'

  let repo = null

  beforeEach(() => {
    repo = new LevelLockRepository('ma')

    window.infrastructure = {}

    window.infrastructure.storage = {
      set: spy(() => {}),
      get: spy(() => {})
    }
  })

  describe('getByFloorId', () => {
    it('gets the level lock collection of the given id', () => {
      when(infrastructure.storage.get)('level-lock-ma-7').then(() => {
        return Promise.resolve([{
          levelId: '701',
          locked: false
        }, {
          levelId: '702',
          locked: true
        }])
      })

      return repo.getByFloorId('7').then(collection => {
        expect(collection).to.be.instanceof(LevelLockCollection)
        expect(collection.locks).to.have.length(2)
      })
    })
  })

  describe('saveByFloorId', () => {
    it('saves the level lock collection for the given id', () => {
      const collection = new LevelLockFactory().createCollectionFromObjectList([{levelId: '701', locked: false}])

      when(infrastructure.storage.set)('level-lock-ma-7').then(() => Promise.resolve({}))

      return repo.saveByFloorId('7', collection)
    })
  })
})
