const { Grid } = require('spn')

require('../character')

describe('Character', () => {
  'use strict'

  let elem, character

  beforeEach(() => {
    elem = $('<span />')

    elem.data('character', {id: 'ma'})

    character = elem.cc.init('hero')

    character.setGrid(new Grid({x: 0, y: 0}))
  })

  describe('willShow', () => {
  })

  describe('didHide', () => {
  })
})
