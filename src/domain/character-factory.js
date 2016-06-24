const Character = require('./character')
const CharacterPositionFactory = require('./character-position-factory')
const LevelKeyFactory = require('./level-key-factory')

/**
 * The factory of Character.
 */
class CharacterFactory {
  /**
   * Creates a character from the object
   * @param {object} obj The object
   * @return {Character}
   */
  createFromObject (obj) {
    return new Character(
      obj.id,
      obj.name,
      new CharacterPositionFactory().createFromObject(obj.position),
      new LevelKeyFactory().createFromArray(obj.keys)
    )
  }

  /**
   * Creates the character of the initial state.
   * @param {string} id The character id
   * @return {Character}
   */
  createInitialById (id) {
    if (id === 'ma') {
      return new Character(
        id,
        'Ma',
        new CharacterPositionFactory().createFromObject()
      )
    } else if (id === 'ellen') {
      return new Character(
        id,
        'Ellen',
        new CharacterPositionFactory().createFromObject()
      )
    } else if (id === 'emma') {
      return new Character(
        id,
        'Emma',
        new CharacterPositionFactory().createFromObject()
      )
    }

    throw new Error('unknown character: ' + id)
  }
}

module.exports = CharacterFactory
