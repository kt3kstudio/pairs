describe('datadomain', function () {
  'use strict'

  describe('LevelFactory', function () {
    it('exists', function () {
      expect(datadomain.LevelFactory).to.exist

    })

    var factory = new datadomain.LevelFactory()

    describe('createFromObject', function () {
      it('creates level from the object', function () {
        var level = factory.createFromObject({
          name: '709',
          goal: {
            type: 'X',
            opts: {}
          },
          cells: [{
            gene: 'f'
          }, {
            gene: 'm'
          }]

        })

        expect(level).to.be.instanceof(datadomain.Level)

      })

    })

  })

})
