const {wait} = require('spn')
const {component, on} = $.cc

/**
 * Emoji character component.
 */
@component('punch-emoji')
export default class PunchEmoji {
  /**
   * @param {jQuery} elem The jquery object
   */
  constructor (elem) {
    elem.css('opacity', 0)
  }

  @on('puncher.appended')
  onAppended () {
    wait(100).then(() => this.elem.css('opacity', 1))
  }
}
