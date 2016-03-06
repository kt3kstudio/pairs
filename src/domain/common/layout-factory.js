import {Grid, Rect, Posture} from 'spn'

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */
export default class LayoutFactory {

    /**
     * Calculates things which are needed for providing the dimensions of the objects in the level scene.
     *
     * @protected
     * @param {number} marginLeft The left margin for the main area
     * @param {number} marginTop The top margin for the main area
     * @param {number} marginRight The right margin for the main area
     * @param {number} marginBottom The bottom margin for the main area
     * @param {widthRate} widthRate The rate of the width relative to the height rate
     * @param {heightRate} heightRate The rate of the height relative to the width rate
     */
    constructor({marginLeft, marginTop, marginRight, marginBottom, widthRate, heightRate} = {}) {

        /**
         * @property {number} marginLeft The left margin for the main area.
         */
        this.marginLeft = marginLeft || 0

        /**
         * @property {number} marginTop The top margin for the main area.
         */
        this.marginTop = marginTop || 0

        /**
         * @property {number} marginRight The right margin for the main area.
         */
        this.marginRight = marginRight || 0

        /**
         * @property {number} marginBottom The bottom margin for the main area.
         */
        this.marginBottom = marginBottom || 0

        /**
         * @property {number} heightRate The rate of the width relative to the height rate
         */
        this.widthRate = widthRate || 1

        /**
         * @property {number} heightRate The rate of the height relative to the width rate
         */
        this.heightRate = heightRate || 1

        this.main = Rect.windowAsRect().margin({
            top: marginTop,
            left: marginLeft,
            right: marginRight,
            bottom: marginBottom
        }).getBestRect({
            horizontal: widthRate,
            vertical: heightRate
        })

    }

    /**
     * Creates a grid with the given options.
     *
     * @param {Object} options The options
     * @return {Grid}
     */
    grid(options) {

        return new Grid(options)

    }

    /**
     * Creates a rect with the given options.
     *
     * @param {Object} options The options
     * @return {Rect}
     */
    rect(options) {

        return new Rect(options)

    }

}
