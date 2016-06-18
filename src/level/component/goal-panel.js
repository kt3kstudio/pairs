require('../service/goal-detection')

const {renderEmoji} = require('../../util/emoji')
const {Body, Animation} = require('spn')

const {on, component} = $.cc

const CSS_CLASS_GOAL_EMOJI = 'emoji-round-yellow'

/**
 * The goal panel on the top right corner.
 */
// @animation.show('bom-appear', 400)
// @animation.hide('bom-disapper', 400)
// @ratio(0, 0)
// @margin(6, 6, 6, 6)
@component('goal-panel')
class GoalPanel extends Body {
  ratioX () { return 0 }
  ratioY () { return 0 }

  marginX () { return 6 }
  marginY () { return 6 }

  showAnim () { return new Animation('bom-appear', 400) }
  hideAnim () { return new Animation('bom-disappear', 400) }

  /**
   * Sets the goals as text.
   * @param {string} goals The goals in text
   */
  setGoals (goals) {
    this.goals = goals
    this.elem.data('goals-text', goals)
    this.elem.cc('goal-detection')
  }

  /**
   * The handler for the goal detection.
   * @param {object} e The event
   * @param {number} index The index of goaled cell
   */
  @on('goal-detection.goal')
  onGoalDetection (e, index) {
    const target = this.elem.find('.emoji')[index]

    $(target).addClass(CSS_CLASS_GOAL_EMOJI)
  }

  @on('goal-detection.finish')
  onGoalFinished () {
    window.alert('finish!')
  }

  /**
   * Shows the goals.
   */
  showGoals () {
    this.elem.html(renderEmoji(this.goals))
  }

  willShow () {
    this.showGoals()

    this.updateElem()
  }
}

module.exports = GoalPanel
