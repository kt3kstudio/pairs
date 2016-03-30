/**
 * Sprite class changes its image according to its direction and state.
 *
 * This is a trait class. Use with traits syntax like `traits-decorator`.
 */
export default class Sprite {

    /**
     * Changes the direction and state.
     * @param {String} dir The direction
     * @param {String} state The state
     */
    setDirState(dir = null, state = null) {

        this.dir = dir || this.dir
        this.state = state || this.state

        this.updateElemByDirState()

    }

    /**
     * Updates the element by the dir and state.
     */
    updateElemByDirState() {

        this.dirStateImage.get(this.dir || this.defaultDir(), this.state || this.defaultState()).apply(this.elem)

    }

    /**
     * Updates sprite related things.
     */
    updateSprite() {

        this.updateElemByDirState()

    }

    /**
     * Keeps the direction and sets the given state.
     *
     * @param {string} state The state
     */
    setState(state) {

        this.setDirState(null, state)

    }

    /**
     * Sets the direction.
     * @param {string} dir The direction
     */
    setDir(dir) {

        this.setDirState(dir, null)

    }

}
