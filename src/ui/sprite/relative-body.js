/**
 * RelativeBody is a trait class which works in relative scale with its parent rect.
 */
class RelativeBody {
  /**
   * Handler when the parent rect is set.
   * This method should be called with its parent rect before initial rendering.
   * @param {Rect} rect The parent rect
   */
  onSetParentRect (rect) {
    this.x = rect.left + rect.width() * this.relX
    this.y = rect.top + rect.height() * this.relY

    const size = Math.min(rect.width(), rect.height())
    this.posture.width = size * this.relW
    this.posture.height = size * this.relH
  }
}

module.exports = RelativeBody
