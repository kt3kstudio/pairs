


describe('datadomain', function () {
    'use strict';

    describe('CellFactory', function () {

        var factory = new datadomain.CellFactory();

        describe('createFromObject', function () {

            it('creates a cell from the object', function () {

                var cell = factory.createFromObject({
                    gene: 'f'
                });

                expect(cell).to.be.instanceof(datadomain.Cell);
                expect(cell.gene).to.equal('f');

            });

        });

    });

});
