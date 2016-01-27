import Rect from '../../../src/domain/common/Rect'
import Grid from '../../../src/domain/common/Grid'

describe('Rect', () => {

    var rect

    beforeEach(() => {

        rect = new Rect({
            top: 100,
            left: 300,
            right: 500,
            bottom: 600
        })

    })

    describe('width', () => {

        it('returns the width of the rect', () => {

            expect(rect.width()).to.equal(200)

        })

    })

    describe('height', () => {

        it('returns the height of the rect', () => {

            expect(rect.height()).to.equal(500)

        })

    })

    describe('subrect', () => {

        it('gets the fragment of the partition of the rect', () => {

            var subrect = rect.subrect({
                partition: [2, 5],
                get: [0, 2]
            })

            expect(subrect.top).to.equal(300)
            expect(subrect.right).to.equal(400)
            expect(subrect.bottom).to.equal(400)
            expect(subrect.left).to.equal(300)

        })

    })

    describe('cutTop', () => {

        it('cuts the top part of the given height', () => {

            const cut = rect.cutTop(100)

            expect(cut.top).to.equal(100)
            expect(cut.left).to.equal(300)
            expect(cut.right).to.equal(500)
            expect(cut.bottom).to.equal(200)

        })

    })

    describe('cutLeft', () => {

        it('cuts the left part of the given width', () => {

            const cut = rect.cutLeft(100)

            expect(cut.top).to.equal(100)
            expect(cut.left).to.equal(300)
            expect(cut.right).to.equal(400)
            expect(cut.bottom).to.equal(600)

        })

    })

    describe('cutRight', () => {

        it('cuts the right part of the given width', () => {

            const cut = rect.cutRight(100)

            expect(cut.top).to.equal(100)
            expect(cut.left).to.equal(400)
            expect(cut.right).to.equal(500)
            expect(cut.bottom).to.equal(600)

        })

    })

    describe('cutBottom', () => {

        it('cuts the bottom part of the given height', () => {

            const cut = rect.cutBottom(100)

            expect(cut.top).to.equal(500)
            expect(cut.left).to.equal(300)
            expect(cut.right).to.equal(500)
            expect(cut.bottom).to.equal(600)

        })

    })

    describe('toGrid', () => {

        it('returns a grid which has origin at the center of the rect', () => {

            const grid = rect.toGrid()

            expect(grid.x).to.equal(rect.centerX())
            expect(grid.y).to.equal(rect.centerY())

        })

        it('returns a grid which has unit width and height as the width and rect of the rect', () => {

            const grid = rect.toGrid()

            expect(grid.unitWidth).to.equal(rect.width())
            expect(grid.unitHeight).to.equal(rect.height())

        })

    })

    describe('dual', () => {

        it('returns a dual grid', () => {

            const dual = rect.dual()

            expect(dual).to.be.instanceof(Grid)
            expect(dual.x).to.equal(rect.centerX())
            expect(dual.y).to.equal(rect.centerY())
            expect(dual.unitWidth).to.equal(rect.width())
            expect(dual.unitHeight).to.equal(rect.height())

        })

        it('returns a dual grid and its dual is the same as the original', () => {

            const dualDual = rect.dual().dual()

            expect(dualDual).to.be.instanceof(Rect)
            expect(dualDual.top).to.equal(rect.top)
            expect(dualDual.left).to.equal(rect.left)
            expect(dualDual.right).to.equal(rect.right)
            expect(dualDual.bottom).to.equal(rect.bottom)

        })

    })

})
