const CharacterPosition = require('./character-position')

const START_FLOOR_ID = '7'
const START_FLOOR_OBJECT_ID = '701'

/**
 * CharacterPositionFactory is the factory class of CharacterPositions.
 */
class CharacterPositionFactory {
  /**
   * Creates the start position.
   *
   * @return {CharacterPosition}
   */
  createStartPosition () {
    return new CharacterPosition(START_FLOOR_ID, START_FLOOR_OBJECT_ID)
  }

  /**
   * Creates char position object from the object.
   * @param {Object} obj The object
   * @return {CharacterPosition}
   */
  createFromObject (obj) {
    if (obj == null) {
      return this.createStartPosition()
    }

    return new CharacterPosition(obj.floorId, obj.floorObjectId)
  }
}

module.exports = CharacterPositionFactory
