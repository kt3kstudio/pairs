require('../screenplay')

const { expect } = require('chai')
const { script } = require('dom-gen')

describe('screenplay', () => {
  let elem, sm

  beforeEach(() => {
    elem = script `
      [#moo0] Hey!
      [#moo1] Hi!
      [#moo2] Yay!
    `.attr('type', 'scenarioscript')

    sm = elem.cc.init('screenplay')

    $('body').append(
      $('<div id="moo0" />'),
      $('<div id="moo1" />'),
      $('<div id="moo2" />')
    )
  })

  afterEach(() => {
    $('#moo0').remove()
    $('#moo1').remove()
    $('#moo2').remove()
  })

  it('stores the parsed screenplay-lines', () => {
    expect(sm.lines.length).to.equal(3)
    expect(sm.lines[0].selector).to.equal('#moo0')
    expect(sm.lines[0].line).to.equal('Hey!')
    expect(sm.lines[1].selector).to.equal('#moo1')
    expect(sm.lines[1].line).to.equal('Hi!')
    expect(sm.lines[2].selector).to.equal('#moo2')
    expect(sm.lines[2].line).to.equal('Yay!')
  })

  describe('actorsReady', () => {
    it('returns true when all the actors are ready', () => {
      expect(sm.actorsReady()).to.be.true
    })
  })

  describe('start', () => {
    it('starts the screenplay', done => {
      let linesCalled0 = false
      let linesCalled1 = false
      let linesCalled2 = false

      sm.lines[0].play = () => { linesCalled0 = true }
      sm.lines[1].play = () => { linesCalled1 = true }
      sm.lines[2].play = () => { linesCalled2 = true }

      sm.play({}).then(() => {
        expect(linesCalled0).to.be.true
        expect(linesCalled1).to.be.true
        expect(linesCalled2).to.be.true
        done()
      }).catch(done)
    })
  })
})
