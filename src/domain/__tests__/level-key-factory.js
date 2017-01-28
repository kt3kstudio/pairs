const LevelKeyFactory = require('../level-key-factory')
const LevelKeyCollection = require('../level-key-collection')

const factory = new LevelKeyFactory()

describe('LevelKeyFactory', () => {
  describe('createFromArray', () => {
    it('creates an array of LevelKeys from the given array', () => {
      const keys = factory.createFromArray([{
        levelId: '701'
      }, {
        levelId: '702'
      }])

      expect(keys).to.be.instanceof(LevelKeyCollection)
    })
  })

  describe('createFromObject', () => {
    it('returns null if null is given', () => {
      const key = factory.createFromObject()

      expect(key).to.be.null
    })
  })
})
