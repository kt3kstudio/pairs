const scene = require('../ui/scene')
const {loadImage} = require('../util/util')

const {wait} = require('spn')
const {p} = require('dom-gen')

/**
 * TitleScene class handles the motions sequences of the title scene.
 */
@scene.primary
class TitleScene {
  /**
   * Entry point of the title scene.
   */
  start () {
    loadImage('img/title-logo.svg', 'title-logo elem', this.elem)

    .then(elem => elem.anim('title-appear', 2000))
    .then(elem => elem.animation('float 6000ms infinite'))

    wait(500).then(() => {
      this.menuButton.show()

      p('GET UP')
      .addClass('touch-here elem')
      .appendTo(this.elem)
      .click(() => this.goToMap())
      .anim('title-appear', 1000)
      .then(p => p.animation('float 1000ms infinite'))
    })
  }

  /**
   * Fades out the scene.
   */
  fadeOut () {
    return Promise.all([this.menuButton.hide(), $('.elem').css('opacity', 0).anim('disappear', 500).then(() => {
      $('.elem').remove()

      return wait(100)
    })])
  }

  /**
   * Transions to the map scene.
   */
  goToMap () {
    this.fadeOut()

    .then(() => this.bg.turnBlack())

    .then(() => {
      location.href = 'floor.html'
    })
  }
}

module.exports = TitleScene
