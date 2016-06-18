/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */
export default class Character {
  /**
   * @constructor
   * @param {String} id The id of the character
   * @param {String} name The name of the character
   * @param {datadomain.CharPosition} position The position of the character
   * @param {datadomain.LevelHistoryCollection} histories The histories of the current floor
   * @param {datadomain.PlayingState} playingState The state of playing at the current level
   * @param {datadomain.LevelLockCollection} locks The collection of the level locks
   */
  constructor (id, name, position, histories, playingState, locks) {
    /**
     * @property {String} id The id of the character
     */
    this.id = id

    /**
     * @property {String} name The name of the character
     */
    this.name = name

    /**
     * @property {datadomain.CharPosition} position The position of the character
     */
    this.position = position

    /**
     * @property {datadomain.LevelHistoryCollection} histories The histories of the current floor
     */
    this.histories = histories

    /**
     * @property {datadomain.PlayingState} playingState The state of playing at the current level
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
   * @param {datadomain.CharPosition} position The position of the character
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
    return new datadomain.PlayingStateRepository().getByCharIdLevelId(this.id, this.position.floorObjectId).then(playingState => {
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
    return new datadomain.PlayingStateRepository().save(this.playingState).then(() => this)
  }

  /**
   * Clears the playing state.
   *
   * @return {Promise}
   */
  clearPlayingState () {
    return new datadomain.PlayingStateRepository().clearByCharId(this.id)
  }

  /**
   */
  getFloorObjectId () {
    return this.position.floorObjectId
  }
}
