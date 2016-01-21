import Rect from './Rect'
import Grid from './Grid'
import Dimension from './Dimension'

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */
export default class DimensionFactory extends Rect {

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

        super({})

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

        var available = this.getAvailableDimension($(window).width(), $(window).height())

        var bestDim = this.getBestDimension(available)

        this.top = this.marginTop + (available.actualHeight() - bestDim.actualHeight()) / 2
        this.left = this.marginLeft + (available.actualWidth() - bestDim.actualWidth()) / 2
        this.bottom = this.top + bestDim.actualHeight()
        this.right = this.left + bestDim.actualWidth()

    }

    /**
     * Gets the available dimension in the play scene.
     *
     * @private
     * @param {Number} width The width of the target area
     * @param {Number} height The height of the target area
     * @return {Dimension}
     */
    getAvailableDimension(width, height) {

        return new Dimension({
            width: width,
            height: height,
            marginTop: this.marginTop,
            marginRight: this.marginRight,
            marginBottom: this.marginBottom,
            marginLeft: this.marginLeft
        })

    }

    /**
     * Gets the best fitting playable area for the level scene.
     *
     * @private
     * @param {Dimension}
     * @return {Dimension}
     */
    getBestDimension(available) {

        return new Dimension({

            width: this.widthRate,
            height: this.heightRate

        }).similarInnerTangent(available.actualWidth(), available.actualHeight())

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
