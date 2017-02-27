const { wait, animation } = require('spn')
const { div, hr, br, p, small, button } = require('dom-gen')

const FloorAsset = require('./floor-asset')

const { component, init, on, emit, wire } = capsid
const DOOR_APPEAR_DUR = 400

/**
 * Door class handles behaviour of the level's doors.
 */
@component
@animation.show('door-appear', DOOR_APPEAR_DUR)
@animation.hide('door-disappear', DOOR_APPEAR_DUR)
class Door extends FloorAsset {

  @wire get multiflip () {}

  __init__ () {
    super.__init__()

    this.level = this.el.getAttribute('level')
    this.score = 0

    this.doorActionDur = 400

    this.locked = true

    this.$el.append(
      div({addClass: 'door-body'},
        div({addClass: 'door-front'}, this.el.id),
        div({addClass: 'doorknob'}, '●')
      ),

      div({
        addClass: 'door-info',
        attr: { m: 3, n: 5, bgcolor: '#393F44' }
      },
        div({addClass: 'door-info-content'},
          p(this.el.id),
          hr(),
          p(small('♛ Best ♛'), br(), this.score),
          hr(),
          button('▶')
        )
      )
    )

    init('multiflip', this.el.querySelector('.door-info'))
  }

  @on('click', { at: 'button' }) @emit('go-to-level') onButtonClick (e) {}

  /**
   * Constructs the contents of the door. (Maybe not a good thing to do here)
   */
  willShow () {
    super.willShow()

    if (this.locked) {
      return this.spawnFrog()
    }
  }

  /**
   * Opens the door.
   */
  open () {
    this.multiflip.show()

    this.el.classList.add('door-open')

    this.removeFrog()

    return wait(this.doorActionDur)
  }

  /**
   * Closes the door.
   */
  close () {
    this.multiflip.hide()

    this.el.classList.remove('door-open')

    return wait(this.doorActionDur)
  }

  @on('click', { at: ':not(.door-open) .door-body' }) @emit.last('door-knock') onClosedDoorBodyClick () {
    return { knocked: this }
  }

  /**
   * Unlocks the door.
   */
  @on('unlock') unlock () {
    super.unlock()
  }
}

module.exports = Door
