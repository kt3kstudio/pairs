require('../door')

const { div } = require('dom-gen')

describe('Door', () => {
  'use strict'

  let door, $dom

  beforeEach(() => {
    $dom = div({attr: {w: 100, h: 90, x: 200, y: 300, level: 701, id: 701}}).appendTo(document.body)

    door = $dom.cc.init('door')
  })

  afterEach(() => {
    $dom.remove()
  })

  describe('__init__', () => {
    it('sets level property', () => {
      expect(door.level).to.equal('701')
    })

    it('sets up the dom', () => {
      expect($dom.find('.doorknob').length).to.equal(1)
      expect($dom.find('.door-body').length).to.equal(1)
      expect($dom.find('.door-info-content').length).to.equal(1)
      expect($dom.find('.door-info-content button').length).to.equal(1)
    })
  })

  describe('open', () => {
    it('opens the door', () => {
      door.willShow()

      return door.open()

        .then(() => expect($dom.hasClass('door-open')).to.be.true)
    })
  })

  describe('close', () => {
    it('closes the door', () => {
      door.willShow()

      return door.open()

        .then(() => door.close())

        .then(() => expect($dom.find('.door-body').hasClass('open')).to.be.false)
    })
  })
})
