const PlayingStateRepository = require('./playing-state-repository')

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharacterPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */
class Character {
  /**
   * @constructor
   * @param {string} id The id of the character
   * @param {string} name The name of the character
   * @param {CharacterPosition} position The position of the character
   * @param {LevelKey[]} keys The keys of the levels
   * @param {datadomain.LevelHistoryCollection} histories The histories of the current floor
   * @param {PlayingState} playingState The state of playing at the current level
   * @param {datadomain.LevelLockCollection} locks The collection of the level locks
   */
  constructor (id, name, position, keys, histories, playingState, locks) {
    /**
     * @property {String} id The id of the character
     */
    this.id = id

    /**
     * @property {String} name The name of the character
     */
    this.name = name

    /**
     * @property {CharacterPosition} position The position of the character
     */
    this.position = position

    this.keys = keys

    /**
     * @property {datadomain.LevelHistoryCollection} histories The histories of the current floor
     */
    this.histories = histories

    /**
     * @property {PlayingState} playingState The state of playing at the current level
     */
    this.playingState = playingState

    /**
     * @property {datadomain.LevelLockCollection} collection The collection of the locks
     */
    this.locks = locks
  }

  /**
   * Sets the position of character.
   *
   * @param {CharacterPosition} position The position of the character
   */
  setPosition (position) {
    this.position = position
  }

  /**
   * Reloads the levelHistories according to the current position.
   *
   * @return {Promise} resolves with updated character
   */
  reloadHistories () {
    if (this.position == null) {
      return Promise.resolve(this)
    }

    return new datadomain.LevelHistoryRepository(this.id).getByFloorId(this.position.floorId).then(histories => {
      this.histories = histories

      return this
    })
  }

  /**
   * Saves the LevelHistories.
   *
   * @return {Promise}
   */
  saveHistories () {
    return new datadomain.LevelHistoryRepository(this.id).saveByFloorId(this.position.floorId, this.histories).then(() => this)
  }

  /**
   * Reloads the level locks.
   */
  reloadLocks () {
    if (this.position == null) {
      return Promise.resolve(this)
    }

    return new datadomain.LevelLockRepository(this.id).getByFloorId(this.position.floorId).then(locks => {
      this.locks = locks

      return this
    })
  }

  /**
   * Saves the current level locks.
   */
  saveLocks () {
    return new datadomain.LevelLockRepository(this.id).saveByFloorId(this.position.floorId, this.locks).then(() => this)
  }

  /**
   * Reloads the playingState
   *
   * @return {Promise}
   */
  reloadPlayingState () {
    return new PlayingStateRepository().getByCharIdLevelId(this.id, this.position.floorObjectId).then(playingState => {
      this.playingState = playingState

      return this
    })
  }

  /**
   * Saves the playing state.
   *
   * @return {Promise}
   */
  savePlayingState () {
    return new PlayingStateRepository().save(this.playingState).then(() => this)
  }

  /**
   * Clears the playing state.
   *
   * @return {Promise}
   */
  clearPlayingState () {
    return new PlayingStateRepository().clearByCharId(this.id)
  }

  /**
   */
  getFloorObjectId () {
    return this.position.floorObjectId
  }
}

module.exports = Character
