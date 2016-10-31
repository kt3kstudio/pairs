const Character = require('../../src/domain/character')
const CharacterPosition = require('../../src/domain/character-position')
const LevelKey = require('../../src/domain/level-key')
const LevelKeyCollection = require('../../src/domain/level-key-collection')
const CharacterRepository = require('../../src/domain/character-repository')

describe('CharacterRepository', () => {
  const repo = new CharacterRepository()
  const origGet = infrastructure.storage.get
  const origSet = infrastructure.storage.set

  beforeEach(() => {
    infrastructure.storage.get = spy(() => {})
    infrastructure.storage.set = spy(() => {})
  })

  afterEach(() => {
    infrastructure.storage.get = origGet
    infrastructure.storage.set = origSet
  })

  describe('save', () => {
    it('saves the character', () => {
      const character = new Character()

      when(infrastructure.storage.set)().then(() => Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })

    it('saves the character\'s position and keys', () => {
      const character = new Character('ma', 'Ma', new CharacterPosition('7', '701'), new LevelKeyCollection([new LevelKey('702')]))

      when(infrastructure.storage.set)().then(() => Promise.resolve({}))

      return repo.save(character).then(character => {
        expect(character).to.be.instanceof(Character)
      })
    })
  })

  describe('getById', () => {
    it('gets a character by the id', () => {
      when(infrastructure.storage.get)('character-ma').then(() => Promise.resolve({id: 'ma'}))

      when(infrastructure.storage.get)('level-history-ma-7').then(() => Promise.resolve([]))

      when(infrastructure.storage.get)('playing-state-ma').then(() => Promise.resolve([]))

      when(infrastructure.storage.get)('level-lock-ma-7').then(() => Promise.resolve([]))

      return repo.getById('ma').then(character => expect(character).to.be.instanceof(Character))
    })
  })
})
