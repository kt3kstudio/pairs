const FloorAsset = require('../floor-asset')

const { div } = require('dom-gen')

describe('FloorAsset', () => {
  'use strict'

  let floorAsset, elem

  before(() => {
    capsid.def('floor-asset', FloorAsset)
  })

  beforeEach(() => {
    elem = div({attr: {x: '200', y: '300', id: 'abc'}}).appendTo(document.body)

    floorAsset = elem.cc.init('floor-asset')
  })

  afterEach(() => elem.remove())

  describe('constructor', () => {
    it('gets x and y properties from the given dom', () => {
      expect(floorAsset.x).to.equal(200)
      expect(floorAsset.y).to.equal(300)
    })
  })

  describe('doorKnock', () => {
    it('triggers `door-knock` event with the first argument itself', (done) => {
      floorAsset.elem.one('door-knock', (e) => {
        expect(e.detail.knocked).to.equal(floorAsset)

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
})
