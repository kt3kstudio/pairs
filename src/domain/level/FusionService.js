const {component} = $.cc

/**
 * FusionService performs the fusion of the pair of cells.
 */
@component('fusion-service')
export default class FusionService extends $.cc.Coelement {

    /**
     * @param {Grid} grid The grid
     */
    setGrid(grid) {

        this.grid = grid

        return this

    }

    /**
     * Processes the funsion pair stream and returns the stream of new born cells
     *
     * @param {Rx.Observable<FusionPair>}
     * @return {Rx.Observable<domain.level.Cell>}
     */
    processFusionPairStream(fusionPairStream) {

        return fusionPairStream.pipe(fusionPair => self.performFusion(fusionPair))

    }

    /**
     * Performs fusion.
     *
     * @param {FusionPair} pair The pair
     * @return {Promise} {Promise<domain.level.Cell>} The new cell
     */
    performFusion(pair) {

        return this.getToReactor(pair).then(() => this.fusion(pair))

    }

    /**
     * Makes the pair go to the reactor.
     *
     * @private
     * @param {FusionPair} pair The pair going to fusion reactor
     * @return {Promise} The end of the animation of going to the reactor
     */
    getToReactor(pair) {

        var dur = 1000

        // pair.right could be null
        if (pair.right) {

            pair.right.anim('get-to-reactor-right', dur).then(() => pair.right.remove())

        }

        // pair.left always exists
        return pair.left.anim('get-to-reactor-left', dur).then(() => pair.left.remove())

    }

    /**
     * Perform cell fusion.
     *
     * @private
     * @param {FusionPair} pair The pair
     * @return {Promise} The new cell {Promise<domain.level.Cell>}
     */
    fusion(pair) {

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

        return cell.show(dur).then(() => cell)

    }

}
