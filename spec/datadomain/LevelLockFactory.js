describe('LevelLockFactory', function () {
  'use strict'

  var factory = null

  beforeEach(function () {
    factory = new datadomain.LevelLockFactory()

  })

  describe('createFromObject', function () {
    it('creates a LevelLock from the object', function () {
      var lock = factory.createFromObject({
        locked: false,
        levelId: '701'
      })

      expect(lock).to.be.instanceof(datadomain.LevelLock)

    })

    it('returns null if the given parameter is null', function () {
      var lock = factory.createFromObject(null)

      expect(lock).to.be.null

    })

  })

  describe('createCollectionFromObjectList', function () {
    it('creates a LevelLockCollection from the list of the objects', function () {
      var locks = factory.createCollectionFromObjectList([{
        levelId: '701',
        locked: false
      }, {
        levelId: '702',
        locked: true
      }])

      expect(locks).to.be.instanceof(datadomain.LevelLockCollection)

    })

  })

})
