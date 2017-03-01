require('../staircase')

describe('Staircase', () => {
  'use strict'

  let $dom, staircase

  beforeEach(() => {
    $dom = $('<div data-goto=\'{"floorId": "abc", "floorObjectId": "def"}\' />')
    staircase = $dom.cc.init('staircase')
  })

  describe('constructor', () => {
    it('sets the goto property', () => {
      expect(staircase.goto).to.eql({
        floorId: 'abc',
        floorObjectId: 'def'
      })
    })
  })

  describe('willShow', () => {
    it('sets up the dom', () => {
      staircase.willShow()

      // TODO: some assertion
    })

    it('binds to click event', done => {
      staircase.willShow()

      staircase.elem.on('click', () => done())

      staircase.elem.trigger('click')
    })
  })

  describe('onGetWalker', () => {
    it('triggers the go-to-floor event', done => {
      staircase.elem.on('go-to-floor', () => {
        done()
      })

      staircase.onGetWalker()
    })
  })
})
