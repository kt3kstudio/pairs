const Location = require('./location')
const { PLACE, RoadLocationDetail, TowerLocationDetail } = Location

/**
 * The factory class of the location
 */
class LocationFactory {
  /**
   * Creates the location object from the given plain object.
   */
  createFromObject (obj) {
    if (!obj) {
      return null
    }

    const detail = obj.detail

    switch (obj.place) {
      case PLACE.ROOM:
        return new Location({place: PLACE.ROOM})
      case PLACE.ROAD:
        if (!detail || !detail.place) break

        return new Location({place: PLACE.ROAD, detail: new RoadLocationDetail(detail)})
      case PLACE.TOWER:
        if (!detail || !detail.floorId || !detail.assetId) break

        return new Location({place: PLACE.TOWER, detail: new TowerLocationDetail(detail)})
      default:
        break
    }

    console.warn(`invalid PLACE: ${obj.place}, detail: ${obj.detail}`)
    return null
  }
}

module.exports = LocationFactory
