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
      return this.createFromObject({id, name: 'Ma'})
    } else if (id === 'ellen') {
      return this.createFromObject({id, name: 'Ellen'})
    } else if (id === 'emma') {
      return this.createFromObject({id, name: 'Emma'})
    }

    throw new Error('unknown character: ' + id)
  }
}

module.exports = CharacterFactory
