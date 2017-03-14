const PlayingState = require('./playing-state')
const LevelHistory = require('./level-history')
const LevelLock = require('./level-lock')
const LevelKey = require('./level-key')
const Location = require('./location')

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
  static get Repository () {
    return require('./character-repository')
  }

  /**
   * @return {Class<CharacterFactory>}
   */
  static get Factory () {
    return require('./character-factory')
  }

  static get InitService () {
    return require('./character-init-service')
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

  isInTower () {
    return this.location != null && this.location.place === Location.PLACE.TOWER
  }

  assetId () {
    return this.isInTower() ? this.location.detail.assetId : null
  }

  floorId () {
    return this.isInTower() ? this.location.detail.floorId : null
  }

  /**
   * Saves itself. This does not saves the histories, locks and keys because they belong to the different storages.
   * @return {Promise}
   */
  save () {
    const repository = new Character.Repository()

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
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new LevelHistory.Repository(this.id).getByFloorId(this.floorId()).then(histories => {
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
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new LevelHistory.Repository(this.id).saveForFloorId(this.floorId(), this.histories).then(() => this)
  }

  /**
   * Reloads the level locks.
   */
  reloadLocks () {
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new LevelLock.Repository(this.id).getByFloorId(this.floorId()).then(locks => {
      this.locks = locks

      return this
    })
  }

  /**
   * Saves the current level locks.
   */
  saveLocks () {
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new LevelLock.Repository(this.id).saveByFloorId(this.floorId(), this.locks).then(() => this)
  }

  /**
   * Reloads the playingState
   *
   * @return {Promise}
   */
  reloadPlayingState () {
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new PlayingState.Repository().getByCharIdLevelId(this.id, this.assetId()).then(playingState => {
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
    if (!this.isInTower()) { return Promise.resolve(this) }

    return new PlayingState.Repository().save(this.playingState).then(() => this)
  }

  /**
   * Clears the playing state.
   *
   * @return {Promise}
   */
  clearPlayingState () {
    return new PlayingState.Repository().clearByCharId(this.id)
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
