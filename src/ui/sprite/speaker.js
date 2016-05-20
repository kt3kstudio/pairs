import ScreenplayManager from '../manager/screenplay-manager'
import {renderEmoji} from '../../util/emoji'

import {wait} from 'spn'
import {p, div} from 'dom-gen'

const DEFAULT_SPEECH_TIMEOUT = 5000

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait.
 */
export default class Speaker {

    /**
     * Speaks the phrase
     *
     * @param {string} message The contents of the speech
     * @fires 'speech.started' when the speech started
     * @fires 'speech.ended' when the speech ended
     */
    speak(message) {

        this.elem.trigger('speech.started')

        // const cancelDom = this.elem.data('speech-ok') || this.elem
        const timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT

        const html = renderEmoji(message)

        const speech0 = p(html) // This is dummy for occupying the space.

        speech0.css('text-align', 'left')
        speech0.css('display', 'block')
        speech0.css('height', '0px')
        speech0.css('overflow', 'hidden')

        const speech1 = p(html)

        speech1.css('text-align', 'left')
        speech1.css('display', 'inline')

        const wrapper = div(speech0, speech1)

        const drop = new global.Drop({
            target: this.elem[0],
            content: wrapper.appendTo(document.body)[0],
            classes: 'drop-theme-arrows-bounce',
            position: 'top center',
            openOn: 'always'
        })

        return speech1.cc.up('puncher').trigger('puncher.start').once('puncher.ended')
        .then(() => wait(timeout / 10))
        .then(() => drop.close())
        .then(() => wait(500))
        .then(() => this.elem.trigger('speech.ended'))

    }

}
