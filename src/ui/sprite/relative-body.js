
/**
 * RelativeBody is a trait class which works in relative scale with its parent rect.
 */
export default class RelativeBody {

  /**
   * Handler when the parent rect is set.
   * This method should be called with its parent rect before initial rendering.
   * @param {Rect} rect The parent rect
   */
  onSetParentRect(rect) {

    this.x = rect.left + rect.width() * this.relX
    this.y = rect.top + rect.height() * this.relY
    this.posture.width = rect.width() * this.relW
    this.posture.height = rect.width() * this.relH

  }

}
