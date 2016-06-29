/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 *
 * @abstract
 * @class
 */
class SceneContext {

  main () {
    return Promise

      .resolve(this.load())

      .then(() => this.setUp())

      .then(() => this.start())
  }

  /**
   * Loads the data necessary for the scene.
   *
   * @abstract
   */
  load () {}

  /**
   * Sets up the services necessary for the scene.
   *
   * This must be a sync process.
   *
   * @abstract
   */
  setUp () {}

  /**
   * Starts the scene.
   *
   * @abstract
   */
  start () {}

  /**
   * Gets the class component of the given name inside the element.
   *
   * @param {string} className The class name of the component
   */
  get (className) {
    return this.elem.find('.' + className).cc.get(className)
  }

  /**
   * Gets the class component of the given name at the element.
   *
   * @param {string} className The class name of the component
   */
  getAtElem (className) {
    return this.elem.cc.get(className)
  }

  /**
   * Gets the class component of the given name at the given selector
   *
   * @param {string} selector The selector for searching
   * @param {string} className The class name of the component
   */
  getGlobal (selector, className) {
    return $(selector).cc.get(className)
  }

  /**
   * Gets the menu button.
   *
   * @return {ui.common.MenuButton}
   */
  getMenuButton () {
    return this.getGlobal('.menu-button-root', 'menu-button')
  }

}

module.exports = SceneContext
