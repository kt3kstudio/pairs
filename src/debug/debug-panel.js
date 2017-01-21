const {div} = require('dom-gen')
const {component, on} = $.cc

@component
class DebugPanel {
  __init__ () {
    const elem = this.$el

    elem.append(div({addClass: 'toggle'}, 'DEBUG'))

    if (elem.attr('auto-open') === 'true') {
      setTimeout(() => this.click())
    }

    $(document).on('keydown', (e) => {
      if (e.which === 27) {
        this.click()
      }
    })
  }

  /**
   * The handler of toggle click.
   */
  @on('click', { at: '.toggle' })
  @on('click', { at: 'h2' })
  onToggle () {
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
