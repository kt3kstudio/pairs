const Character = require('./character')
const CharacterPositionFactory = require('./character-position-factory')
const LevelKeyFactory = require('./level-key-factory')
const LevelHistoryFactory = require('./level-history-factory')
const LevelLockFactory = require('./level-lock-factory')
const LocationFactory = require('./location-factory')

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
      new LevelKeyFactory().createFromArray(obj.keys),
      new LevelHistoryFactory().createCollectionFromArray([]),
      null,
      new LevelLockFactory().createCollectionFromObjectList([]),
      new LocationFactory().createFromObject(obj.location)
    )
  }
}

module.exports = CharacterFactory
