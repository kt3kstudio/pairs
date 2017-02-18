const { block } = require('../../ui')
const { wait, Being, Rect } = require('spn')
const Floorboard = require('./floorboard')

const { img } = require('dom-gen')
const { get, prep, component, wire } = capsid

const assetTypes = [
  'door',
  'staircase',
  'entrance',
  'elevator'
]

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

    return this.loadFloorData()

    .then(data => this.setUpComponents(data))

    .then(() => this.walker.character.reloadLocks())

    .then(() => this.checkLock())
  }

  /**
   * Loads the floor data.
   * @return {Promise<string>}
   */
  loadFloorData () {
    return $.get(`${global.BASEPATH}/floor/data/${this.walker.floorId}.html`)
  }

  /**
   * Loads assets from the given string html data.
   * @param {String} data The html data floor
   */
  setUpComponents (data) {
    // prepend loaded (string) data to the elem
    $(data).prependTo(this.el)

    // set floor width
    this.$el.width(this.$el.find('.floor-data').data('floor-width'))

    // set y coordinate to doors and staircases
    this.$el.find('.door, .staircase').attr('y', Floorboard.groundLevel())

    const items = this.items = []

    // init floor assets
    assetTypes.forEach(assetType => {
      prep(assetType, this.el)

      this.$el.find(`.${assetType}`).each(function () {
        items.push(get(assetType, this))
      })
    })

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
      const id = asset.el.id

      asset.locked = locks.isLocked(id)

      let history = histories.getById(id)

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
   */
  willShow () {
    return this.floorboard.show()
      .then(() => this.items.map((item, i) => wait(i * 100).then(() => item.show())).slice(-1)[0])
      .then(() => this.walker.appearAt(this.findById(this.walker.assetId)))
  }

  /**
   * Hides the floor assets.
   */
  willHide () {
    return this.items.map((item, i) => wait(i * 100).then(() => item.hide())).slice(-1)[0]
      .then(() => this.floorboard.hide())
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
