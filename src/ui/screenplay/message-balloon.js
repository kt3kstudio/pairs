const { renderEmoji } = require('../../util/emoji')

const { wait } = require('spn')
const { p } = require('dom-gen')

const { trigger } = require('../../util')

const { component, emits, on } = capsid

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

  __init__ () {
    this.target = $(this.$el.data('target'))[0]
    this.skipTarget = $(this.$el.data('skip-target'))
    this.message = this.$el.data('message')
    this.timeout = +this.$el.data('timeout') || DEFAULT_SPEECH_TIMEOUT
  }

  /**
   * Starts showing the balloon and returns a promise.
   * @return {Promise}
   */
  @emits('message-balloon-started')
  @emits('message-balloon-ended')
  start () {
    // This is dummy for occupying the space.
    const msgPlaceholder = p({ css: { height: 0, overflow: 'hidden' } }, renderEmoji(this.message))

    // This is actual message for showing
    const msg = p(renderEmoji(this.message, 'punch-emoji')).cc('puncher')

    this.$el.append(msgPlaceholder, msg)

    trigger(msg, 'puncher-start')

    const drop = new global.Drop({
      target: this.target,
      content: this.el,
      classes: 'drop-theme-arrows-bounce',
      position: 'top center',
      openOn: 'always'
    })

    return this.$el.once('puncher-ended')
      .then(() => wait(this.timeout / 10))
      .then(() => drop.close())
      .then(() => wait(500))
  }
}

module.exports = MessageBalloon
