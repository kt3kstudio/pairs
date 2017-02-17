const { block } = require('../../ui')
const { wait, Being, Rect } = require('spn')
const Floorboard = require('./floorboard')

const { img } = require('dom-gen')
const { get, prep, component, wire } = capsid

/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 */
@block
@component
class FloorAssetCollection extends Being {

  @wire('floor-walker') get walker () {}
  @wire get floorboard () {}

  block (rect) {
    return Rect.fromElement(this.el)
  }

  init (character) {
    this.$el.append(this.floorWalker(character))

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
    return `${global.BASEPATH}/floor/data/${character.location.detail.floorId}.html`
  }

  /**
   * Loads assets from the given string html data.
   * @param {String} data The html data floor
   */
  setUpComponents (data) {
    // prepend loaded (string) data to the elem
    $(data).prependTo(this.el)

    // set y coordinate to doors and staircases
    this.$el.find('.door, .staircase, .entrance').attr('y', Floorboard.groundLevel())

    // init floor assets
    prep('door', this.el)
    prep('staircase', this.el)
    prep('entrance', this.el)

    // collect staircases
    this.staircases = this.$el.find('.staircase').map(function () {
      return get('staircase', this)
    }).toArray()

    // collect doors
    this.doors = this.$el.find('.door').map(function () {
      return get('door', this)
    }).toArray()

    this.entrances = this.$el.find('.entrance').map(function () {
      return get('entrance', this)
    }).toArray()

    this.items = [].concat(this.staircases, this.doors, this.entrances)

    // set floor width
    this.$el.width(this.$el.find('.floor-data').data('floor-width'))

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
    return this.items.filter(item => item.el.id === id)[0]
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

    this.unlockAsset(asset)

    this.walker.unlockById(id)
    this.walker.removeKeyOf(id)

    return this.walker.saveAll()
  }

  /**
   * Unlocks the asset.
   * @param {FloorAsset} asset The floor asset
   */
  unlockAsset (asset) {
    asset.el.dispatchEvent(new CustomEvent('unlock'))
  }

}

module.exports = FloorAssetCollection
