import './logo'

const {component, on} = $.cc

/**
 * SplashScene controls the splash screen.
 */
@component('splash-scene')
export default class SplashScene {

  @on('scene-start')
  main () {
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
  @on('click').at('.splash-logo')
  goToTitle () {
    location.replace('title.html')
  }
}
