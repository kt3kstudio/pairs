const { sprite, body } = require('../../ui')

const { on } = capsid

@sprite.character
@body({ ratio: { x: 0.5, y: 1 } })
class Hero {
  __init__ () {
    this.initSprite(this.$el)
  }

  @on('showing') onShowing () {
    this.updateSprite()
  }
}

module.exports = Hero
