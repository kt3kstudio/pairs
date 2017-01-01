const Screenplay = require('./screenplay')
const { trigger } = require('../../util')
require('./message-balloon')
require('../screenplay/punch-emoji')

const {traits} = require('traits-decorator')

const {div} = require('dom-gen')

const DEFAULT_SPEECH_TIMEOUT = 5000

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait.
 */
class Speaker {

  /**
   * Sets the speaker data.
   * @param {jQuery} elem
   */
  setSpeaker (elem) {
    elem.data('speaker', this)
  }

  /**
   * Speaks the phrase.
   * @param {string} message The contents of the speech
   * @param {object} opts The options
   * @fires 'speech.started' when the speech started
   * @fires 'speech.ended' when the speech ended
   */
  speak (message, opts) {
    trigger(this.elem, 'speech.started')

    const timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT

    message = Screenplay.replaceVars(message, opts.vars)

    const dom = div({data: {
      message,
      timeout,
      target: this.elem,
      'skip-target': this.elem
    }}).cc('message-balloon')

    trigger(dom, 'message-balloon.start')

    return dom.once('message-balloon.ended')
    .then(() => trigger(this.elem, 'speech.ended'))
  }
}

Speaker.speaker = traits(Speaker)

module.exports = Speaker
