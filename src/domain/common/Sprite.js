import GridWalker from './GridWalker'

/**
 * Sprite class changes its image according to its direction and state.
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

    /**
     * Adds the src attr of the elem if the default state dir image exists.
     *
     * @override
     * @param {number} dur The duration
     */
    willShow(dur) {

        this.updateElemByDirState()

        return super.willShow(dur)

    }

    /**
     * Changes the direction and state.
     *
     * @param {String} dir The direction
     * @param {String} state The state
     */
    setDirState(dir, state) {

        this.dir = dir
        this.state = state

        this.updateElemByDirState()

    }

    /**
     * Updates the element by the dir and state.
     */
    updateElemByDirState() {

        this.dirStateImage.get(this.dir || this.defaultDir(), this.state || this.defaultState()).apply(this.elem)

    }

    /**
     * Keeps the direction and sets the given state.
     *
     * @param {String} state The state
     */
    setState(state) {

        this.state = state

        this.updateElemByDirState()

    }

    /**
     * Sets the direction.
     *
     * @param {String} dir The direction
     */
    setDir(dir) {

        this.dir = dir

        this.updateElemByDirState()

    }

}
