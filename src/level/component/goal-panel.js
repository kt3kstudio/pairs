const {renderEmoji} = require('../../util/emoji')
const {Body, Animation} = require('spn')

const {component} = $.cc

/**
 * The goal panel on the top right corner.
 */
// @animation.show('bom-appear', 400)
// @animation.hide('bom-disapper', 400)
// @ratio(0, 0)
// @margin(6, 6, 6, 6)
@component('goal-panel')
class GoalPanel extends Body {
    ratioX() { return 0 }
    ratioY() { return 0 }

    marginX() { return 6 }
    marginY() { return 6 }

    showAnim() { return new Animation('bom-appear', 400) }
    hideAnim() { return new Animation('bom-disappear', 400) }

    /**
     * Sets the goals as text.
     * @param {string} goals The goals in text
     */
    setGoals(goals) {
        this.goals = goals
    }

    /**
     * Shows the goals.
     */
    showGoals() {
        this.elem.html(renderEmoji(this.goals))
    }

    willShow() {
        this.showGoals()

        this.updateElem()
    }
}

module.exports = GoalPanel
