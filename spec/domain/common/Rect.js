describe('domain.common.Rect', function () {

    var rect

    beforeEach(function () {

        rect = new domain.common.Rect({
            top: 100,
            right: 500,
            bottom: 600,
            left: 300
        })

    })

    describe('', function () {

        it('returns the width of the rect', function () {

            expect(rect.width()).to.equal(200)

        })

    })

    describe('height', function () {

        it('returns the height of the rect', function () {

            expect(rect.height()).to.equal(500)

        })

    })

})
