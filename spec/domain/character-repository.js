import Character from '../../src/domain/character'
import CharacterRepository from '../../src/domain/character-repository'

describe('CharacterRepository', () => {
  'use strict'

  const repo = new CharacterRepository()

  beforeEach(() => {

    window.infrastructure = {}

    window.infrastructure.storage = {
      get: spy(() => {}),
      set: spy(() => {})
    }

  })

  describe('save', () => {

    it('saves the character', () => {

      const character = new Character()

      when(infrastructure.storage.set)().then(() => Promise.resolve({}))

      return repo.save(character).then(character => expect(character).to.be.instanceof(Character))

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
