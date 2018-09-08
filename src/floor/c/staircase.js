const { animation } = require('spn')

const FloorAsset = require('./floor-asset')

const { emits, component, on } = capsid

const STAIRCASE_ANIMATION_DUR = 400

/**
 * Staircase class represents the staircases in the map view.
 */
@component
@animation.show('door-appear', STAIRCASE_ANIMATION_DUR)
@animation.hide('door-disappear', STAIRCASE_ANIMATION_DUR)
class Staircase extends FloorAsset {

  __mount__ () {
    super.__mount__()

    this.goto = this.$el.data('goto') // must be parsed position object, not string

    this.locked = true
  }

  /**
   * Sets up the dom.
   */
  willShow () {
    super.willShow()

    if (this.locked) {
      this.spawnFrog()
    } else {
      this.enableDoorKnock()
    }
  }

  /**
   * Enables the knock interaction.
   */
  enableDoorKnock () {
    this.elem.one('click', () => this.doorKnock())
  }

  /**
   * Disables the knock interaction.
   */
  disableDoorKnock () {
    this.elem.off('click')
  }

  /**
   * Triggers the reload event.
   */
  @on('get-walker') @emits('go-to-floor') onGetWalker () {
    return this.goto
  }

  /**
   * Unlocks the staircase
   */
  @on('unlock') unlock () {
    super.unlock()
  }
}

module.exports = Staircase
