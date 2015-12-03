describe('GridWalker', function () {

    var walker, grid, elem

    beforeEach(function () {

        elem = $('<div />')

        walker = new domain.common.GridWalker(elem)

        grid = new domain.common.Grid({
            x: 100,
            y: 200,
            unitWidth: 300,
            unitHeight: 400,
            cellWidth: 500,
            cellHeight: 600
        })

        walker.setGrid(grid, 1, 2)

    })

    describe('setGrid', function () {

        it('sets the grid and grid positions', function () {

            walker.setGrid(grid, 5, 1)

            expect(walker.grid).to.equal(grid)
            expect(walker.m).to.equal(5)
            expect(walker.n).to.equal(1)

        })

    })

    describe('setGridPosition', function () {

        it('sets the grid position', function () {

            walker.setGridPosition(3, 4)

            expect(walker.m).to.equal(3)
            expect(walker.n).to.equal(4)

            walker.setGridPosition(0, 0)

            expect(walker.m).to.equal(0)
            expect(walker.n).to.equal(0)

        })

    })

    describe('fitToGrid', function () {

        it('fits the dimension to the grid', function () {

            walker.fitToGrid()

            expect(walker.dimension.width).to.equal(500)
            expect(walker.dimension.height).to.equal(500)

            expect(walker.x).to.equal(400)
            expect(walker.y).to.equal(1000)

        })

        it('respects cellRatio{X,Y}', function () {

            walker.cellRatioX = 0.5
            walker.cellRatioY = 0.5

            walker.fitToGrid()

            expect(walker.dimension.width).to.equal(250)
            expect(walker.dimension.height).to.equal(250)

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
