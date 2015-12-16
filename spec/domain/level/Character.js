describe('domain.level.Character', function () {
    'use strict'

    beforeEach(function () {

        this.$dom = $('<span />')

        this.$dom.data('character', {id: 'ma'})

        this.character = new domain.level.Character(this.$dom)

        this.character.setGrid(new domain.common.Grid())

    })

    describe('willShow', function () {

        it('sets the display of the element inline', function () {

            this.character.willShow()

            expect(this.character.elem.css('display')).to.equal('inline')

        })

    })

    describe('didHide', function () {

        it('sets the display of the element none', function () {

            this.character.didHide()

            expect(this.character.elem.css('display')).to.equal('none')

        })

    })

})
