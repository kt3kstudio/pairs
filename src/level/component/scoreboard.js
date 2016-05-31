import {Animation, Body} from 'spn'
import {commaNumber} from '../../util/util'

const {component} = $.cc

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */
@component('scoreboard')
export default class Scoreboard extends Body {

    ratioX() { return 0 }
    ratioY() { return 0 }

    marginX() { return 6 }
    marginY() { return 6 }

    /**
     * @constructor
     */
    constructor() {
        super()

        this.score = 0
    }

    /**
     * Hooks the score retrieving process to the fusion pair stream.
     *
     * @param {Rx.Observable<FusionPair>} fusionPairStream
     * @return {Rx.Observable<FusionPair>}
     */
    hookToFusionPairStream(fusionPairStream) {
        return fusionPairStream.map(fusionPair => {
            this.addScore(fusionPair.score())

            return fusionPair
        })
    }

    showAnim() { return new Animation('bom-appear', 400) }
    hideAnim() { return new Animation('bom-disappear', 400) }

    /**
     * Set up the initial dom state.
     */
    willShow() {
        super.willShow()

        this.elem.css('line-height', this.posture.actualHeight() + 'px')

        this.update()
    }

    /**
     * Updates the scoreboard's number.
     */
    update() {
        this.elem.text(commaNumber(this.score))
    }

    /**
     * Add the score to the total score.
     * @param {Number} score The score to add
     */
    addScore(score) {
        this.score += score

        this.update()
    }

    /**
     * Gets the current score.
     * @return {Number}
     */
    getScore() {
        return this.score
    }
}
