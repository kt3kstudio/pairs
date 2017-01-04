const sprite = require('../../ui/sprite')
const {speaker} = require('../../ui/screenplay/speaker')
const {Body, ratio} = require('spn')

@sprite.static
@sprite.relativeBody
@speaker
@ratio.x(0.5)
@ratio.y(1)
class Resident extends Body {

  constructor (elem) {
    super()

    this.initSprite()
    this.setSpeaker(elem)

    const [x, y] = elem.attr('xy').split(/\s+/)

    this.relX = x / 100
    this.relY = y / 100
    this.relW = 1 / 8
    this.relH = 1 / 8
  }

  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  willHide () {
    this.elem.css('opacity', 0)
  }
}

module.exports = Resident
