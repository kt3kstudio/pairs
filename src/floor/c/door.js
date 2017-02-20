const { wait, animation: { show, hide } } = require('spn')
const domGen = require('dom-gen')
const { div, hr, br, p, small } = domGen

const FloorAsset = require('./floor-asset')
const { trigger } = require('../../util')

const button = domGen('button')

const { component, on, emit } = capsid
const DOOR_APPEAR_DUR = 400

/**
 * Door class handles behaviour of the level's doors.
 */
@component
@show('door-appear', DOOR_APPEAR_DUR)
@hide('door-disappear', DOOR_APPEAR_DUR)
class Door extends FloorAsset {

  __init__ () {
    super.__init__()

    this.level = this.$el.attr('level')
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
        attr: { m: 3, n: 5, bgcolor: '#393F44' },
        css: { width: 150, height: 150, top: -200, left: -40 }
      },
        div({addClass: 'door-info-content'},
          p(this.el.id),
          hr(),
          p(small('♛ Best ♛'), br(), this.score),
          hr(),
          button('▶')
        )
      ).cc('multiflip')
    )

    this.doorBody = this.$el.find('.door-body')
    this.informationPanel = this.$el.find('.door-info').cc.get('multiflip')
  }

  @on('click', { at: 'button' }) @emit('go-to-level') onButtonClick (e) {}

  /**
   * Constructs the contents of the door. (Maybe not a good thing to do here)
   */
  willShow () {
    super.willShow()

    if (!this.locked) {
      this.enableDoorKnock()
    } else {
      return this.spawnFrog()
    }
  }

  /**
   * Opens the door.
   */
  open () {
    this.informationPanel.show()

    this.doorBody.addClass('open')

    this.removeFrog()

    this.disableDoorKnock()

    return wait(this.doorActionDur)
  }

  /**
   * Closes the door.
   */
  close () {
    this.informationPanel.hide()

    this.doorBody.removeClass('open')

    this.enableDoorKnock()

    return wait(this.doorActionDur)
  }

  /**
   * Enables the door knock.
   */
  enableDoorKnock () {
    this.doorBody.one('click', () => this.doorKnock())
  }

  /**
   * Disables the door knock.
   */
  disableDoorKnock () {
    this.doorBody.off('click')
  }

  /**
   * Unlocks the door.
   */
  @on('unlock') unlock () {
    super.unlock()
  }
}

module.exports = Door
