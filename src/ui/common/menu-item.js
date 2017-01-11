const {wait} = require('spn')

const {on, component} = $.cc

/**
 * MenuItem handles the behaviour of items of the menu.
 */
@component('menu-item')
class MenuItem {
  __init__ (elem) {
    const menu = this.elem.data('menu')

    if (menu && menu.length) {
      this.elem.cc('menu-button')
    }
  }

  /**
   * Invokes custom onclick handler.
   */
  @on('click')
  handleOnClick () {
    const onclick = this.elem.data('onclick')

    if (typeof onclick !== 'string' || onclick === '') {
      return
    }

    window.eval(onclick) // eslint-disable-line
  }

  /**
   * Shows the element moving towards the given offset
   *
   * @param {Object} to The offset to goes to.
   * @return {Promise}
   */
  show (to) {
    this.elem.removeClass('hidden')

    this.setOffset(to)

    return Promise.resolve()
  }

  /**
   * Sets the offset of the element
   *
   * @private
   * @param {Object} offset
   */
  setOffset (offset) {
    this.elem.offset(offset)

    if (this.elem.hasClass('menu-button')) {
      this.elem.cc.get('menu-button').setOffset(offset)
    }
  }

  /**
   * Hides the menu item.
   *
   * @param {Object} offset The offset to hides
   * @return {Promise}
   */
  hide (offset) {
    this.elem.addClass('hidden')

    this.setOffset(offset)

    let p = wait(50)

    // Hides child menus if exist
    if (this.elem.hasClass('menu-button')) {
      p = p.then(() => this.elem.cc.get('menu-button').closeMenu(offset))
    }

    return p
  }
}

module.exports = MenuItem
