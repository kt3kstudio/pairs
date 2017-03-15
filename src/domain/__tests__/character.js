const { Character: { InitService } } = require('../')
const { expect } = require('chai')

describe('character', () => {
  let chr
  const service = new InitService()

  beforeEach(() => {
    chr = service.initById('ma')
  })

  describe('assetId', () => {
    it('returns the current asset id if is in the tower', () => {
      chr.location.goToTower()
      expect(chr.assetId()).to.equal('1-entrance')
    })

    it('returns null if is not in the tower', () => {
      expect(chr.assetId()).to.be.null
    })
  })

  describe('floorId', () => {
    it('returns the current floor id if is in the tower', () => {
      chr.location.goToTower()
      expect(chr.floorId()).to.equal('1')
    })

    it('returns null if is not in the tower', () => {
      expect(chr.floorId()).to.be.null
    })
  })
})
