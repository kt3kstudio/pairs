const { body, sprite } = require('../../ui')

const { on } = capsid

@sprite.static(`${global.BASEPATH}/img/car.svg`)
@body({ width: 200, height: 85, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Car {

  __init__ () {
    this.initSprite()
  }

  @on('showing') onShowing () {
    this.updateSprite()
  }

}

module.exports = Car
