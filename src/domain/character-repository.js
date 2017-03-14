const CharacterFactory = require('./character-factory')
const Location = require('./location')

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
   * @return {Promise<Character>} A promise of a character
   */
  getById (id) {
    return infrastructure.storage.get(STORAGE_KEY + id, null).then(obj => {
      if (obj == null) {
        return null
      }

      const factory = new CharacterFactory()
      const character = factory.createFromObject(obj)

      return character.reloadAll().then(() => character)
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
      position: this.positionToObject(character.position),
      location: this.locationToObject(character.location)
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

    return keys.keys.map(key => this.keyToObject(key))
  }

  /**
   * Converts the level key to an object.
   * @param {LevelKey} key The level key
   * @return {object}
   */
  keyToObject (key) {
    return {
      levelId: key.levelId
    }
  }

  /**
   * Converts the CharacterPosition object into js object.
   * @private
   * @param {CharacterPosition} position The position
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

  /**
   * Converts the location object to plain object.
   * @param {Location} location
   * @return {Object}
   */
  locationToObject (location) {
    if (location == null) {
      return null
    }

    return {
      place: location.place,
      detail: this.locationDetailToObject(location.detail)
    }
  }

  /**
   * Converts the location detail to plain object.
   * @param {LocationDetail} detail The detail
   * @return {Object}
   */
  locationDetailToObject (detail) {
    if (detail == null) {
      return null
    }

    if (detail instanceof Location.RoadLocationDetail) {
      return {
        place: detail.place
      }
    } else {
      return {
        floorId: detail.floorId,
        assetId: detail.assetId
      }
    }
  }
}

module.exports = CharacterRepository
