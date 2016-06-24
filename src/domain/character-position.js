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
}

module.exports = CharacterPosition
