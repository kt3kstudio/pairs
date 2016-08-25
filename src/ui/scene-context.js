const BackgroundService = require('./common/background-service')

/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 * @abstract
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
   * @abstract
   */
  load () {}

  /**
   * Sets up the services necessary for the scene.
   *
   * This must be a sync process.
   * @abstract
   */
  setUp () {}

  /**
   * @return {MenuButton}
   */
  get menuButton () {
    return $('.menu-button-root').cc.get('menu-button')
  }

  /**
   * Gets the background service.
   */
  get bg () {
    return BackgroundService
  }
}

module.exports = SceneContext
