const LevelLockFactory = require('../level-lock-factory')
const LevelLockCollection = require('../level-lock-collection')
const LevelLockRepository = require('../level-lock-repository')

describe('LevelLockRepository', () => {
  'use strict'

  const repo = new LevelLockRepository('ma')
  const origGet = infrastructure.storage.get
  const origSet = infrastructure.storage.set

  beforeEach(() => {
    infrastructure.storage.get = spy(() => {})
    infrastructure.storage.set = spy(() => {})
  })

  afterEach(() => {
    infrastructure.storage.get = origGet
    infrastructure.storage.set = origSet
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
