const { body, sprite } = require('../../ui')

const { on, emit } = capsid

@sprite.static(`${global.BASEPATH}/img/car.svg`)
@body({ width: 200, height: 85, ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Car {

  @on('showing') onShowing () {
    this.updateSprite()
  }

  @on('click') @emit.last('click-on-car') onClick () {
    return { car: this }
  }

  /**
   * Goes to the given point.
   * @param {Point} point The point
   */
  @emit.last('arrive-to-destination')
  goTo (point) {
    this.setAt(point)

    return this.engage(10000)
  }

}

module.exports = Car
