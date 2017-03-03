/**
 * Sprite class changes its image according to its direction and state.
 *
 * This is a trait class. Use with traits syntax like `traits-decorator`.
 */
class Sprite {

  /**
   * Changes the direction and state.
   * @param {String} dir The direction
   * @param {String} state The state
   */
  setDirState (dir, state) {
    this.dir = dir == null ? this.dir : dir
    this.state = state == null ? this.state : state

    this.updateElemByDirState(this.dir, this.state)
  }

  getDirStateImage () {
    if (!this.dirStateImage) {
      this.initSprite()
    }

    return this.dirStateImage
  }

  /**
   * Updates the element by the dir and state.
   * @param {string} dir The direction
   * @param {string} state The state
   */
  updateElemByDirState (dir, state) {
    this.getDirStateImage().get(dir == null ? this.defaultDir() : dir, state == null ? this.defaultState() : state).apply(this.elem)
  }

  /**
   * Updates sprite related things.
   */
  updateSprite () {
    this.updateElemByDirState()
  }

  /**
   * Keeps the direction and sets the given state.
   *
   * @param {string} state The state
   */
  setState (state) {
    this.setDirState(null, state)
  }

  /**
   * Sets the direction.
   * @param {string} dir The direction
   */
  setDir (dir) {
    this.setDirState(dir, null)
  }
}

module.exports = Sprite
