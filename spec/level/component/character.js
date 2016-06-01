const {Grid} = require('spn')
require('../../../src/level/component/character')

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

        it('sets the display of the element inline', () => {

            character.willShow()

            expect(character.elem.css('display')).to.equal('inline')

        })

    })

    describe('didHide', () => {

        it('sets the display of the element none', () => {

            character.didHide()

            expect(character.elem.css('display')).to.equal('none')

        })

    })

})
