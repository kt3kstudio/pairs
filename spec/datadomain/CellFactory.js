describe('datadomain', function () {
  'use strict'

  describe('CellFactory', function () {
    var factory = new datadomain.CellFactory()

    describe('createFromObject', function () {
      it('creates a cell from the object', function () {
        var cell = factory.createFromObject({
          gene: 'f'
        })

        expect(cell).to.be.instanceof(datadomain.Cell)
        expect(cell.gene).to.equal('f')

      })

    })

    describe('createCollectionFromArray', function () {
      it('creates a collection from the array', function () {
        var cells = factory.createCollectionFromArray([{
          gene: 'f'
        }, {
          gene: 'm'
        }])

        expect(cells).to.be.instanceof(datadomain.CellCollection)
        expect(cells.cells).to.be.instanceof(window.Array)

        cells.cells.forEach(function (cell) {
          expect(cell).to.be.instanceof(datadomain.Cell)

        })

      })

    })

  })

})
