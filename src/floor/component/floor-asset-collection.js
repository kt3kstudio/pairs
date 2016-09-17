const {wait, Being} = require('spn')
const Floorboard = require('./floorboard')

const {img} = require('dom-gen')
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

  init (character) {
    this.elem.append(this.floorWalker(character))

    return this.loadFloorData(character)

    .then(data => this.setUpComponents(data))

    .then(() => this.walker.character.reloadLocks())

    .then(() => this.checkLock())
  }

  /**
   * Loads the floor data.
   */
  loadFloorData (character) {
    return Promise.resolve($.get(this.getFloorDataURL(character)))
  }

  /**
   * Gets the floor data url.
   * @return {string}
   */
  getFloorDataURL (character) {
    return `${global.BASEPATH}/data/floor/${character.position.floorId}.html`
  }

  /**
   * Loads assets from the given string html data.
   * @param {String} data The data
   */
  setUpComponents (data) {
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

    const character = this.walker.character

    this.updateAssetsByLocksAndHistories(character.locks, character.histories)
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
   * Checks if the current asset is unlocked and if not, then unlock it.
   * The purpose of this method is to unlock automatically the first asset where the character appear in the floor.
   * @param {string} assetId The id of the asset
   * @return {Promise}
   */
  checkLock () {
    const assetId = this.walker.assetId
    if (this.findById(assetId).locked) {
      return this.unlockById(assetId)
    }

    return Promise.resolve()
  }

  /**
   * Shows the floor assets.
   *
   * @override
   */
  willShow () {
    this.floorboard.show()

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
    }).then(() => this.floorboard.hide())
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

  /**
   * Initializes the floor walker.
   * @param {Character} character
   * @return {jQuery} dom selection
   */
  floorWalker (character) {
    return img({
      addClass: 'sub-door-knock sub-character-goto',
      data: {character},
      cc: 'floor-walker'
    })
  }

  /**
   * Unlocks the asset by the given id.
   * @param {string} id The asset id
   * @return {Promise}
   * @throws {Error} when the asset is not found
   */
  unlockById (id) {
    const asset = this.findById(id)

    if (!asset) {
      throw new Error(`The asset not found: assetId=${id}`)
    }

    asset.unlock()

    this.walker.unlockById(id)
    this.walker.removeKeyOf(id)

    return this.walker.saveAll()
  }
}

module.exports = FloorAssetCollection
