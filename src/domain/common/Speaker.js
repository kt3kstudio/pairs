const defaultSpeechTimeout = 5000

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait
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

        cancelDom = cancelDom || this.elem
        timeout = timeout || defaultSpeechTimeout

        const bubbleShown = this.elem.speechBubble(speech, {
            width: $(window).width() * 0.8,
            height: 50,
            color: '#328DE5',
            cssClass: this.name + '-speech',
            partitionY: 2,
            partitionX: 10,
            duration: 600
        }).show()

        this.speechEndPromise = bubbleShown.then((sb) => {

            return new Promise(resolve => {

                setTimeout(resolve, timeout)

                $(cancelDom).one('click touchstart', resolve)

            })

            .then(() => {

                $(cancelDom).off('click touchstart')

                return sb.hide()

            })

        })

        return bubbleShown

    }

}
