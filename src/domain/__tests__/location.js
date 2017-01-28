const Location = require('../location')

const { expect } = require('chai')

describe('Location', () => {
  let location
  beforeEach(() => {
    location = new Location({place: null, detail: null})
  })

  describe('goToRoom', () => {
    it('goes to the room', () => {
      location.goToRoom()

      expect(location.place).to.equal(Location.PLACE.ROOM)
    })
  })

  describe('goToRoad', () => {
    it('goes to the road', () => {
      location.goToRoom()
      location.goToRoad()

      expect(location.place).to.equal(Location.PLACE.ROAD)
      expect(location.detail).to.be.instanceof(Location.RoadLocationDetail)
      expect(location.detail.place).to.equal(Location.PLACE.ROOM)
    })
  })

  describe('goToTower', () => {
    it('goes to the tower', () => {
      location.goToTower()

      expect(location.place).to.equal(Location.PLACE.TOWER)
      expect(location.detail).to.be.instanceof(Location.TowerLocationDetail)
      expect(location.detail.floorId).to.equal('1')
      expect(location.detail.assetId).to.equal('entrance')
    })
  })
})
