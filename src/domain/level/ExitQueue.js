/**
 * ExitQueue class represents the exit queue at the level view.
 *
 * @class
 */
domain.level.ExitQueue = subclass(function (pt) {
  'use strict'

  pt.constructor = function (dimension) {
    this.dimension = dimension
    this.queue = []

  }

  /**
   * Enqueues the cell.
   *
   * @param {domain.level.Cell} cell The cell
   * @return {Promise} The promise resolves with the cell.
   */
  pt.enqueue = function (cell) {
    var that = this

    return this.involve(new Queuee(cell)).then(function () {
      return that.goForward()

    })

  }

  /**
   * Release cells.
   *
   * @return {Array}
   */
  pt.releaseCells = function () {
    return this.queue.splice(0).map(function (queuee) {
      return queuee.cell

    })

  }

  /**
   * Makes the entire queue go forward.
   *
   * @private
   * @return {Promise}
   */
  pt.goForward = function () {
    var d = 200 / this.queue.length

    return this.queue.map(function (queuee, i) {
      queuee.goForward()

      return wait(i * d).then(function () {
        return queuee.locate()
      })

    }).pop()
  }

  /**
   * Sets dimension data to the queuee and push into internal queue.
   *
   * @return {Promise}
   */
  pt.involve = function (queuee) {
    this.queue.push(queuee)

    return queuee.goOrigin().setDimension(this.dimension).setTransitionDuration(600)
  }

  /**
   * Checks if the queue is finished and has the last cell evolving.
   *
   * @return {Boolean}
   */
  pt.theLastOneIsEvolved = function () {
    if (this.queue.length === 0) {
      return false
    }

    var cell = this.queue[this.queue.length - 1].cell

    return cell.isLastOne() && cell.isEvolved()
  }

  /**
   * Queuee class is the role of the cell which is queued in the ExitQueue.
   *
   * @class domain.level.ExitQueue.Queuee
   * @private
   */
  var Queuee = subclass(function (pt) {
    /*
     * @constructor
     * @param {domain.level.Cell} cell The queueing cell
     */
    pt.constructor = function (cell) {
      this.cell = cell
    }

    /**
     * Goes forward in the queue.
     */
    pt.goForward = function () {
      if (this.cell.x < 4) {
        this.cell.x += 1
      } else {
        this.cell.y += 1
      }

      return this
    }

    /**
     * Locates the cell.
     */
    pt.locate = function () {
      return this.cell.updateDomDimension()
    }

    /**
     * Removes the cell.
     */
    pt.remove = function () {
      this.cell.remove()
    }

    /**
     * Goes to the origin of the queue dimension.
     */
    pt.goOrigin = function () {
      this.cell.x = -1
      this.cell.y = 0

      return this
    }

    /**
     * Sets the transion duraiton.
     *
     * @param {Number} dur The duration
     * @return {Promise} of domain.level.Cell
     */
    pt.setTransitionDuration = function (dur) {
      return this.cell.setTransitionDuration(dur)
    }

    /**
     * Sets the dimension.
     *
     * @param {Object} dimension The dimension
     * @return {domain.level.ExitQueue.Queuee}
     */
    pt.setDimension = function (dimension) {
      this.cell.setDimension(dimension)

      return this
    }

  })

})
