const getPropertyNames = require('get-property-names')
const {hr, div, button} = require('dom-gen')
const {component, on} = $.cc

const methodMask = ['constructor']

@component
class DebugPanel {
  constructor (elem) {
    if (elem.attr('auto-open') === 'true') {
      setTimeout(() => elem.find('.toggle').trigger('click'))
    }

    if (elem.attr('auto-reset') === 'true') {
      setTimeout(() => elem.find('.reset').trigger('click'))
    }
  }

  /**
   * The handler of toggle click.
   */
  @on('click').at('.toggle') click () {
    if (this.flag) {
      this.flag = false
      this.elem.css('top', -$(window).height() * 0.85 + 'px')
    } else {
      this.flag = true
      this.elem.css('top', '0')
    }
  }
}

module.exports = DebugPanel
