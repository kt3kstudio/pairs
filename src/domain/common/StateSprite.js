
/**
 * StateSprite class has its state and changes its image according to its state.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
domain.common.StateSprite = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict';

    /**
     * @property {Object} stateImage The map of state to image url.
     */
    pt.stateImage = null;

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} state The state
     */
    pt.setState = function (state) {

        var img = this.stateImage[state];

        if (!img) {
            throw new Error('illegal state: ' + state);
        }

        this.elem.attr('src', img);

    };

});
