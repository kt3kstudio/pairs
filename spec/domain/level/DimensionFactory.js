describe('DimensionFactory', function () {
    'use strict'

    var factory

    before(function () {

        factory = new domain.level.DimensionFactory()

    })

    describe('fieldRect', function () {

        it('returns the rect for the field', function () {

            var dimension = factory.fieldRect()

            expect(dimension).to.be.instanceof(domain.common.Rect)

        })

    })

    describe('evalRoomGrid', function () {

        it('returns the grid for the evaluation place', function () {

            var dimension = factory.evalRoomGrid()

            expect(dimension).to.be.instanceof(domain.common.Grid)

        })

    })

    describe('queueGrid', function () {

        it('returns the grid for the queue', function () {

            var dimension = factory.queueGrid()

            expect(dimension).to.be.instanceof(domain.common.Grid)

        })

    })

    describe('fusionBoxGrid', function () {

        it('returns the grid for the fusion place', function () {

            var dimension = factory.fusionBoxGrid()

            expect(dimension).to.be.instanceof(domain.common.Grid)

        })

    })

    describe('paperPosition', function () {

        it('returns the dimension for the paper', function () {

            var dimension = factory.paperPosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('resultPaneRect', function () {

        it('returns a rect for the result pane', function () {

            var dimension = factory.resultPaneRect()

            expect(dimension).to.be.instanceof(domain.common.Rect)

        })

    })

    describe('scoreboardRect', function () {

        it('returns the rect for the scoreboard', function () {

            var dimension = factory.scoreboardRect()

            expect(dimension).to.be.instanceof(domain.common.Rect)

        })

    })

})
