const LevelHistoryCollection = require('../level-history-collection')
const LevelHistory = require('../level-history')

describe('LevelHistoryCollection', () => {
  'use strict'

  let collection

  beforeEach(() => {
    collection = new LevelHistoryCollection([
      new LevelHistory('701'),
      new LevelHistory('702'),
      new LevelHistory('703')
    ])
  })

  describe('getById', () => {
    it('gets the level history by the id', () => {
      const lv702 = collection.getById('702')

      expect(lv702).to.be.instanceof(LevelHistory)
      expect(lv702.levelId).to.equal('702')
    })
  })
})
