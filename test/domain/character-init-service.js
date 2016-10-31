const CharacterInitService = require('../../src/domain/character-init-service')
const Character = require('../../src/domain/character')

describe('CharacterInitService', () => {
  const service = new CharacterInitService()
  const { get, set } = infrastructure.storage

  describe('initById', () => {
    it('creates the initial state of the characters of the given ids', () => {
      const ma = service.initById('ma')
      const emma = service.initById('emma')
      const ellen = service.initById('ellen')

      expect(ma).to.be.instanceof(Character)
      expect(ma.name).to.equal('Ma')
      expect(ma.locks.isLocked('701')).to.be.false
      expect(ma.locks.isLocked('702')).to.be.true
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

  describe('getOrCreateById', () => {
    beforeEach(() => {
      infrastructure.storage.get = spy(() => {})
      infrastructure.storage.set = spy(() => {})
    })

    afterEach(() => {
      infrastructure.storage.get = get
      infrastructure.storage.set = set
    })

    it('gets the character by the id if it is found', () => {
      when(infrastructure.storage.get)('character-ma').then(() => Promise.resolve({id: 'ma'}))
      when(infrastructure.storage.get)('level-history-ma-7').then(() => Promise.resolve([]))
      when(infrastructure.storage.get)('playing-state-ma').then(() => Promise.resolve([]))
      when(infrastructure.storage.get)('level-lock-ma-7').then(() => Promise.resolve([]))

      return service.getOrCreateById('ma').then(chr => {
        expect(chr).to.be.instanceof(Character)
      })
    })

    it('creates the character by the id if it is not found', () => {
      when(infrastructure.storage.get)('character-ma').then(() => Promise.resolve(null))
      when(infrastructure.storage.set)().then(() => Promise.resolve(null))

      return service.getOrCreateById('ma').then(chr => {
        expect(chr).to.be.instanceof(Character)
        expect(chr.name).to.equal('Ma')
      })
    })
  })
})
