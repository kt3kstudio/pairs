const { body, sprite } = require('../../ui')

const { on, emit } = capsid

@sprite.static(`${global.BASEPATH}/img/car.svg`)
@body({ width: 200, height: 85, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Car {

  __init__ () {
    this.initSprite()
  }

  @on('showing') onShowing () {
    this.updateSprite()
  }

  @on('click') @emit.last('click-on-car') onClick () {
    return { car: this }
  }

  @on('get-on-car') onGetOnCar () {
    this.setAt(this.getPoint().right(10000)) // TODO: fix the point

    return this.engage(50000)
  }

}

module.exports = Car
