const PlayingStateRepository = require('./playing-state-repository')
const LevelHistoryRepository = require('./level-history-repository')
const LevelLockRepository = require('./level-lock-repository')
const LevelKey = require('./level-key')

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharacterPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */
class Character {
  /**
   * @return {Class<CharacterRepository>}
   */
  static get Repository() {
    return require('./character-repository')
  }

  /**
   * @return {Class<CharacterFactory>}
   */
  static get Factory() {
    return require('./character-factory')
  }

  /**
   * @constructor
   * @param {string} id The id of the character
   * @param {string} name The name of the character
   * @param {CharacterPosition} position The position of the character
   * @param {LevelKeyCollection} keys The keys of the levels
   * @param {LevelHistoryCollection} histories The histories of the current floor
   * @param {PlayingState} playingState The state of playing at the current level
   * @param {LevelLockCollection} locks The collection of the level locks
   * @param {Location} location The location of the character
   */
  constructor (id, name, position, keys, histories, playingState, locks, location) {
    /**
     * @property {String} id The id of the character
     */
    this.id = id

    /**
     * @property {String} name The name of the character
     */
    this.name = name

    /**
     * @deprecated
     * @property {CharacterPosition} position The position of the character
     */
    this.position = position

    /**
     * @property {LevelKeyCollection} keys The asset keys
     */
    this.keys = keys

    /**
     * @property {LevelHistoryCollection} histories The histories of the current floor
     */
    this.histories = histories

    /**
     * @property {PlayingState} playingState The state of playing at the current level
     */
    this.playingState = playingState

    /**
     * @property {LevelLockCollection} collection The collection of the locks
     */
    this.locks = locks

    /**
     * @property {Location} location The locatioin
     */
    this.location = location
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
   * Saves itself. This does not saves the histories, locks and keys because they belong to the different storages.
   * @return {Promise}
   */
  save () {
    const CharacterRepository = require('./character-repository')
    const repository = new CharacterRepository()

    return repository.save(this)
  }

  /**
   * Saves itself and child models.
   * @return {Promise}
   */
  saveAll () {
    return Promise.all([
      this.save(),
      this.saveHistories(),
      this.savePlayingState(),
      this.saveLocks()
    ]).then(([character]) => character)
  }

  /**
   * Reloads all the submodels it has. (for now histories, locks and playing-state)
   * @return {Promise}
   */
  reloadAll () {
    return Promise.all([this.reloadHistories(), this.reloadLocks(), this.reloadPlayingState()])
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

    return new LevelHistoryRepository(this.id).getByFloorId(this.position.floorId).then(histories => {
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
    return new LevelHistoryRepository(this.id).saveForFloorId(this.position.floorId, this.histories).then(() => this)
  }

  /**
   * Reloads the level locks.
   */
  reloadLocks () {
    if (this.position == null) {
      return Promise.resolve(this)
    }

    return new LevelLockRepository(this.id).getByFloorId(this.position.floorId).then(locks => {
      this.locks = locks

      return this
    })
  }

  /**
   * Saves the current level locks.
   */
  saveLocks () {
    console.log('save locks')
    return new LevelLockRepository(this.id).saveByFloorId(this.position.floorId, this.locks).then(() => this)
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
   * Gets the floow object id.
   * @return {string}
   */
  getFloorObjectId () {
    return this.position.floorObjectId
  }

  /**
   * Adds the level key of the given id.
   * @param {string} levelId The level id
   */
  addKeyOf (levelId) {
    this.keys.add(new LevelKey(levelId))
  }

  /**
   * Removes the key of the given id.
   * @param {string} levelId The level id
   */
  removeKeyOf (levelId) {
    this.keys.deleteByLevelId(levelId)
  }

  /**
   * @return {boolean}
   */
  hasAnyKey () {
    return this.keys.hasAny()
  }

  /**
   * Unlocks the asset of the id.
   * @param {string} id The asset id
   */
  unlockById (id) {
    this.locks.unlock(id)
  }
}

module.exports = Character
