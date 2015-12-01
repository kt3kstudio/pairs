describe('GridWalker', function () {

    var walker, elem

    beforeEach(function () {

        elem = $('<div />')

        walker = new domain.common.GridWalker(elem)

        walker.setGrid(new domain.common.Grid({
            x: 100,
            y: 200,
            unitWidth: 300,
            unitHeight: 400,
            cellWidth: 500,
            cellHeight: 600
        }))

    })

    describe('setGrid', function () {

        it('sets the grid and grid positions', function () {

            var grid = new domain.common.Grid()

            walker.setGrid(grid, 1, 2)

            expect(walker.grid).to.equal(grid)
            expect(walker.m).to.equal(1)
            expect(walker.n).to.equal(2)

        })

    })

    describe('moveToM', function () {

        it('moves to the given horizontal grid position', function () {

            walker.moveToM(0)

            expect(walker.m).to.equal(0)
            expect(walker.x).to.equal(100)

            walker.moveToM(2)

            expect(walker.m).to.equal(2)
            expect(walker.x).to.equal(700)

            walker.moveToM(-2)

            expect(walker.m).to.equal(-2)
            expect(walker.x).to.equal(-500)

        })

    })

    describe('moveToN', function () {

        it('moves to the given vertical position', function () {

            walker.moveToN(0)

            expect(walker.n).to.equal(0)
            expect(walker.y).to.equal(200)

            walker.moveToN(1)

            expect(walker.n).to.equal(1)
            expect(walker.y).to.equal(600)

            walker.moveToN(-1)

            expect(walker.n).to.equal(-1)
            expect(walker.y).to.equal(-200)

        })

    })

})
