
/**
 * Sprite (or DirectionalStateImageDimensionalBeing) class changes its image according to its direction and state.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
domain.common.Sprite = domain.common.DirectionalStateImageDimensionalBeing = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict';

    /**
     * @property {String} state The state
     */
    pt.state = null;

    /**
     * @property {Object} stateImage The map of state to image url.
     */
    pt.dirStateImage = null;

    /**
     * @property {String} dir The direction
     */
    pt.dir = null;

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction
     * @param {String} state The state
     */
    pt.setDirState = function (dir, state) {

        dir = dir || this.dir;

        state = state || this.state;

        if (!this.dirStateImage) {
            throw new Error('no image mapping in sprite.');
        }

        var img = this.dirStateImage[dir][state];

        if (!img) {
            throw new Error('illegal (dir, state): (' + dir + ', ' + state + ')');
        }

        this.applyImage(img);

    };

    /**
     * Applies the image to the element.
     *
     * @private
     * @param {domain.common.Image} img
     */
    pt.applyImage = function (img) {

        var mirrorX = img.mirrorX;
        var mirrorY = img.mirrorY;
        var src = img.src;

        var transform;

        if (mirrorX && mirrorY) {

            transform = 'scale(-1, -1)';

        } else if (mirrorX) {

            transform = 'scale(-1, 1)';

        } else if (mirrorY) {

            transform = 'scale(1, -1)';

        } else {

            transform = 'scale(1, 1)';

        }

        this.elem.css('transform', transform);

        this.elem.attr('src', src);

    };

});
