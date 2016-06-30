/**
 * Screenplay line represents a line of a screenplay.
 */
class ScreenplayLine {

  /**
   * @param {string} selector The selector of the actor
   * @param {string} line The screenplay line
   * @param {jQuery} context The context (range) of screenplay
   * @param {object} options The option parameters
   */
  constructor (selector, line, context, options = {}) {
    this.selector = selector
    this.line = line
    this.context = context
    this.options = options
  }

  /**
   * Gets the actor of this line.
   */
  getActor () {
    return this.getElement().data('speaker')
  }

  /**
   * Gets the element.
   * @return {jQuery}
   */
  getElement () {
    return $(this.selector, this.context)
  }

  /**
   * Plays the role.
   */
  play () {
    return Promise.resolve(this.getActor().speak(this.line)).then(() => {
      if (typeof this.options.goals === 'string') {
        this.getElement().trigger('screenplay.goals', this.options.goals)
      }
    })
  }

  /**
   * Checks if the corresponding actor is ready.
   *
   * If actor is available as a dom and the class has speak method, then it's "ready".
   * @return {boolean}
   */
  actorIsReady () {
    const actor = this.getActor()

    return actor != null && typeof actor.speak === 'function'
  }
}

module.exports = ScreenplayLine
