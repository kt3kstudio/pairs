const { sprite, body } = require('../../ui')

const { DIRS } = require('spn')
const { on, emits } = capsid

@sprite.character
@body({ ratio: { x: 0.5, y: 1 } })
class Hero {

  @on('showing') onShowing () {
    this.updateSprite()
  }

  @on('click-on-car')
  @emits('get-on-car') onClickOnCar (e) {
    const car = e.detail.car

    this.setAt(car.getPoint())

    return this.engage().then(() => this.turn(DIRS.UP)).then(() => this.hide())
  }

  /**
   * @param {Body} entrance The entrance
   */
  getInto (body) {
    this.setAt(body.getPoint())

    return this.engage()
      .then(() => this.turn(DIRS.UP))
      .then(() => this.hide())
  }
}

module.exports = Hero
