import {Rect} from 'spn'
import DimensionalBeing from '../../../src/domain/common/DimensionalBeing'

describe('DimensionalBeing', function () {
    'use strict'

    var elem = null
    var dim = null

    beforeEach(function () {

        elem = $('<div />')

        dim = new DimensionalBeing(elem)

        dim.x = 30
        dim.y = 40
        dim.posture.width = 10
        dim.posture.height = 20

    })

    describe('willShow', function () {

        it('sets up the element dimensions', function () {

            dim.willShow()

            expect(dim.elem.width()).to.equal(10)
            expect(dim.elem.height()).to.equal(20)
            expect(dim.elem.css('left')).to.equal('30px')
            expect(dim.elem.css('top')).to.equal('40px')

        })

        it('sets the elem position as absolute', function () {

            dim.willShow()
            expect(dim.elem.css('position')).to.equal('absolute')

        })

    })

    describe('rightLimit', function () {

        it('returns the right limit x position', function () {

            expect(dim.rightLimit()).to.equal(40)

        })

    })

    describe('leftLimit', function () {

        it('returns the left limit x position', function () {

            expect(dim.leftLimit()).to.equal(30)

        })

    })

    describe('topLimit', function () {

        it('returns the top limit y position', function () {

            expect(dim.topLimit()).to.equal(40)

        })

    })

    describe('bottomLimit', function () {

        it('returns the bottom limit y position', function () {

            expect(dim.bottomLimit()).to.equal(60)

        })

    })

    describe('moveToX', function () {

        it('it moves the sprite offset to specified x', function () {

            dim.moveToX(50)

            expect(dim.x).to.equal(50)
            expect(dim.y).to.equal(40)
            expect(dim.elem.css('left')).to.equal('50px')
            expect(dim.elem.css('top')).to.equal('40px')

        })

    })

    describe('moveToY', function () {

        it('it moves the sprite offset to specified x', function () {

            dim.moveToY(50)

            expect(dim.x).to.equal(30)
            expect(dim.y).to.equal(50)
            expect(dim.elem.css('left')).to.equal('30px')
            expect(dim.elem.css('top')).to.equal('50px')

        })

    })

    describe('setRect', function () {

        it('it sets the rect', function () {

            var rect = new Rect({
                top: 0, right: 10, bottom: 40, left: 20
            })

            dim.setRect(rect)

            expect(dim.rect).to.equal(rect)

        })

        it('updates x, y and the dimension', function () {

            var rect = new Rect({
                top: 0, right: 10, bottom: 40, left: 20
            })

            dim.setRect(rect)

            expect(dim.topLimit()).to.equal(rect.top)
            expect(dim.rightLimit()).to.equal(rect.right)
            expect(dim.bottomLimit()).to.equal(rect.bottom)
            expect(dim.leftLimit()).to.equal(rect.left)

        })

    })

})
