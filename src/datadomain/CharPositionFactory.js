/**
 * @class
 * CharPositionFactory handles the creation of CharPositions.
 */
datadomain.CharPositionFactory = subclass(function (pt) {
  'use strict'

  var START_FLOOR_ID = '7'
  var START_FLOOR_OBJECT_ID = '701'

  /**
   * Creates the start position.
   *
   * @return {datadomain.CharPosition}
   */
  pt.createStartPosition = function () {
    return new datadomain.CharPosition(
      START_FLOOR_ID,
      START_FLOOR_OBJECT_ID
    )
  }

  /**
   * Creates char position object from the object.
   *
   * @param {Object} obj The object
   * @return {datadomain.CharPosition}
   */
  pt.createFromObject = function (obj) {
    if (obj == null) {
      return this.createStartPosition()
    }

    return new datadomain.CharPosition(
      obj.floorId,
      obj.floorObjectId
    )
  }
})
