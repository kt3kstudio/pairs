
/**
 * The model of the mapping from the direction and state to its corresponding image.
 */
export default class DirStateImageMap {

    /**
     * @param {Array<Array>}
     */
    constructor(items) {

        this.imageMap = {}

        this.addItems(items)

    }

    /**
     * Adds the items.
     *
     * @private
     * @param {Array<Array>}
     */
    addItems(items) {

        items.forEach(item => this.addItem(item))

    }

    /**
     * Adds the item.
     *
     * @private
     * @param {string} dir The direction
     * @param {string} state The state
     * @param {Image} image The image
     */
    addItem([dir, state, image]) {

        this.imageMap[this.getMapKey(dir, state)] = image

    }

    /**
     * Gets the image by the dir and state.
     *
     * @param {string} dir The direction
     * @param {string} state The state
     * @return {Image}
     */
    get(dir, state) {

        const image = this.imageMap[this.getMapKey(dir, state)]

        if (!image) {

            throw new Error('illegal (dir, state): (' + this.dir + ', ' + this.state + ')')

        }

        return image

    }

    /**
     * Returns the key string for the dir and state.
     *
     * @private
     * @param {string} dir The direction
     * @param {string} state The state
     * @return {string}
     */
    getMapKey(dir, state) {

        return `${dir}/${state}`

    }

}
