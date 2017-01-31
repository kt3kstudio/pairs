const { block } = require('../../ui')

@block
class Background {
  block () {
    const top = this.el.offsetTop
    const left = this.el.offsetLeft
    const right = left + this.el.offsetWidth
    const bottom = top + this.el.offsetHeight

    return new Rect({ top, left, right, bottom })
  }
}

module.exports = Background
