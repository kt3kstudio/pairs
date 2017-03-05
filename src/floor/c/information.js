const { DIRS, body, blockbody, sprite } = require('../../ui')
const { div, img } = require('dom-gen')
const { emit, on, wire } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Information {

  @wire('information-person') get person () {}

  __init__ () {
    this.$el.append(
      img().cc('information-person'),
      div().addClass('information-table')
    )
  }

  block (rect) {
    return rect.slice({
      bottom: '35%',
      left: +this.el.getAttribute('x'),
      height: 35,
      width: 170
    })
  }

  @on('shown') onShown () {
    this.person.show()
  }

  willHide () {
    return this.person.hide()
  }

  @on('click', { at: '.information-person' }) onClickAtPerson (e) {
    $(e.target).anim('jump', 300).then(() => $(e.target).anim('', 0))
  }

  @on('click') @emit.last('door-knock') onClick () {
    return { knocked: this }
  }

  open () {
    return Promise.resolve()
  }

  getAcceptPoint () {
    return this.getPoint().down(40)
  }

  getAcceptDir () {
    return DIRS.UP
  }

}

@sprite.static(`${BASEPATH}/img/female.svg`)
@body({ width: 60, height: 80, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class InformationPerson {
  @on('showing') onShowing () {
    this.updateSprite()
  }
}

module.exports = Information
module.exports.InformationPerson = InformationPerson
