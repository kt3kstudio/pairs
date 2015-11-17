describe('CharPositionFactory', function () {
  'use strict'

  var factory = new datadomain.CharPositionFactory()

  describe('createStartPosition', function () {
    it('creates a charPosition of 701 at the floor 7', function () {
      var position = factory.createStartPosition()

      expect(position).to.be.instanceof(datadomain.CharPosition)

      expect(position.floorId).to.equal('7')
      expect(position.floorObjectId).to.equal('701')

    })

  })

  describe('createFromObject', function () {
    it('creates a charPosition according to the give object', function () {
      var position = factory.createFromObject({
        floorId: '8',
        floorObjectId: '802'
      })

      expect(position).to.be.instanceof(datadomain.CharPosition)

      expect(position.floorId).to.equal('8')
      expect(position.floorObjectId).to.equal('802')

    })

  })

})
