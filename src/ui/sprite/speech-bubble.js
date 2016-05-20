/**
 * SpeechBubble class is ui class for a speech bubble
 * [data] {HTMLElement|string|jQuery} target The target of the bubble
 * [data] {string} speech The contents of speech
 * [data] {number} timeout The timeout duration of showing of the bubble
 */
export default class SpeechBubble extends $.cc.Coelement {

    constructor(elem) {
        super(elem)

        this.target = $(elem.data('target'))[0]
        this.speech = elem.data('speech')
        this.tieout = +elem.data('timeout')
    }

    show() {
    }

}
