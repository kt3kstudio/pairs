const THE_FIRST_ASSET = '701'
const Location = require('./location')

/**
 * Responsibility: The initialization of the character.
 *
 * This service is used when the character data doesn't exist yet.
 */
class CharacterInitService {
  /**
   * @param {string} id The id of the character (one of ma, ellen and emma)
   * @return {Character}
   */
  initById (id) {
    let character
    const CharacterFactory = require('./character-factory')
    const factory = new CharacterFactory()

    // Gets the first location
    const location = this.initialLocationById(id)

    if (id === 'ma') {
      character = factory.createFromObject({id, name: 'Ma', location})
    } else if (id === 'ellen') {
      character = factory.createFromObject({id, name: 'Ellen', location})
    } else if (id === 'emma') {
      character = factory.createFromObject({id, name: 'Emma', location})
    } else {
      throw new Error('unknown character: ' + id)
    }

    // The first asset is always unlocked.
    character.unlockById(THE_FIRST_ASSET)

    return character
  }

  /**
   * Returns the initial location for the character.
   * @param {string} id The character id
   * @return {Location}
   */
  initialLocationById (id) {
    if (id === 'ma') {
      return new Location({place: Location.PLACE.ROOM})
    } else if (id === 'ellen') {
      return new Location({place: Location.PLACE.ROOM})
    }

    return new Location({place: Location.PLACE.ROOM})
  }

  /**
   * Gets the character data if exist, otherwise create it by the id.
   * @param {string} id The id
   * @return {Promise<Character>}
   */
  getOrCreateById (id) {
    const CharacterRepository = require('./character-repository')
    const repository = new CharacterRepository()

    return repository.getById(id).then(character => {
      if (character) {
        return character
      }

      return this.initById(id).saveAll()
    })
  }
}

module.exports = CharacterInitService
