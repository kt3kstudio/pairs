require('../../../src/floor/component/door')

const {div} = require('dom-gen')

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

  describe('constructor', () => {
    it('sets level property', () => {
      expect(door.level).to.equal('701')
    })
  })

  describe('willShow', () => {
    it('sets up the dom', () => {
      door.willShow()

      expect($dom.find('.doorknob').length).to.equal(1)
      expect($dom.find('.door-body').length).to.equal(1)
      expect($dom.find('.door-info-content').length).to.equal(1)
      expect($dom.find('.door-info-content button').length).to.equal(1)
    })

    it('binds doorKnock to click events of .door-body when unlocked', (done) => {
      door.locked = false

      door.willShow()

      door.doorKnock = () => done()

      $dom.find('.door-body').trigger('click')
    })

    it('binds go-to-level to click events of `.door-info-content button`', (done) => {
      door.willShow()

      $dom.on('go-to-level', () => done())

      $dom.find('.door-info-content button').trigger('click')
    })
  })

  describe('open', () => {
    it('opens the door', () => {
      door.willShow()

      return door.open()

        .then(() => expect($dom.find('.door-body').hasClass('open')).to.be.true)
    })

    it('unbinds the click event on the .door-body', (done) => {
      door.willShow()

      $dom.on('door-knock', () => assert(false))

      return door.open().then(() => {
        $dom.find('.door-body').trigger('click')

        setTimeout(done, 300)
      })
    })
  })

  describe('close', () => {
    it('closes the door', () => {
      door.willShow()

      return door.open()

        .then(() => door.close())

        .then(() => expect($dom.find('.door-body').hasClass('open')).to.be.false)
    })

    it('binds doorKnock to click events of .door-body', (done) => {
      door.willShow()

      $dom.on('door-knock', () => done())

      return door.open()

        .then(() => door.close())

        .then(() => $dom.find('.door-body').trigger('click'))
    })
  })
})
