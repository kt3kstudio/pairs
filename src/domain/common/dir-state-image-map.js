
/**
 * The model of the mapping from the direction and state to its corresponding image.
 */
export default class DirStateImageMap {

    constructor() {

        this.imageMap = {}

    }

    /**
    * @param {string} dir The direction
    * @param {string} state The state
    * @param {Image} image The image
     */
    addImageByDirState(image, dir, state) {

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
