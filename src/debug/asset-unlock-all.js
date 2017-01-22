const {component, on} = capsid

@component
class AssetUnlockAll {
  /**
   * @return {FloorAssetCollection}
   */
  getFloorAssets () {
    return $('.floor-asset-collection').cc.get('floor-asset-collection')
  }

  /**
   * Unlocks all the assets in the floor.
   * @param {object} e The event
   */
  @on('click') unlockAll () {
    const floorAssets = this.getFloorAssets()

    floorAssets.items.forEach(item => {
      floorAssets.unlockById(item.id)
    })
  }
}

module.exports = AssetUnlockAll
