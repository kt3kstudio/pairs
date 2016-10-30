const { expect } = require('chai')
const Location = require('../../src/domain/location')

const factory = new Location.Factory()

describe('LocationFactory', () => {
  describe('createFromObject', () => {
    it('returns null if the object is null', () => {
      expect(factory.createFromObject(null)).to.be.null
    })

    it('returns null if the object does not have place prop', () => {
      expect(factory.createFromObject({})).to.be.null
    })

    it('creates a room location if the object has room type', () => {
      const location = factory.createFromObject({place: 'ROOM'})

      expect(location).to.be.instanceof(Location)
      expect(location.place).to.equal(Location.PLACE.ROOM)
    })

    it('creates a road location if the object has road type and correct detail', () => {
      const location = factory.createFromObject({
        place: 'ROAD',
        detail: {place: 'ROOM'}
      })

      expect(location).to.be.instanceof(Location)
      expect(location.place).to.equal(Location.PLACE.ROAD)
      expect(location.detail).to.be.instanceof(Location.RoadLocationDetail)
      expect(location.detail.place).to.equal(Location.PLACE.ROOM)
    })

    it('return null if the object has road type and incorrect detail', () => {
      expect(factory.createFromObject({place: 'ROAD'})).to.be.null
    })

    it('creates a tower location if the object has tower type and correct detail', () => {
      const location = factory.createFromObject({
        place: 'TOWER',
        detail: {floorId: '1', assetId: 'entrance'}
      })

      expect(location).to.be.instanceof(Location)
      expect(location.place).to.equal(Location.PLACE.TOWER)
      expect(location.detail).to.be.instanceof(Location.TowerLocationDetail)
      expect(location.detail.floorId).to.equal('1')
      expect(location.detail.assetId).to.equal('entrance')
    })

    it('returns null if the object has tower type and incorrect detail', () => {
      expect(factory.createFromObject({place: 'TOWER'})).to.be.null
    })
  })
})
