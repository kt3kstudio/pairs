const CharacterFactory = require('./character-factory')

const STORAGE_KEY = 'character-'

/**
 * The repository of Character.
 *
 */
class CharacterRepository {
  /**
   * Saves the character.
   *
   * @param {Character} character The Character
   * @return {Promise}
   */
  save (character) {
    const obj = this.toObject(character)

    return infrastructure.storage.set(STORAGE_KEY + character.id, obj).then(() => character)
  }

  /**
   * Gets a character by the id.
   *
   * @param {String} id The id
   * @return {Promise} A promise of a character
   */
  getById (id) {
    return infrastructure.storage.get(STORAGE_KEY + id, null).then(obj => {
      let character

      const factory = new CharacterFactory()

      if (obj == null) {
        character = factory.createInitialById(id)
      } else {
        character = factory.createFromObject(obj)
      }

      return Promise.all([
        character.reloadHistories(),
        character.reloadPlayingState(),
        character.reloadLocks()
      ])
      .then(() => character)
    })
  }

  /**
   * @private
   * Converts the Character object into js object.
   *
   * @param {Character} character The Character
   * @return {Object}
   */
  toObject (character) {
    return {
      id: character.id,
      name: character.name,
      keys: this.keysToArray(character.keys),
      position: this.positionToObject(character.position)
    }
  }

  /**
   * Converts the level keys to objects.
   * @param {LevelKey[]}
   * @return {object[]}
   */
  keysToArray (keys) {
    if (keys == null) {
      return []
    }

    return keys.map(key => this.keyToObject(key))
  }

  /**
   * Converts the level key to an object.
   * @param {LevelKey} key The level key
   * @return {object}
   */
  keyToObject (key) {
    if (key == null) {
      return null
    }

    return {
      levelId: key.levelId
    }
  }

  /**
   * @private
   * Converts the CharPosition object into js object.
   *
   * @param {datadomain.CharPosition} position The position
   * @return {Object}
   */
  positionToObject (position) {
    if (position == null) {
      return null
    }

    return {
      floorId: position.floorId,
      floorObjectId: position.floorObjectId
    }
  }
}

module.exports = CharacterRepository
