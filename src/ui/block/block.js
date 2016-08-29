/**
 * Block is a trait which has its own dimension which is relative to its parent's guiding rect.
 */
class Block {
  /**
   * Requires the guiding rect.
   */
  needsGuidingRect () {
    this.elem.parent().trigger('block-need-guiding-rect', this)

    if (!this.__guidingRect__) {
      this.__guidingRect__ = Rect.windowAsRect()
    }
  }

  /**
   * @abstract
   * @param {Rect} guidingRect The guiding rect
   * @return {Rect} The block rect
  block (guidingRect) {
    return guidingRect
  }*/

  /**
   * Initializes the block's rect by the overriden `block` method
   */
  initBlock () {
    this.blockRect = this.block(this.getGuidingRect())
    this.setRect(this.blockRect)
  }

  getGuidingRect () {
    if (this.__guidingRect__) {
      return this.__guidingRect__
    }

    this.needsGuidingRect()

    return this.__guidingRect__
  }

  /**
   * @param {object} e The event object
   * @param {Block} child The child block
   */
  onChildNeedGuidingRect (e, child) {
    e.stopPropagation()

    if (this.blockRect) {
      child.__guidingRect__ = this.blockRect

      return
    }

    child.__guidingRect__ = this.getGuidingRect()
  }
}

module.exports = Block
