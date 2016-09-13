const {wait, Being} = require('spn')
const Floorboard = require('./floorboard')

const {component, wire} = $.cc

/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * Collective Component
 */
@component
class FloorAssetCollection extends Being {
  /**
   * @return {FloorWalker}
   */
  @wire('floor-walker') get walker () {}

  /**
   * @return {Floorboard}
   */
  @wire get floorboard () {}

  /**
   * Loads assets from the given string html data.
   * @param {String} data The data
   */
  loadAssetsFromData (data) {
    // prepend loaded (string) data to the elem
    $(data).prependTo(this.elem)

    // set y coordinate to doors and staircases
    this.elem.find('.door, .staircase').attr('y', Floorboard.groundLevel())

    // init floor assets
    $.cc.init('door staircase', this.elem)

    // collect staircases
    this.staircases = this.elem.find('.staircase').map(function () {
      return $(this).cc.get('staircase')
    }).toArray()

    // collect doors
    this.doors = this.elem.find('.door').map(function () {
      return $(this).cc.get('door')
    }).toArray()

    this.items = [].concat(this.staircases, this.doors)

    // set floor width
    this.elem.width(this.elem.find('.floor-data').data('floor-width'))
  }

  /**
   * Update the floor assets by the level locks and level histories.
   * @param {LevelLockCollection} locks The level locks
   * @param {LevelHistoryCollection} histories The level histories
   */
  updateAssetsByLocksAndHistories (locks, histories) {
    this.items.forEach(asset => {
      asset.locked = locks.isLocked(asset.id)

      let history = histories.getById(asset.id)

      if (history) {
        asset.score = history.score
      }
    })
  }

  /**
   * Shows the floor assets.
   *
   * @override
   */
  willShow () {
    return this.foldByFunc(item => {
      item.show()

      return wait(100)
    })
  }

  /**
   * Hides the floor assets.
   *
   * @override
   */
  willHide () {
    return this.foldByFunc(item => {
      item.disappear()

      return wait(100)
    })
  }

  /**
   * Folds the items by the given function. This is the private utility method.
   *
   * @private
   * @param {Function} func The folding function of each item
   */
  foldByFunc (func) {
    return this.items.reduce((p, item) => p.then(() => func(item)), Promise.resolve())
  }

  /**
   * Find the floor asset of the given id.
   *
   * @param {String} id The id of the wall object
   * @returns {domain.map.Door}
   */
  findById (id) {
    return this.items.filter(item => item.id === id)[0]
  }
}

module.exports = FloorAssetCollection
