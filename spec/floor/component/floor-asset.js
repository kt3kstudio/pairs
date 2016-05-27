import FloorAsset from '../../../src/floor/component/floor-asset'

describe('FloorAsset', () => {
    'use strict'

    let floorAsset, $dom

    beforeEach(() => {

        $dom = $('<div x="200" y="300" id="abc" />')
        $dom.appendTo(document.body)

        floorAsset = new FloorAsset($dom)

    })

    afterEach(() => $dom.remove())

    describe('constructor', () => {

        it('gets w, h, x, y and id properties from the given dom', () => {

            expect(floorAsset.x).to.equal(200)
            expect(floorAsset.y).to.equal(300)
            expect(floorAsset.id).to.equal('abc')

        })

    })

    describe('doorKnock', () => {

        it('triggers `door-knock` event with the first argument itself', (done) => {

            floorAsset.elem.one('door-knock', (e, knocked) => {

                expect(knocked).to.equal(floorAsset)

                done()

            })

            floorAsset.doorKnock()

        })

    })

    describe('centerX', () => {

        it('returns the center x-axis coodinate', () => {

            expect(floorAsset.centerX()).to.equal(200)

        })

    })

    describe('centerY', () => {

        it('returns the center y-axis coodinate', () => {

            expect(floorAsset.centerY()).to.equal(250)

        })

    })

    describe('open', () => {

        it('returns an empty promise', () => {

            return floorAsset.open()

        })

    })

    describe('close', () => {

        it('returns an empty promise', () => {

            return floorAsset.close()

        })

    })

    describe('onGetWalker', () => {

        it('returns an empty promise', () => {

            return floorAsset.onGetWalker()

        })

    })

})
