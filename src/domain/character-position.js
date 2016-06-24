/**
 * The position of the character.
 */
class CharacterPosition {
  /**
   * @constructor
   * @param {string} floorId The id of the floor
   * @param {string} floorObjectId The id of the floor object
   */
  constructor (floorId, floorObjectId) {
    /**
     * @property {String} floorId The id of the floor
     */
    this.floorId = floorId

    /**
     * @property {String} floorObjectId The id of the floor object
     */
    this.floorObjectId = floorObjectId
  }

  /**
   * Returns the object representation of the character's position
   * @return {Object}
   */
  toObject () {
    return {
      floorId: this.floorId,
      floorObjectId: this.floorObjectId
    }
  }
}

module.exports = CharacterPosition
