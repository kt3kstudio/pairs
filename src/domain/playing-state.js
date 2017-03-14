/**
 * PlayingState model represents the current playing state of the level.
 */
class PlayingState {

  static get Repository () {
    return require('./playing-state-repository')
  }

  /**
   * @constructor
   * @param {String} charId The character id
   * @param {String} levelId The level id
   * @param {Array} [rounds] The directions
   */
  constructor (charId, levelId, rounds) {
    this.charId = charId
    this.levelId = levelId
    this.rounds = rounds || [[]]
  }

  /**
   * Moves to the next round.
   */
  bump () {
    this.rounds.unshift([])
  }

  /**
   * Releases the round data and init the obj state.
   * @return {Array} The array of round data
   */
  release () {
    const rounds = this.rounds.splice(0).reverse()

    this.bump()

    return rounds
  }

  /**
   * Adds a direction.
   * @param {String} dir The direction
   */
  add (dir) {
    this.rounds[0].push(dir)
  }
}

module.exports = PlayingState
