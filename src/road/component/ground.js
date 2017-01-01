const { Being, wait } = require('spn')
const { component } = $.cc

const DUR = 500

@component
class Ground extends Being {
  willShow () {
    this.elem.css('transform', 'scale(1, 1)')

    return wait(DUR)
  }

  willHide () {
    this.elem.css('transform', 'scale(1, 0)')

    return wait(DUR)
  }
}

module.exports = Ground
