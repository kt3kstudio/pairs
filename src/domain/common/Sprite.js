import GridWalker from './GridWalker'

/**
 * Sprite (or DirectionalStateImageDimensionalBeing) class changes its image according to its direction and state.
 */
export default class Sprite extends GridWalker {

    /**
     * @override
     * @return {Number} originX
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */
    ratioX() { return 0.5 }

    /**
     * @override
     * @return {Number} originY
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */
    ratioY() { return 1 }

    /**
     * @return { Object<Object<Image>>} stateImage The map of state to image url.
     */
    dirStateImage() { return null }

    /**
     * Returns the default direction.
     *
     * @abstract
     */
    defaultDir() { return 'down' }

    /**
     * Returns the default state.
     *
     * @abstract
     */
    defaultState() { return 'default' }

    constructor(elem) {

        super(elem)

        /**
         * @property {String} dir The direction
         */
        this.dir = null

        /**
         * @property {String} state The state
         */
        this.state = null

    }

    /**
     * Adds the src attr of the elem if the default state dir image exists.
     *
     * @override
     */
    willShow() {

        super.willShow(this)

        const defaultDirImage = this.dirStateImage()[this.defaultDir()]

        if (defaultDirImage != null && defaultDirImage[this.defaultState()] != null) {

            this.applyImage(defaultDirImage[this.defaultState()])

        }

    }

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction
     * @param {String} state The state
     */
    setDirState(dir, state) {

        dir = dir || this.dir

        state = state || this.state

        if (!this.dirStateImage()) {

            throw new Error('no image mapping in sprite.')

        }

        const img = this.dirStateImage()[dir][state]

        if (!img) {

            throw new Error('illegal (dir, state): (' + dir + ', ' + state + ')')

        }

        this.applyImage(img)

    }

    /**
     * Keeps the direction and sets the given state.
     *
     * @param {String} state The state
     */
    setState(state) {

        this.setDirState(this.dir, state)

    }

    /**
     * Sets the direction.
     *
     * @param {String} dir The direction
     */
    setDir(dir) {

        this.setDirState(dir, this.state)

    }

    /**
     * Applies the image to the element.
     *
     * @private
     * @param {Image} img The image
     */
    applyImage(img) {

        img.apply(this.elem)

    }

}
