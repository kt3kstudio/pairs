const LevelHistory = require('../level-history')
const LevelHistoryFactory = require('../level-history-factory')
const LevelHistoryCollection = require('../level-history-collection')

const factory = new LevelHistoryFactory()

describe('LevelHistoryFactory', () => {
  describe('createCollectionFromArray', () => {
    it('creates an empty history collection if the param is null', () => {
      const collection = factory.createCollectionFromArray(null)

      expect(collection).to.be.instanceof(LevelHistoryCollection)
      expect(collection.length()).to.equal(0)
    })

    it('creates a history collection if the param is array of object', () => {
      const collection = factory.createCollectionFromArray([{levelId: '701'}])

      expect(collection).to.be.instanceof(LevelHistoryCollection)
      expect(collection.length()).to.equal(1)
      expect(collection.getById('701')).to.be.instanceof(LevelHistory)
    })
  })
})
