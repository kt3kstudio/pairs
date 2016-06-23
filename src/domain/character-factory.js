const Character = require('./character')
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
      new datadomain.CharPositionFactory().createFromObject(obj.position),
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
        new datadomain.CharPositionFactory().createFromObject()
      )
    } else if (id === 'ellen') {
      return new Character(
        id,
        'Ellen',
        new datadomain.CharPositionFactory().createFromObject()
      )
    } else if (id === 'emma') {
      return new Character(
        id,
        'Emma',
        new datadomain.CharPositionFactory().createFromObject()
      )
    }

    throw new Error('unknown character: ' + id)
  }
}

module.exports = CharacterFactory
