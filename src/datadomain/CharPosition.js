const {subclass} = $.cc

/**
 * The position of the character.
 */
datadomain.CharPosition = subclass(function (pt) {
  'use strict'

  /**
   * @constructor
   * @param {String} floorId The id of the floor
   * @param {String} floorObjectId The id of the floor object
   */
  pt.constructor = function (floorId, floorObjectId) {
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
   *
   * @return {Object}
   */
  pt.toObject = function () {
    return {
      floorId: this.floorId,
      floorObjectId: this.floorObjectId
    }
  }
})
