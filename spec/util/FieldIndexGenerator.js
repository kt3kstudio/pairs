describe('FieldIndexGenerator', function () {
  'use strict'

  describe('generate', function () {
    it('generates the list of indices', function () {
      var fig = new util.FieldIndexGenerator()

      var list = fig.generate(7)

      expect(list).to.be.instanceof(Array)
      expect(list).to.deep.equal([
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1],
        [1, 0],
        [2, 0]
      ])

    })

    it('generates the list of indices which doesn\'t contain used items', function () {
      var fig = new util.FieldIndexGenerator()

      var list = fig.generate(7, [[0, 0], [1, 0], [2, 0]])

      expect(list).to.deep.equal([
        // [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1],
        // [1, 0],
        // [2, 0],
        [2, 1],
        [2, 2],
        [3, 2]
      ])

    })

  })

})
