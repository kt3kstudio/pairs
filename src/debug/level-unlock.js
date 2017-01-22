const { component, on } = capsid

/**
 * Unlocks the level in the debug panel.
 */
@component
class LevelUnlock {
  /**
   * Gets the floor assets.
   * @return {FloorAssetCollection}
   */
  getFloorAssets () {
    return $('.floor-asset-collection').cc.get('floor-asset-collection')
  }

  @on('click') onClick () {
    const assetIds = window.prompt('Unlock which level?')

    assetIds.split(/,| +/).forEach(assetId => this.unlockById(assetId))
  }

  unlockById (assetId) {
    const asset = this.getFloorAssets().findById(assetId)

    if (!asset) {
      window.alert(`Sorry, could not find level ${assetId} in this floor`)
      return
    }

    this.getFloorAssets().unlockById(assetId).then(() => {
      console.log(`Unlocked: ${assetId}`)
    })
  }
}

module.exports = LevelUnlock
