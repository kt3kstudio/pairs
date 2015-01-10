/**
 * @class
 *
 * FusionService performs the fusion of the pair of cells.
 */
domain.level.FusionService = (function () {
    'use strict';

    var exports = function (metrics, dom) {
        this.metrics = metrics;
        this.$dom = $(dom);
    };

    var fusionPt = exports.prototype;


    /**
     * Performs fusion.
     *
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise} {Promise<domain.level.Cell>} The new cell
     */
    fusionPt.performFusion = function (pair) {

        var that = this;

        return this.getToReactor(pair).then(function () {

            return that.fusion(pair);

        });
    };


    /**
     * Makes the pair go to the reactor.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair going to fusion reactor
     * @return {Promise} The end of the animation of going to the reactor
     */
    fusionPt.getToReactor = function (pair) {
        var dur = 1000;

        if (pair.right) {

            pair.right.$dom.anim('get-to-reactor-right', dur).then(function () {

                return pair.right.remove();

            });

        }

        return pair.left.$dom.anim('get-to-reactor-left', dur).then(function () {

            pair.left.remove();

        });

    };


    /**
     * Perform cell fusion.
     *
     * @private
     * @param {domain.level.FusionPair} pair The pair
     * @return {Promise} The new cell {Promise<domain.level.Cell>}
     */
    fusionPt.fusion = function (pair) {
        var dur = 600;

        var bom = new domain.level.Cell(
            0,
            0,
            pair.newGene(),
            this.$dom
        ).setDimension(this.metrics);

        if (pair.isLastOne()) {
            bom.setLastOne();
        }

        return bom.appear(dur);
    };

    return exports;

}());
