import {Rect} from 'spn'
import Body from '../../../src/domain/common/body'

describe('Body', () => {
    'use strict'

    let elem, body

    beforeEach(() => {

        elem = $('<div />')

        body = new Body(elem)

        body.x = 30
        body.y = 40
        body.posture.width = 10
        body.posture.height = 20

    })

    describe('willShow', function () {

        it('sets up the element dimensions', function () {

            body.willShow()

            expect(body.elem.width()).to.equal(10)
            expect(body.elem.height()).to.equal(20)
            expect(body.elem.css('left')).to.equal('30px')
            expect(body.elem.css('top')).to.equal('40px')

        })

        it('sets the elem position as absolute', function () {

            body.willShow()
            expect(body.elem.css('position')).to.equal('absolute')

        })

    })

    describe('rightLimit', function () {

        it('returns the right limit x position', function () {

            expect(body.rightLimit()).to.equal(40)

        })

    })

    describe('leftLimit', function () {

        it('returns the left limit x position', function () {

            expect(body.leftLimit()).to.equal(30)

        })

    })

    describe('topLimit', function () {

        it('returns the top limit y position', function () {

            expect(body.topLimit()).to.equal(40)

        })

    })

    describe('bottomLimit', function () {

        it('returns the bottom limit y position', function () {

            expect(body.bottomLimit()).to.equal(60)

        })

    })

    describe('moveToX', function () {

        it('it moves the sprite offset to specified x', function () {

            body.moveToX(50)

            expect(body.x).to.equal(50)
            expect(body.y).to.equal(40)
            expect(body.elem.css('left')).to.equal('50px')
            expect(body.elem.css('top')).to.equal('40px')

        })

    })

    describe('moveToY', function () {

        it('it moves the sprite offset to specified x', function () {

            body.moveToY(50)

            expect(body.x).to.equal(30)
            expect(body.y).to.equal(50)
            expect(body.elem.css('left')).to.equal('30px')
            expect(body.elem.css('top')).to.equal('50px')

        })

    })

    describe('setRect', function () {

        it('it sets the rect', function () {

            const rect = new Rect({
                top: 0, right: 10, bottom: 40, left: 20
            })

            body.setRect(rect)

            expect(body.posture.width).to.equal(rect.width())
            expect(body.posture.height).to.equal(rect.height())

        })

        it('updates x, y and the dimension', function () {

            var rect = new Rect({
                top: 0, right: 10, bottom: 40, left: 20
            })

            body.setRect(rect)

            expect(body.topLimit()).to.equal(rect.top)
            expect(body.rightLimit()).to.equal(rect.right)
            expect(body.bottomLimit()).to.equal(rect.bottom)
            expect(body.leftLimit()).to.equal(rect.left)

        })

    })

})
