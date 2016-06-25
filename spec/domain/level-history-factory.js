const LevelHistoryFactory = require('../../src/domain/level-history-factory')
const LevelHistoryCollection = require('../../src/domain/level-history-collection')

const factory = new LevelHistoryFactory()

describe('LevelHistoryFactory', () => {
  describe('createCollectionFromArray', () => {
    it('creates an empty history collection if the param is null', () => {
      const collection = factory.createCollectionFromArray(null)

      expect(collection).to.be.instanceof(LevelHistoryCollection)
      expect(collection.length()).to.equal(0)
    })
  })
})
