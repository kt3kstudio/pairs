import {Animation} from 'spn'
import DimensionalBeing from '../../domain/common/DimensionalBeing'
import {commaNumber} from '../../util/util'

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */
ui.level.Scoreboard = subclass(DimensionalBeing, function (pt, parent) {
    'use strict'

    pt.ratioX = 0
    pt.ratioY = 0

    pt.marginX = 6
    pt.marginY = 6

    /**
     * @constructor
     */
    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.score = 0

    }

    /**
     * Hooks the score retrieving process to the fusion pair stream.
     *
     * @param {Rx.Observable<domain.level.FusionPair>} fusionPairStream
     * @return {Rx.Observable<domain.level.FusionPair>}
     */
    pt.hookToFusionPairStream = function (fusionPairStream) {

        var self = this

        return fusionPairStream.map(function (fusionPair) {

            self.addScore(fusionPair.score())

            return fusionPair

        })

    }

    pt.showAnim = new Animation('bom-appear', 400)
    pt.hideAnim = new Animation('bom-disappear', 400)

    /**
     * Set up the initial dom state.
     */
    pt.willShow = function () {

        parent.willShow.call(this)

        this.elem.css('line-height', this.posture.actualHeight() + 'px')

        this.update()

    }

    /**
     * Updates the scoreboard's number.
     */
    pt.update = function () {

        this.elem.text(commaNumber(this.score))

    }

    /**
     * Add the score to the total score.
     *
     * @param {Number} score The score to add
     */
    pt.addScore = function (score) {

        this.score += score

        this.update()

    }

    /**
     * Gets the current score.
     *
     * @return {Number}
     */
    pt.getScore = function () {

        return this.score

    }

})

$.cc.assign('scoreboard', ui.level.Scoreboard)
