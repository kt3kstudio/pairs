describe('DimensionFactory', function () {
    'use strict'

    var factory

    before(function () {

        factory = new domain.level.DimensionFactory()

    })

    describe('fieldPosition', function () {

        it('returns the dimension for the field', function () {

            var dimension = factory.fieldPosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('evalRoomPosition', function () {

        it('returns the dimension for the evaluation place', function () {

            var dimension = factory.evalRoomPosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('queuePosition', function () {

        it('returns the dimension for the queue', function () {

            var dimension = factory.queuePosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('fusionBoxPosition', function () {

        it('returns the dimension for the fusion place', function () {

            var dimension = factory.fusionBoxPosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('paperPosition', function () {

        it('returns the dimension for the paper', function () {

            var dimension = factory.paperPosition()

            expect(dimension).to.be.instanceof(domain.level.Dimension)

        })

    })

    describe('resultPanePosition', function () {

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
