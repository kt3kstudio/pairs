/**
 * FusionService performs the fusion of the pair of cells.
 */
domain.level.FusionService = subclass($.cc.Coelement, function (pt) {
    'use strict'

    /**
     * @param {Grid} grid The grid
     */
    pt.setGrid = function (grid) {

        this.grid = grid

        return this

    }

    /**
     * Processes the funsion pair stream and returns the stream of new born cells
     *
     * @param {Rx.Observable<FusionPair>}
     * @return {Rx.Observable<domain.level.Cell>}
     */
    pt.processFusionPairStream = function (fusionPairStream) {

        var self = this

        return fusionPairStream.pipe(function (fusionPair) {

            return self.performFusion(fusionPair)

        })

    }

    /**
     * Performs fusion.
     *
     * @param {FusionPair} pair The pair
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
     * @param {FusionPair} pair The pair going to fusion reactor
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
     * @param {FusionPair} pair The pair
     * @return {Promise} The new cell {Promise<domain.level.Cell>}
     */
    pt.fusion = function (pair) {

        var dur = 600

        var cell = $('<object />', {
            data: {gene: pair.newGene()},
            prependTo: this.elem
        }).cc.init('cell')

        cell.setGrid(this.grid, 0, 0)

        if (pair.isLastOne()) {

            cell.setLastOne()

        }

        if (pair.isEvolving()) {

            cell.setEvolved()

        }

        return cell.show(dur).then(function () {

            return cell

        })

    }

})

$.cc.assign('fusion-service', domain.level.FusionService)
