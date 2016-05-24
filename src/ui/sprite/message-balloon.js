import {renderEmoji} from '../../util/emoji'

import {wait} from 'spn'
import {p} from 'dom-gen'

const {component, event} = $.cc

const DEFAULT_SPEECH_TIMEOUT = 500

/**
 * SpeechBubble class is ui class for a speech bubble
 * [data] {HTMLElement|string|jQuery} target The target of the bubble
 * [data] {HTMLElement|string|jQuery} skipTarget The target of the bubble
 * [data] {string} message The contents of speech
 * [data] {number} timeout The timeout duration of showing of the bubble
 */
@component('message-balloon')
export default class MessageBalloon extends $.cc.Coelement {

    constructor(elem) {
        super(elem)

        this.target = $(elem.data('target'))[0]
        this.skipTarget = $(elem.data('skip-target'))
        this.message = elem.data('message')
        this.timeout = +elem.data('timeout') || DEFAULT_SPEECH_TIMEOUT
    }

    /**
     * Starts showing the balloon and returns a promise.
     * @return {Promise}
     */
    @event('message-balloon.start')
    start() {
        this.elem.trigger('message-balloon.started')

        this.elem.append(
            p({css: {height: 0, overflow: 'hidden'}}, renderEmoji(this.message)), // This is dummy for occupying the space.
            p(renderEmoji(this.message, 'punch-emoji')).cc.up('puncher').trigger('puncher.start') // This is actual message for showing
        )
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
