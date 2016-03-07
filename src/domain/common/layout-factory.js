import {Grid, Rect} from 'spn'

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */
export default class LayoutFactory {

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
