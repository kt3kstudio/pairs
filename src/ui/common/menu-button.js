require('./menu-item')

const {wait} = require('spn')
const {img} = require('dom-gen')

const {on, component} = $.cc

const TRANS_DUR = 800
const R = 60 // radius of menu item arrangment

/**
 * Culculates item offsets of the given number
 *
 * @param {Object} offset The root position
 * @param {number} num The number of items
 * @return {Object[]}
 */
function itemOffsets (offset, num) {
  const result = []
  const gutter = Math.PI / 4 / num / num
  const urad = num > 1 ? (Math.PI / 2 - gutter * 2) / (num - 1) : 0

  const r = R * Math.sqrt(num)

  for (let i = 0; i < num; i++) {
    const rad = urad * i
    const cos = r * Math.cos(rad + gutter)
    const sin = r * Math.sin(rad + gutter)

    const res = {left: offset.left + cos, top: offset.top - sin}

    result.push(res)
  }

  return result
}

/**
 * MenuButton handles the behaviour of the menu button.
 */
@component('menu-button')
class MenuButton {

  constructor (elem) {
    this.elem = elem

    this.closed = true

    this.menus = this.getMenuItemSource().map(menu => this.createMenuItem(menu))
  }

  /**
   * Gets item source doms.
   *
   * @return {jQuery[]}
   */
  getMenuItemSource () {
    if (this.elem.data('menu')) {
      return this.elem.data('menu')
    }

    if (this.elem.attr('menu')) {
      return $('#' + this.elem.attr('menu')).children().toArray()
    }

    throw new Error('no menu')
  }

  /**
   * Sets the offset.
   *
   * @param {Number} offset.left The left offset
   * @param {Number} offset.top The top offset
   */
  setOffset (offset) {
    this.menus.forEach(menu => menu.setOffset(offset))
  }

  /**
   * Shows the menu button.
   *
   * @return {Promise}
   */
  show () {
    this.elem.removeClass('hidden')

    return wait(TRANS_DUR).then(() => this.setOffset(this.elem.offset()))
  }

  /**
   * Hides the menu button.
   *
   * @return {Promise}
   */
  hide () {
    return this.closeMenu()

    .then(() => wait(300))

    .then(() => {
      this.elem.addClass('hidden')

      return wait(TRANS_DUR)
    })
  }

  /**
   * Opens the menu.
   *
   * @return {Promise}
   */
  openMenu () {
    this.closed = false

    const toOffsets = itemOffsets(this.elem.offset(), this.menus.length)

    return Promise.all(this.menus.map((menu, i) => wait(50 * i).then(() => menu.show(toOffsets[i]))))
  }

  /**
   * Closes the menu.
   *
   * @return {Promise}
   */
  closeMenu (offset) {
    if (this.closed) {
      return Promise.resolve()
    }

    this.closed = true

    offset = offset || this.elem.offset()

    return Promise.all(this.menus.map(menu => menu.hide(offset)))
  }

  /**
   * Toggles the menu's open/close state.
   */
  @on('click')
  toggleMenu () {
    return this.closed ? this.openMenu() : this.closeMenu()
  }

  /**
   * Creates a menu item from menu source item.
   *
   * @private
   * @param {jQuery} menu
   */
  createMenuItem (menu) {
    menu = $(menu)

    return img({
      attr: {
        src: menu.attr('src')
      },
      addClass: 'hidden',
      insertBefore: this.elem,
      data: {
        menu: menu.children().toArray(),
        onclick: menu.attr('onclick')
      }
    }).cc.init('menu-item')
  }
}

module.exports = MenuButton
