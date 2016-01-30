import Grid from '../../../src/domain/common/Grid'
import Character from '../../../src/domain/level/Character'

describe('Character', () => {
    'use strict'

    let elem, character

    beforeEach(() => {

        elem = $('<span />')

        elem.data('character', {id: 'ma'})

        character = new Character(elem)

        character.setGrid(new Grid())

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
