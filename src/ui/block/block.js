/**
 * Block is a trait which has its own dimension which is relative to its parent's guiding rect.
 */
class Block {
  /**
   * Requires the guiding rect.
   */
  needsGuidingRect () {
    this.elem.trigger('block-need-guiding-rect', this)

    if (!this.guidingRect) {
      throw new Error('Guiding Rect not found.')
    }
  }

  /**
   * @param {Rect} rect The rect
   */
  onGetGuidingRect (rect) {
    this.guidingRect = rect
  }

  /**
   * @param {object} e The event object
   * @param {Block} child The child block
   */
  onChildNeedGuidingRect (e, child) {
    child.onGetGuidingRect(this.rect)
  }
}

module.exports = Block
