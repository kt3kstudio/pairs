import ScreenplayManager from '../manager/screenplay-manager'

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
     * @param {string} speech The contents of the speech
     */
    speak(speech) {

        const cancelDom = this.elem.data('speech-ok') || this.elem
        const timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT

        speech.css('text-align', 'left')
        speech.css('display', 'block')
        speech.css('line-height', '20px')
        speech.css('overflow', 'hidden')

        let text = speech.text()

        text = ScreenplayManager.renderEmoji(text)

        const speech1 = p(text)

        speech1.css('text-align', 'left')
        speech1.css('display', 'inline')

        const wrapper = div(speech, speech1)

        const drop = new Drop({
            target: this.elem[0],
            content: wrapper.appendTo(document.body)[0],
            classes: 'drop-theme-arrows-bounce',
            position: 'top center',
            openOn: 'always'
        })

        return wait(0)
        .then(() => speech1.cc.init('puncher').start())
        .then(() => wait(500))
        .then(() => drop.close())
        .then(() => wait(500))

    }

}
