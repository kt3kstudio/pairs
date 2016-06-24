const PlayingState = require('../../src/domain/playing-state')

describe('PlayingState', () => {
  let playingState

  beforeEach(() => {
    playingState = new PlayingState('ma', '701', [['down'], ['up']])
  })

  describe('bump', () => {
    it('adds a round', () => {
      playingState.bump()

      expect(playingState.rounds.length).to.equal(3)

      playingState.bump()

      expect(playingState.rounds.length).to.equal(4)
    })

    it('adds a empty round at the beginning of the rounds data', () => {
      playingState.bump()

      expect(playingState.rounds[0]).to.eql([])
    })
  })

  describe('release', () => {
    it('empties the round data and returns the current round data in reverse order', () => {
      const released = playingState.release()

      expect(released).to.eql([['up'], ['down']])
      expect(playingState.rounds).to.eql([[]])
    })
  })

  describe('add', () => {
    it('adds a move to the current round data', () => {
      playingState.add('up')

      expect(playingState.rounds).to.eql([['down', 'up'], ['up']])
    })
  })
})
