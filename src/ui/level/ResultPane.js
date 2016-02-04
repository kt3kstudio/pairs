import Body from '../../domain/common/body'
import {wait} from 'spn'
/**
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 *
 * @class
 */
@$.cc.Component('result-pane')
export default class ResultPane extends Body {

    /**
     * Sets the score.
     *
     * @param {number} score The score to set
     */
    setScore(score) {

        this.score = score

    }

    /**
     * Sets the number of the stars.
     *
     * @param {number} star The number of stars
     */
    setStar(star) {

        this.star = star

    }

    /**
     * @override
     */
    willShow() {

        $('<div />', {
            addClass: 'result-content',
            text: 'score = ' + this.score,
            css: {
                opacity: 0,
                position: 'relative'
            },
            appendTo: this.elem
        })

        return super.willShow()

    }

    /**
     * Shows the result pane and it automatically hides timeout later.
     *
     * @param {number} timeout The time after which the pane hides itself
     * @return {Promise} The promise which resolves when the pane hides
     */
    show(timeout) {

        return super.show().then(() => this.showInfoPane(timeout))

    }

    /**
     * Shows the info pane with the given timeout.
     *
     * @param {Number} timeout
     * @return {Promise}
     */
    showInfoPane(timeout) {

        var info = this.elem.infoPane(9, 7)

        return info.show()

        .then(() => Promise.race([wait(timeout), this.elem.once('click touchstart')]))

        .then(() => info.hide())

    }

}
