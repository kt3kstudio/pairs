const Sprite = require('./sprite')
const Ma = require('./ma')
const { Image, DirStateImageMap, DIRS } = require('spn')
const { traits } = require('traits-decorator')

const CHR_TABLE = {
  ma: Ma
}

/**
 * CharSprite class handles 4-directional character sprite.
 *
 * Trant.
 */
@traits(Sprite)
class CharSprite {

  /**
   * Returns the default direction.
   */
  defaultDir () { return DIRS.DOWN }

  /**
   * Returns the default state.
   */
  defaultState () { return 'default' }

  /**
   * Initializes the sprite.
   * @param {jQuery} elem The jquery dom element
   */
  initSprite () {
    this.character = this.$el.data('character')

    CHR_TABLE[this.character.id].call(this)

    this.dirStateImage = new DirStateImageMap()

    this.dirStateImage.addImageByDirState(new Image(this.upImage()), DIRS.UP, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.downImage()), DIRS.DOWN, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.leftImage()), DIRS.LEFT, 'default')
    this.dirStateImage.addImageByDirState(new Image(this.rightImage()), DIRS.RIGHT, 'default')
  }

  /**
   * Changes the direction the character currently heading for.
   * @param {DIRS} dir The direction (one of up, down, left or right)
   */
  turn (dir) {
    this.setDir(dir)
  }

  /**
   * Sets at the point.
   * @param {Point} point The point to go to
   */
  setTo (point) {
    this.setDir(point.minus(this.getPoint()).getDir())

    this.setAt(point)
  }
}

module.exports = CharSprite
