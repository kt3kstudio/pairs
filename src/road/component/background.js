const { block } = require('../../ui')
const { component } = capsid
const { Rect } = require('spn')

@block
@component
class Background {
  block () {
    return Rect.fromElement(this.el)
  }
}

module.exports = Background
