/**
 * The image object
 */
export default class Image {

    /**
     * @constructor
     * @param {String} src The url of the image
     * @param {Boolean} mirrorX If the image is mirrored by x-axis
     * @param {Boolean} mirrorY If the image is mirrored by y-axis
     */
    constructor(src, mirrorX, mirrorY) {

        this.src = src
        this.mirrorX = mirrorX
        this.mirrorY = mirrorY

        this.scaleX = this.mirrorX ? -1 : 1
        this.scaleY = this.mirrorY ? -1 : 1

    }

    /**
     * Apply the image src and style to the element.
     *
     * @param {jQuery} elem The element to apply the image info (needs to be <img> jquery object)
     */
    apply(elem) {

        elem.css('transform', this.makeTransform())

        elem.attr('src', this.src)

    }

    /**
     * Makes the transform style.
     *
     * @private
     * @return {String}
     */
    makeTransform() {

        return 'scale(' + this.scaleX + ', ' + this.scaleY + ')'

    }

}
