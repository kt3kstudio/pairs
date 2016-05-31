const {Body, Animation} = require('spn')

const {component} = $.cc

@component('goal-panel')
class GoalPanel extends Body {
    ratioX() { return 0 }
    ratioY() { return 0 }

    marginX() { return 6 }
    marginY() { return 6 }

    showAnim() { return new Animation('bom-appear', 400) }
    hideAnim() { return new Animation('bom-disappear', 400) }
}

module.exports = GoalPanel
