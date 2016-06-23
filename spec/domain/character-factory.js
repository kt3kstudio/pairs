const CharacterFactory = require('../../src/domain/character-factory')
const Character = require('../../src/domain/character')

const factory = new CharacterFactory()

describe('CharacterFactory', () => {
  describe('createInitialById', () => {
    it('creates the initial state of the characters of the given ids', () => {
      const ma = factory.createInitialById('ma')
      const emma = factory.createInitialById('emma')
      const ellen = factory.createInitialById('ellen')

      expect(ma).to.be.instanceof(Character)
      expect(ma.name).to.equal('Ma')
      expect(emma).to.be.instanceof(Character)
      expect(emma.name).to.equal('Emma')
      expect(ellen).to.be.instanceof(Character)
      expect(ellen.name).to.equal('Ellen')
    })

    it('throws when the id is unknown', () => {
      expect(() => {
        factory.createInitialById('anderson')
      }).to.throw()
    })
  })
})
