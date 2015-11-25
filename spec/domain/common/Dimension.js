describe('domain.common.Dimension', function () {
    'use strict'

    var dim

    beforeEach(function () {
        dim = new domain.common.Dimension({
            width: 100,
            height: 200,
            ratioX: 0.5,
            ratioY: 0.75,
            marginX: 5,
            marginY: 10
        })
    })

    it('gets width, height, originX, originY, marginX and marginY props from param obj', function () {
        expect(dim.width).to.equal(100)
        expect(dim.height).to.equal(200)
        expect(dim.ratioX).to.equal(0.5)
        expect(dim.ratioY).to.equal(0.75)
        expect(dim.marginX).to.equal(5)
        expect(dim.marginY).to.equal(10)
    })

    describe('actualHeight', function () {
        it('returns the actual height', function () {
            expect(dim.actualHeight()).to.equal(180)
        })
    })

    describe('actualWidth', function () {
        it('returns the actual width', function () {
            expect(dim.actualWidth()).to.equal(90)
        })
    })

    describe('topLimit', function () {
        it('returns the top limit', function () {
            expect(dim.topLimit(0)).to.equal(-140)
            expect(dim.topLimit(100)).to.equal(-40)
            expect(dim.topLimit(200)).to.equal(60)
            expect(dim.topLimit(300)).to.equal(160)
        })
    })

    describe('bottomLimit', function () {
        it('returns the bottom limit', function () {
            expect(dim.bottomLimit(0)).to.equal(40)
            expect(dim.bottomLimit(100)).to.equal(140)
            expect(dim.bottomLimit(200)).to.equal(240)
            expect(dim.bottomLimit(300)).to.equal(340)
        })
    })

    describe('leftLimit', function () {
        it('returns the left limit', function () {
            expect(dim.leftLimit(0)).to.equal(-45)
            expect(dim.leftLimit(100)).to.equal(55)
            expect(dim.leftLimit(200)).to.equal(155)
            expect(dim.leftLimit(300)).to.equal(255)
        })
    })

    describe('rightLimit', function () {
        it('returns the right limit', function () {
            expect(dim.rightLimit(0)).to.equal(45)
            expect(dim.rightLimit(100)).to.equal(145)
            expect(dim.rightLimit(200)).to.equal(245)
            expect(dim.rightLimit(300)).to.equal(345)
        })
    })

    describe('centerX', function () {
        it('returns the horizontal center', function () {
            expect(dim.centerX(0)).to.equal(0)
            expect(dim.centerX(100)).to.equal(100)
            expect(dim.centerX(200)).to.equal(200)
            expect(dim.centerX(300)).to.equal(300)
        })
    })

    describe('centerY', function () {
        it('returns the vertical center', function () {
            expect(dim.centerY(0)).to.equal(-50)
            expect(dim.centerY(100)).to.equal(50)
            expect(dim.centerY(200)).to.equal(150)
            expect(dim.centerY(300)).to.equal(250)
        })
    })
})