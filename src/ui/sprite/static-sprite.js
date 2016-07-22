const {traits} = require('traits-decorator')
const {DirStateImageMap, Image} = require('spn')
const Sprite = require('./sprite')

/**
 * The sprite class which has only one image.
 *
 * Trait.
 */
@traits(Sprite)
class StaticSprite {

  /**
   * Returns the default direction.
   */
  defaultDir () { return 'down' }

  /**
   * Returns the default state.
   */
  defaultState () { return 'default' }

  /**
   * Initialize the dir state image map.
   */
  initDirStateImage () {
    this.dirStateImage = new DirStateImageMap()
    this.dirStateImage.addImageByDirState(new Image(this.image()), 'down', 'default')
  }

  /**
   * Initializes sprite things.
   */
  initSprite () {
    this.initDirStateImage()
  }
}

module.exports = StaticSprite
