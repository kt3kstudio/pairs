describe('MenuButton', function () {
  'use strict'

  var elem, menuBtn

  beforeEach(function () {
    $('body').empty()

    $('<menus id="test-menu"><menu src="" /><menu src="" ><menu /><menu /></menu></menus>').appendTo('body')

    elem = $('<img menu="test-menu" class="hidden" />')

    menuBtn = elem.cc.init('menu-button')
  })

  it('initialize with corresponding id dom element', function () {
    expect(menuBtn.menus).to.have.length(2)
  })

  describe('show', function () {
    it('shows the menu button', function () {
      return menuBtn.show().then(function () {
        expect(elem.hasClass('hidden')).to.be.false
      })
    })
  })

  describe('hide', function () {
    it('hides the menu button', function () {
      return menuBtn.show().then(function () {
        return menuBtn.hide()
      }).then(function () {
        expect(elem.hasClass('hidden')).to.be.true
      })
    })
  })

  describe('openMenu', function () {
    it('opens the menu', function () {
      return menuBtn.show().then(function () {
        return menuBtn.openMenu()
      }).then(function () {
        expect(menuBtn.closed).to.be.false
      })
    })
  })

  describe('closeMenu', function () {
    it('closes the menu', function () {
      return menuBtn.show().then(function () {
        return menuBtn.openMenu()
      }).then(function () {
        return menuBtn.closeMenu()
      }).then(function () {
        expect(menuBtn.closed).to.be.true
      })
    })
  })
})
