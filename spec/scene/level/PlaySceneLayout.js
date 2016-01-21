import Rect from '../../../src/domain/common/Rect'
import Grid from '../../../src/domain/common/Grid'
import PlaySceneLayout from '../../../src/scene/level/PlaySceneLayout'

describe('PlaySceneLayout', function () {
    'use strict'

    var factory

    before(function () {

        factory = new PlaySceneLayout()

    })

    describe('fieldRect', function () {

        it('returns the rect for the field', function () {

            var dimension = factory.fieldRect()

            expect(dimension).to.be.instanceof(Rect)

        })

    })

    describe('evalRoomGrid', function () {

        it('returns the grid for the evaluation place', function () {

            var dimension = factory.evalRoomGrid()

            expect(dimension).to.be.instanceof(Grid)

        })

    })

    describe('queueGrid', function () {

        it('returns the grid for the queue', function () {

            var dimension = factory.queueGrid()

            expect(dimension).to.be.instanceof(Grid)

        })

    })

    describe('fusionBoxGrid', function () {

        it('returns the grid for the fusion place', function () {

            var dimension = factory.fusionBoxGrid()

            expect(dimension).to.be.instanceof(Grid)

        })

    })

    describe('resultPaneRect', function () {

        it('returns a rect for the result pane', function () {

            var dimension = factory.resultPaneRect()

            expect(dimension).to.be.instanceof(Rect)

        })

    })

    describe('scoreboardRect', function () {

        it('returns the rect for the scoreboard', function () {

            var dimension = factory.scoreboardRect()

            expect(dimension).to.be.instanceof(Rect)

        })

    })

})
