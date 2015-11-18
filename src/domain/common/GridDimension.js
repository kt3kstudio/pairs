/**
 * GridDimension class contains information of the grid layout.
 */
domain.common.GridDimension = subclass(function (pt) {
  'use strict'

  /**
   * @param {Object} options The options
   * @param {Number} options.left The left limit in pixel
   * @param {Number} options.top The top limit in pixel
   * @param {Number} options.width The width of a grid unit
   * @param {Number} options.height The height of a grid unit
   */
  pt.constructor = function (options) {
    this.left = options.left
    this.top = options.top
    this.width = options.width
    this.height = options.height
  }
})
