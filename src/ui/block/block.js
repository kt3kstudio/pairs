const { Rect } = require('spn')
const { trigger } = require('../../util')

/**
 * Block is a trait which has its own dimension which is relative to its parent's guiding rect.
 */
class Block {
  /**
   * Requires the guiding rect.
   */
  needsGuidingRect () {
    const parent = this.el.parentElement

    if (parent) {
      trigger(parent, 'block-need-guiding-rect', { child: this })
    }

    if (!this.__guidingRect__) {
      this.__guidingRect__ = Rect.windowAsRect()
    }
  }

  /**
   * Initializes the block's rect by the overriden `block` method.
   */
  initBlock () {
    this.blockRect = this.block(this.getGuidingRect())
  }

  getGuidingRect () {
    if (!this.__guidingRect__) {
      this.needsGuidingRect()
    }

    return this.__guidingRect__
  }

  getRect () {
    if (!this.blockRect) {
      this.initBlock()
    }

    return this.blockRect
  }

  /**
   * @param {Event} e The event object
   * @param {Block} e.detail.child The child block
   */
  onChildNeedGuidingRect (e) {
    e.stopPropagation()

    e.detail.child.__guidingRect__ = this.getRect()
  }
}

module.exports = Block
