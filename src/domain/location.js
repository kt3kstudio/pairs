/**
 * The location model. VO.
 */
class Location {
  static get Factory () {
    return require('./location-factory')
  }

  /**
   * @param {string} place The place
   * @param {LocationDetail} detail The detail of the location
   */
  constructor ({place, detail}) {
    this.place = place
    this.detail = detail
  }

  goToRoom () {
    this.detail = null
    this.place = PLACE.ROOM
  }

  goToRoad () {
    this.detail = new RoadLocationDetail({place: this.place})
    this.place = PLACE.ROAD
  }

  goToTower () {
    this.place = PLACE.TOWER
    this.detail = new TowerLocationDetail({assetId: 'entrance', floorId: '1'})
  }
}

class LocationDetail {}

class TowerLocationDetail extends LocationDetail {
  /**
   * @param {string} floorId The floor id
   * @param {string} assetId The asset id
   */
  constructor ({floorId, assetId}) {
    super()

    this.floorId = floorId
    this.assetId = assetId
  }
}

class RoadLocationDetail extends LocationDetail {
  /**
   * @param {string} place The place in the road scene
   */
  constructor ({place}) {
    super()

    this.place = place
  }

  moveToTower () {
    this.place = PLACE.TOWER
  }

  moveToRoom () {
    this.place = PLACE.ROOM
  }
}

const PLACE = {
  ROOM: 'ROOM',
  ROAD: 'ROAD',
  TOWER: 'TOWER'
}

module.exports = Location
module.exports.PLACE = PLACE
module.exports.LocationDetail = LocationDetail
module.exports.RoadLocationDetail = RoadLocationDetail
module.exports.TowerLocationDetail = TowerLocationDetail
