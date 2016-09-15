const CharacterInitService = require('../../src/domain/character-init-service')
const Character = require('../../src/domain/character')

const service = new CharacterInitService()

describe('CharacterInitService', () => {
  describe('initById', () => {
    it('creates the initial state of the characters of the given ids', () => {
      const ma = service.initById('ma')
      const emma = service.initById('emma')
      const ellen = service.initById('ellen')

      expect(ma).to.be.instanceof(Character)
      expect(ma.name).to.equal('Ma')
      expect(emma).to.be.instanceof(Character)
      expect(emma.name).to.equal('Emma')
      expect(ellen).to.be.instanceof(Character)
      expect(ellen.name).to.equal('Ellen')
    })

    it('throws when the id is unknown', () => {
      expect(() => {
        service.initById('anderson')
      }).to.throw()
    })
  })
})
