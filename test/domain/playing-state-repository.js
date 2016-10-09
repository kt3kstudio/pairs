const PlayingStateRepository = require('../../src/domain/playing-state-repository')
const PlayingState = require('../../src/domain/playing-state')

describe('PlayingStateRepository', () => {
  'use strict'

  const repo = new PlayingStateRepository()
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
    it('saves the playing state', () => {
      const playingState = new PlayingState('ma', [])

      when(infrastructure.storage.set)().then(() => {
        return Promise.resolve({})
      })

      return repo.save(playingState).then(playingState => {
        expect(playingState).to.be.instanceof(PlayingState)
      })
    })

    it('does nothing and returns a promise of null if null is given', () => {
      return repo.save(null).then(playingState => {
        expect(playingState).to.be.null
      })
    })
  })

  describe('getByCharIdLevelId', () => {
    it('gets a PlayingState by the character id', () => {
      when(infrastructure.storage.get)('playing-state-ma').then(() => {
        return Promise.resolve({
          charId: 'ma',
          levelId: '701',
          rounds: [['up']]
        })
      })

      return repo.getByCharIdLevelId('ma', '701').then(playingState => {
        expect(playingState).to.be.instanceof(PlayingState)
        expect(playingState.charId).to.equal('ma')
        expect(playingState.levelId).to.equal('701')
        expect(playingState.rounds).to.eql([['up']])
      })
    })

    it('resolves with an empty PlayingState when the data unavailable', () => {
      when(infrastructure.storage.get)('playing-state-ma').then(() => Promise.resolve(null))

      return repo.getByCharIdLevelId('ma', '701').then(playingState => {
        expect(playingState).to.be.instanceof(PlayingState)
        expect(playingState.charId).to.equal('ma')
        expect(playingState.levelId).to.equal('701')
        expect(playingState.rounds).to.eql([[]])
      })
    })
  })

  describe('clearByCharId', () => {
    it('clears the playing state by the character id', () => {
      when(infrastructure.storage.set)('playing-state-ma', null).then(() => Promise.resolve(true))

      return repo.clearByCharId('ma').then(res => {
        expect(res).to.be.true
      })
    })
  })
})
