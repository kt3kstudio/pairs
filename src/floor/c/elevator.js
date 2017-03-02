const { blockbody } = require('../../ui')
const { trigger } = require('../../util')
const { div, button } = require('dom-gen')

const { on, emit, component, wire } = capsid

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

const reAssetId = /(\d*)-.*/
const floorIdFromAssetId = assetId => {
  const match = assetId.match(reAssetId)

  if (!match) {
    return null
  }

  return match[1]
}

@component
class ElevatorInfo {

  __init__ () {
    this.$el.attr({
      m: 3,
      n: 5,
      bgcolor: 'indianred',
      'unit-dur': '250'
    })
    const ids = this.$el.attr('floor').split(/\s/)
    const contents = div({ addClass: 'elevator-info-contents' })

    ids.forEach(assetId => {
      const floorId = floorIdFromAssetId(assetId)
      contents.append(button(floorId).attr({
        'asset-id': assetId,
        'floor-id': floorId
      }))
    })

    this.$el.append(contents)
  }

  @on('click') onClick (e) {
    e.stopPropagation()
  }

  @on('click', { at: 'button' }) @emit.last('go-to-floor') onClickAtButton (e) {
    const el = e.target
    const assetId = el.getAttribute('asset-id')
    const floorId = el.getAttribute('floor-id')

    return { floorId, assetId }
  }
}

module.exports = Elevator
module.exports.ElevatorInfo = ElevatorInfo
