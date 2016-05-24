describe('MenuButton', () => {
    'use strict'

    let elem, menuBtn

    beforeEach(() => {
        $('body').empty()

        $('<menus id="test-menu"><menu src="" /><menu src="" ><menu /><menu /></menu></menus>').appendTo('body')

        elem = $('<img menu="test-menu" class="hidden" />')

        menuBtn = elem.cc.init('menu-button')
    })

    it('initialize with corresponding id dom element', () => {
        expect(menuBtn.menus).to.have.length(2)
    })

    describe('show', () => {
        it('shows the menu button', () => {
            return menuBtn.show().then(() => {
                expect(elem.hasClass('hidden')).to.be.false
            })
        })
    })

    describe('hide', () => {
        it('hides the menu button', () => {
            return menuBtn.show().then(() => {
                return menuBtn.hide()
            }).then(() => {
                expect(elem.hasClass('hidden')).to.be.true
            })
        })
    })

    describe('openMenu', () => {
        it('opens the menu', () => {
            return menuBtn.show().then(() => {
                return menuBtn.openMenu()
            }).then(() => {
                expect(menuBtn.closed).to.be.false
            })
        })
    })

    describe('closeMenu', () => {
        it('closes the menu', () => {
            return menuBtn.show().then(() => {
                return menuBtn.openMenu()
            }).then(() => {
                return menuBtn.closeMenu()
            }).then(() => {
                expect(menuBtn.closed).to.be.true
            })
        })
    })
})
