const { DIRS, body, blockbody, sprite } = require('../../ui')
const { trigger } = require('../../util')
const { div, img } = require('dom-gen')
const { emits, on, wire } = capsid

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

  @on('click') @emits('door-knock') onClick () {
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

  @on('get-walker') onGetWalker () {
    this.person.jump()
      .then(() => trigger(this.el, 'screenplay', { name: 'give-701-key' }))
  }

}

@sprite.static(`${BASEPATH}/img/female.svg`)
@body({ width: 60, height: 80, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class InformationPerson {

  __init__ () {
    this.el.setAttribute('id', 'zero')
  }

  @on('showing') onShowing () {
    this.updateSprite()
  }

  jump () {
    return this.$el.anim('jump', 300).then(() => this.$el.anim('', 0))
  }
}

module.exports = Information
module.exports.InformationPerson = InformationPerson
