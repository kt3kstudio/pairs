require('../../../src/floor/component/staircase')

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

    it('binds to click event', function (done) {
      staircase.willShow()

      staircase.elem.on('click', function () {
        done()
      })

      staircase.elem.trigger('click')
    })
  })

  describe('onGetWalker', () => {
    it('triggers the character-goto event', (done) => {
      staircase.elem.on('character-goto', () => {
        done()
      })

      staircase.onGetWalker()
    })
  })
})
