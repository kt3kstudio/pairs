const { trigger } = require('../../util')
const { div } = require('dom-gen')
const { make } = capsid

require('./message-balloon')
require('./punch-emoji')

const DEFAULT_SPEECH_TIMEOUT = 5000

/**
 * Screenplay line represents a line of a screenplay.
 */
class ScreenplayLine {

  /**
   * @param {string} selector The selector of the actor
   * @param {string} line The screenplay line
   * @param {jQuery} context The context (range) of screenplay. Every role should be inside this range. If null is given, then this class looking for the role in the entire document.
   * @param {object} options The option parameters
   */
  constructor (selector, line, context, options = {}) {
    this.selector = selector
    this.line = line
    this.context = context
    this.options = options
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
   * @param {object} opts The options
   */
  play (opts) {
    return Promise.resolve(this.speak(this.getElement(), this.line, opts)).then(() => {
      if (typeof this.options.goals === 'string') {
        trigger(this.getElement(), 'screenplay.goals', this.options.goals)
      }
    })
  }

  /**
   * Speaks the phrase.
   * @param {string} message The contents of the speech
   * @param {object} opts The options
   * @fires 'speech.started' when the speech started
   * @fires 'speech.ended' when the speech ended
   */
  speak ($el, message, opts) {
    trigger($el, 'speech.started')

    const timeout = +$el.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT

    const Screenplay = require('./screenplay')
    message = Screenplay.replaceVars(message, opts.vars)

    const balloon = make('message-balloon', div({ data: {
      message,
      timeout,
      target: $el,
      'skip-target': $el
    } })[0])

    balloon.start()

    return balloon.$el.once('message-balloon-ended')
      .then(() => trigger($el, 'speech.ended'))
  }

  /**
   * Checks if the corresponding actor is ready.
   *
   * If actor is available as a dom and the class has speak method, then it's "ready".
   * @return {boolean}
   */
  actorIsReady () {
    return this.getElement() != null
  }
}

module.exports = ScreenplayLine
