const reFloorId = /[a-zA-Z]*(\d)/
const getFloorIdFromAssetId = assetId => {
  const match = assetId.match(reFloorId)

  if (!match) {
    return null
  }

  return match[1]
}

/**
 * LevelKey is domain model which unlocks the corresponding level.
 */
class LevelKey {
  /**
   * @param {string} levelId The id of the level
   */
  constructor (levelId) {
    this.levelId = levelId
  }

  /**
   * Returns true if the key belongs to the give floor id.
   * @param {string} floorId The floor id
   * @return {boolean}
   */
  belongsTo (floorId) {
    return getFloorIdFromAssetId(this.levelId) === floorId
  }
}

module.exports = LevelKey
