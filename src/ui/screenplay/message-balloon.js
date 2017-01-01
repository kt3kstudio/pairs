const {renderEmoji} = require('../../util/emoji')

const {wait} = require('spn')
const {p} = require('dom-gen')

const { trigger } = require('../../util')

const {component, on} = $.cc

const DEFAULT_SPEECH_TIMEOUT = 500

/**
 * SpeechBubble class is ui class for a speech bubble
 * [data] {HTMLElement|string|jQuery} target The target of the bubble
 * [data] {HTMLElement|string|jQuery} skipTarget The target of the bubble
 * [data] {string} message The contents of speech
 * [data] {number} timeout The timeout duration of showing of the bubble
 */
@component('message-balloon')
class MessageBalloon {

  constructor (elem) {
    this.target = $(elem.data('target'))[0]
    this.skipTarget = $(elem.data('skip-target'))
    this.message = elem.data('message')
    this.timeout = +elem.data('timeout') || DEFAULT_SPEECH_TIMEOUT
  }

  /**
   * Starts showing the balloon and returns a promise.
   * @return {Promise}
   */
  @on('message-balloon.start')
  start () {
    trigger(this.elem, 'message-balloon.started')

    const msgPlaceholder = p({css: {height: 0, overflow: 'hidden'}}, renderEmoji(this.message)) // This is dummy for occupying the space.
    const msg = p(renderEmoji(this.message, 'punch-emoji')).cc('puncher') // This is actual message for showing

    this.elem.append(msgPlaceholder, msg)

    trigger(msg, 'puncher.start')

    const drop = new global.Drop({
      target: this.target,
      content: this.elem[0],
      classes: 'drop-theme-arrows-bounce',
      position: 'top center',
      openOn: 'always'
    })

    return this.elem.once('puncher.ended')
    .then(() => wait(this.timeout / 10))
    .then(() => drop.close())
    .then(() => wait(500))
    .then(() => this.elem.trigger('message-balloon.ended'))
  }
}

module.exports = MessageBalloon
