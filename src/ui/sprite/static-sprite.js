import {traits} from 'traits-decorator'
import {DirStateImageMap, Image} from 'spn'
import Sprite from './sprite'

/**
 * The sprite class which has only one image.
 *
 * Trait.
 */
@traits(Sprite)
export default class StaticSprite {

  /**
   * Returns the default direction.
   */
  defaultDir() { return 'down' }

  /**
   * Returns the default state.
   */
  defaultState() { return 'default' }

  /**
   * Initialize the dir state image map.
   */
  initDirStateImage() {

    this.dirStateImage = new DirStateImageMap()
    this.dirStateImage.addImageByDirState(new Image(this.image()), 'down', 'default')

  }

  /**
   * Initializes sprite things.
   */
  initSprite() {

    this.initDirStateImage()

  }

}
