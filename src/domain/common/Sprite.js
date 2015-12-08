/**
 * Sprite (or DirectionalStateImageDimensionalBeing) class changes its image according to its direction and state.
 *
 * @class
 * @extends domain.common.DimensionalBeing
 */
domain.common.Sprite = domain.common.DirectionalStateImageDimensionalBeing = subclass(domain.common.GridWalker, function (pt, parent) {
    'use strict'

    /**
     * @override
     * @property {Number} originX
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */
    pt.ratioX = 0.5

    /**
     * @override
     * @property {Number} originY
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */
    pt.ratioY = 1

    /**
     * @property {String} state The state
     */
    pt.state = null

    /**
     * @property {Object} stateImage The map of state to image url. Object<Object<domain.common.Image>>
     */
    pt.dirStateImage = null

    /**
     * @property {String} dir The direction
     */
    pt.dir = null

    /**
     * @property {domain.common.Image} defaultImage sprite's default image
     */
    pt.defaultImage = null

    pt.defaultDir = 'down'

    pt.defaultState = 'default'

    /**
     * Adds the src attr of the elem if the default state dir image exists.
     *
     * @override
     */
    pt.willShow = function () {

        parent.willShow.call(this)

        var defaultDirImage = this.dirStateImage[this.defaultDir]

        if (defaultDirImage != null && defaultDirImage[this.defaultState] != null) {

            this.applyImage(defaultDirImage[this.defaultState])

        }

    }

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction
     * @param {String} state The state
     */
    pt.setDirState = function (dir, state) {

        dir = dir || this.dir

        state = state || this.state

        if (!this.dirStateImage) {

            throw new Error('no image mapping in sprite.')

        }

        var img = this.dirStateImage[dir][state]

        if (!img) {

            throw new Error('illegal (dir, state): (' + dir + ', ' + state + ')')

        }

        this.applyImage(img)

    }

    /**
     * Applies the image to the element.
     *
     * @private
     * @param {domain.common.Image} img The image
     */
    pt.applyImage = function (img) {

        img.apply(this.elem)

    }

})
