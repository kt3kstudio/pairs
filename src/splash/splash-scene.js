require('./logo')
const scene = require('../ui/scene')

const {on} = $.cc

/**
 * SplashScene controls the splash screen.
 */
@scene.primary
class SplashScene {
  start () {
    return this.performSplash('studio')

    .then(() => this.performSplash('straw'))

    .then(() => this.goToTitle())
  }

  /**
   * Performs splash scene animation for the give class name element.
   *
   * @param {String} className The class name to animate
   * @return {Promise}
   */
  performSplash (className) {
    return this.elem.find('.splash-logo.' + className).cc.get('splash-logo').perform()
  }

  /**
   * The scene goes to the title.
   */
  @on('click', { at: '.splash-logo' })
  goToTitle () {
    location.replace('title.html')
  }
}

module.exports = SplashScene
