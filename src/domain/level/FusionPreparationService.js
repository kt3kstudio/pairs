/**
 * FusionPreparationService takes cells in sequence and move them into the preparation position. After that it emits the list of cells for the actual fusion.
 *
 * @class
 */
domain.level.FusionPreparationService = subclass(function (pt) {
  'use strict'

  /**
   * @constructor
   */
  pt.constructor = function (dimension) {
    this.stack = new PreparationStack(dimension)
  }

  /**
   * Takes cell into the fusion preparing position.
   *
   * @param {domain.level.Cell} cell The cell
   * @return {Promise} {Promise<domain.level.FusionPair>}
   */
  pt.take = function (cell) {
    this.stack.push(cell)

    if (!this.stack.isPrepared()) {
      return
    }

    return Promise.all(this.stack.popAll()).then(function (array) {
      return new domain.level.FusionPair(array[0], array[1])
    })
  }

  /**
   * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
   *
   * @class domain.level.FusionPreparationService.PreparationStack
   * @private
   */
  var PreparationStack = subclass(function (pt) {
    /**
     * @constructor
     */
    pt.constructor = function (dimension) {
      this.dimension = dimension
      this.stack = []
      this.isFinished = false
    }

    /**
     * The duration of going to fusion preparation position.
     */
    pt.takeDur = 700

    /**
     * Pushes to the stack.
     *
     * @param {domain.level.Cell} cell The cell
     */
    pt.push = function (cell) {
      this.isFinished = cell.isLastOne()

      this.stack.push(this.locate(cell, this.stack.length))
    }

    /**
     * locate the cell at the index.
     *
     * @param {domain.level.Cell} cell The cell
     * @param {Number} index The index
     * @return {Promise<domain.level.Cell>}
     */
    pt.locate = function (cell, index) {
      cell.setDimension(this.dimension)

      cell.x = index
      cell.y = 0

      return cell.setTransitionDuration(this.takeDur).then(function () {
        return cell.updateDomDimension()
      }).then(function () {
        return cell
      })
    }

    pt.isPrepared = function () {
      return this.isFinished || this.isFull()
    }

    pt.isFull = function () {
      return this.stack.length >= 2
    }

    /**
     * Pops all the cells.
     *
     * @return {Array<Promise<domain.level.Cell>>}
     */
    pt.popAll = function () {
      return this.stack.splice(0)
    }
  })
})
