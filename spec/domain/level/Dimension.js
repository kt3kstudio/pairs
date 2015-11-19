describe('Dimension', function () {
  'use strict'

  describe('constructor', function () {
    it('sets the properties', function () {
      var dimension = new domain.level.Dimension({
        width: 1,
        height: 2,
        top: 3,
        left: 4,
        unit: 5
      })

      expect(dimension.width).to.equal(1)
      expect(dimension.height).to.equal(2)
      expect(dimension.top).to.equal(3)
      expect(dimension.left).to.equal(4)
      expect(dimension.unit).to.equal(5)
    })
  })
})
