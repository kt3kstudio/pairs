const { wait } = require('spn')
const { component, on } = capsid

/**
 * Emoji character component.
 */
@component('punch-emoji')
class PunchEmoji {
  __init__ () {
    this.$el.css('opacity', 0)
  }

  @on('puncher-appended') onAppended () {
    wait(100).then(() => this.$el.css('opacity', 1))
  }
}

module.exports = PunchEmoji
