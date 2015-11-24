/**
 * FusionService performs the fusion of the pair of cells.
 *
 * @class
 */
domain.level.FusionService = subclass(domain.common.Role, function (pt) {
    'use strict'

    /**
     * @param {domain.level.Dimension} dimension
     */
    pt.setDimension = function (dimension) {
        this.dimension = dimension

        return this
    }

    /**
     * Performs fusion.
     *
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise} {Promise<domain.level.Cell>} The new cell
     */
    pt.performFusion = function (pair) {
        var that = this

        return this.getToReactor(pair).then(function () {
            return that.fusion(pair)
        })
    }

    /**
     * Makes the pair go to the reactor.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair going to fusion reactor
     * @return {Promise} The end of the animation of going to the reactor
     */
    pt.getToReactor = function (pair) {
        var dur = 1000

        if (pair.right) {
            pair.right.anim('get-to-reactor-right', dur).then(function () {
                return pair.right.remove()
            })
        }

        return pair.left.anim('get-to-reactor-left', dur).then(function () {
            pair.left.remove()
        })
    }

    /**
     * Perform cell fusion.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise} The new cell {Promise<domain.level.Cell>}
     */
    pt.fusion = function (pair) {
        var dur = 600

        var cell = $('<object />', {
            data: {gene: pair.newGene()},
            prependTo: this.elem
        }).cc.init('cell').setDimension(this.dimension).setXY([0, 0])

        if (pair.isLastOne()) {
            cell.setLastOne()
        }

        if (pair.isEvolving()) {
            cell.setEvolved()
        }

        return cell.appear(dur)
    }
})

$.cc.assign('fusion-service', domain.level.FusionService)
