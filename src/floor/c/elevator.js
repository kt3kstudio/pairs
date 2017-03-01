const { blockbody } = require('../../ui')
const { trigger } = require('../../util')
const { div, button } = require('dom-gen')

const { on, emit, init, component, wire } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Elevator {

  @wire('multiflip') get info () {}

  __init__ () {
    const floor = this.$el.attr('floor')
    const $el = div({ attr: { floor } }).cc('elevator-info')

    this.$el.append($el)

    $el.cc('multiflip')
  }

  block (rect) {
    return rect.slice({
      width: 110,
      height: 100,
      bottom: '35%',
      left: +this.$el.attr('x')
    })
  }

  open () {
    this.info.show()

    return Promise.resolve()
  }

  close () {
    this.info.hide()

    return Promise.resolve()
  }

  @on('click') onClick (e) {
    trigger(this.el, 'door-knock', { knocked: this })
  }
}

@component
class ElevatorInfo {

  __init__ () {
    this.$el.attr({
      m: 3,
      n: 5,
      bgcolor: 'indianred',
      'unit-dur': '250',
    })
    const floors = this.$el.attr('floor').split(/\s/)
    const contents = div({ addClass: 'elevator-info-contents' })

    floors.forEach(floor => {
      contents.append(button(floor).attr('floor-id', floor))
    })

    this.$el.append(contents)
  }

  @on('click') onClick (e) {
    e.stopPropagation()
  }

  @on('click', { at: 'button' }) @emit.last('go-to-floor') onClickAtButton (e) {
    const floorId = e.target.getAttribute('floor-id')
    const assetId = `e${floorId}` // TODO: do more clever thing

    return { floorId, assetId }
  }
}

module.exports = Elevator
