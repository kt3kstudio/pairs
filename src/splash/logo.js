const {wait, Being, Animation} = require('spn')

const {component} = $.cc

/**
 * Logo animation componenent in the splash screen.
 */
@component('splash-logo')
class Logo extends Being {
  /**
   * Performs splash screen's logo animation.
   *
   * @return {Promise}
   */
  perform () {
    return this.show()

    .then(() => wait(700))

    .then(() => this.hide())
  }

  willShow () {
    return this.elem.imageLoaded()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  didHide () {
    this.elem.css('opacity', 0)
  }

  showAnim () {
    return new Animation('logo-show', 350)
  }

  hideAnim () {
    return new Animation('logo-hide', 350)
  }
}

module.exports = Logo
