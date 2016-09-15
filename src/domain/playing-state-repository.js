const PlayingState = require('./playing-state')

const PLAYING_DATA_KEY = 'playing-state-'

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */
class PlayingStateRepository {
  /**
   * Gets a playing state by the character id.
   *
   * @param {String} chadId The character id
   * @param {String} levelId The level id
   * @return {Promise}
   */
  getByCharIdLevelId (charId, levelId) {
    return infrastructure.storage.get(PLAYING_DATA_KEY + charId, null).then(function (data) {
      if (data == null) {
        return new PlayingState(charId, levelId, [[]])
      }

      if (data.levelId !== levelId) {
        return new PlayingState(charId, levelId, [[]])
      }

      return new PlayingState(data.charId, data.levelId, data.rounds)
    })
  }

  /**
   * Saves the playingState
   * @return {Promise}
   */
  save (playingState) {
    if (playingState == null) {
      return Promise.resolve(null)
    }

    return infrastructure.storage.set(PLAYING_DATA_KEY + playingState.charId, this.toObject(playingState)).then(function () {
      return playingState
    })
  }

  /**
   * Clears the data by the character id
   * @param {String} id The character id
   * @return {Promise}
   */
  clearByCharId (id) {
    return infrastructure.storage.set(PLAYING_DATA_KEY + id, null)
  }

  /**
   * Converts to the object
   * @private
   * @param {PlayingState} playingState The playing state
   * @return {Object}
   */
  toObject (playingState) {
    return {
      charId: playingState.charId,
      levelId: playingState.levelId,
      rounds: playingState.rounds
    }
  }
}

module.exports = PlayingStateRepository
