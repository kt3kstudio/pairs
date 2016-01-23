import Grid from '../../../src/domain/common/Grid'

describe('Grid', function () {
    'use strict'

    var grid

    beforeEach(function () {

        grid = new Grid({

            x: 100,
            y: 200,
            unitWidth: 100,
            unitHeight: 100,
            cellWidth: 50,
            cellHeight: 50

        })

    })

    describe('getX', function () {

        it('gets the x position of the given grid x position', function () {

            expect(grid.getX(-2)).to.equal(-100)
            expect(grid.getX(-1)).to.equal(0)
            expect(grid.getX(0)).to.equal(100)
            expect(grid.getX(1)).to.equal(200)
            expect(grid.getX(2)).to.equal(300)
            expect(grid.getX(3)).to.equal(400)

        })

    })

    describe('getY', function () {

        it('gets the y position of the given grid x position', function () {

            expect(grid.getY(-2)).to.equal(0)
            expect(grid.getY(-1)).to.equal(100)
            expect(grid.getY(0)).to.equal(200)
            expect(grid.getY(1)).to.equal(300)
            expect(grid.getY(2)).to.equal(400)
            expect(grid.getY(3)).to.equal(500)

        })

    })

    describe('shift', function () {

        it('returns the shifted grid', function () {

            expect(grid.shift(1, 2).getX(0)).to.equal(grid.getX(1))
            expect(grid.shift(1, 2).getX(1)).to.equal(grid.getX(2))
            expect(grid.shift(1, 2).getY(0)).to.equal(grid.getY(2))
            expect(grid.shift(1, 2).getY(1)).to.equal(grid.getY(3))

        })

    })

})
