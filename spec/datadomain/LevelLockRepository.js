describe('LevelLockRepository', function () {
  'use strict'

  var repo = null

  beforeEach(function () {
    repo = new datadomain.LevelLockRepository('ma')

    window.infrastructure = {}

    window.infrastructure.storage = {
      set: spy(function () {}),
      get: spy(function () {})

    }

  })

  describe('getByFloorId', function () {
    it('gets the level lock collection of the given id', function () {
      when(infrastructure.storage.get)('level-lock-ma-7').then(function () {
        return Promise.resolve([{
          levelId: '701',
          locked: false
        }, {
          levelId: '702',
          locked: true
        }])

      })

      return repo.getByFloorId('7').then(function (collection) {
        expect(collection).to.be.instanceof(datadomain.LevelLockCollection)
        expect(collection.locks).to.have.length(2)

      })

    })

  })

  describe('saveByFloorId', function () {
    it('saves the level lock collection for the given id', function () {
      var collection = new datadomain.LevelLockFactory().createCollectionFromObjectList([])

      when(infrastructure.storage.set)('level-lock-ma-7').then(function () {
        return Promise.resolve({})

      })

      return repo.saveByFloorId('7', collection)

    })

  })

})
