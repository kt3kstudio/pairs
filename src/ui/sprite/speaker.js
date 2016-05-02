import {wait} from 'spn'

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
     * @param {jQuery} cancelDom The dom for closing the speech
     * @param {number} timeout The timeout of showing speech bubble
     */
    speak(speech, {cancelDom, timeout} = {}) {

        cancelDom = cancelDom || '.wrapper'
        timeout = timeout || DEFAULT_SPEECH_TIMEOUT

        const speechSize = speech.text().length

        speech.css('line-height', '50px')
        speech.css('text-align', 'center')

        const bubble = this.elem.multiflipBubble(speech, {
            width: speechSize * 10 + 25,
            height: 50,
            color: '#328DE5',
            m: 14,
            n: 2
        })

        bubble.elem.addClass(this.name + '-speech')

        return this.speechEndPromise = bubble.show()

        .then(() => Promise.race([wait(timeout), $(cancelDom).once('click touchstart')]))

        .then(() => $(cancelDom).off('click touchstart'))

        .then(() => bubble.hide())

    }

}
