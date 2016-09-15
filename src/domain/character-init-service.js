const THE_FIRST_LEVEL = '701'

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

    if (id === 'ma') {
      character = factory.createFromObject({id, name: 'Ma'})
    } else if (id === 'ellen') {
      character = factory.createFromObject({id, name: 'Ellen'})
    } else if (id === 'emma') {
      character = factory.createFromObject({id, name: 'Emma'})
    } else {
      throw new Error('unknown character: ' + id)
    }

    // The first level is always unlocked.
    character.unlockById(THE_FIRST_LEVEL)

    return character
  }
}

module.exports = CharacterInitService
