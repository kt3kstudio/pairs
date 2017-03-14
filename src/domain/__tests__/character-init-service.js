const td = require('testdouble')

const { Character } = require('../')
const { InitService } = Character

describe('CharacterInitService', () => {
  const service = new InitService()

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
      td.replace(infrastructure.storage, 'get')
      td.replace(infrastructure.storage, 'set')
    })

    afterEach(() => {
      td.reset()
    })

    it('gets the character by the id if it is found', () => {
      td.when(infrastructure.storage.get('character-ma', null)).thenReturn(Promise.resolve({id: 'ma'}))
      td.when(infrastructure.storage.get('level-history-ma-7', [])).thenReturn(Promise.resolve([]))
      td.when(infrastructure.storage.get('playing-state-ma', null)).thenReturn(Promise.resolve([]))
      td.when(infrastructure.storage.get('level-lock-ma-7', [])).thenReturn(Promise.resolve([]))

      return service.getOrCreateById('ma').then(chr => {
        expect(chr).to.be.instanceof(Character)
      })
    })

    it('creates the character by the id if it is not found', () => {
      td.when(infrastructure.storage.get('character-ma', null)).thenReturn(Promise.resolve(null))
      td.when(infrastructure.storage.set('character-ma', td.matchers.isA(Object))).thenReturn(Promise.resolve(null))
      td.when(infrastructure.storage.set('level-history-ma-7', td.matchers.isA(Array))).thenReturn(Promise.resolve(null))
      td.when(infrastructure.storage.set('level-lock-ma-7', td.matchers.isA(Array))).thenReturn(Promise.resolve(null))

      return service.getOrCreateById('ma').then(chr => {
        expect(chr).to.be.instanceof(Character)
        expect(chr.name).to.equal('Ma')
      })
    })
  })
})
