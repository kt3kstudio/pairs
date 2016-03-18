import {wait, Animation} from 'spn'
import BomTable from '../../domain/common/BomTable'
import GridWalker from '../../domain/common/GridWalker'

const {component} = $.cc

const ALL_CELLS = []
/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
@component('cell')
export default class Cell extends GridWalker {

    cellRatioX() { return 0.65 }
    cellRatioY() { return 0.65 }

    /**
     * @constructor
     * @param {String} gene The gene string
     * @param {String|HTMLElement} parent The parent dom
     */
    constructor(elem) {

        super(elem)

        this.gene = elem.data('gene')

        this.__isLastOne = false
        this.__isEvolved = false

        ALL_CELLS.push(this)

    }

    static disappear() {

        return ALL_CELLS.map((cell, i) => wait(40 * i).then(() => cell.disappear())).pop()

    }

    /**
     * Sets the flag of the last one.
     *
     * @return {Cell}
     */
    setLastOne() {

        this.__isLastOne = true

        return this

    }

    /**
     * Unsets the flag of the last one.
     *
     * @return {Cell}
     */
    unsetLastOne() {

        this.__isLastOne = false

        return this

    }

    /**
     * Returns true if it's the last one of the round.
     *
     * @return {Boolean}
     */
    isLastOne() {

        return this.__isLastOne

    }

    /**
     * Sets the flag of being evolved from the parents.
     */
    setEvolved() {

        this.__evolved = true

        return this

    }

    /**
     * Unsets the flag of being evolved.
     */
    unsetEvolved() {

        this.__evolved = false

        return this

    }

    /**
     * Returns true if it's evolved from its parents, otherwise false.
     *
     * @return {Boolean}
     */
    isEvolved() {

        return this.__evolved

    }

    /**
     * Chooses the image for the gene.
     *
     * @private
     * @return {String}
     */
    selectImage() {

        if (this.gene === 'f') {

            return 'img/neef.svg'

        }

        if (this.gene === 'm') {

            return 'img/nim.svg'

        }

        if (this.gene === 'a') {

            return 'img/ankh.svg'

        }

        if (this.gene === 'w') {

            return 'img/wheel.svg'

        }

        if (this.gene === 'b') {

            return 'img/box.svg'

        }

        const cellKind = BomTable[this.gene.length]

        return 'img/' + cellKind + '.svg'

    }

    /**
     * Creates the dom for this
     *
     * @return {jQuery}
     */
    willShow() {

        return super.willShow()

        .then(() => {

            this.elem.attr('data', this.selectImage())

            this.setTransitionDuration(300)

            return this.elem.once('load')

        })

        .then(() => {

            this.fitToGrid()

            const genes = this.gene.split('')

            const $svg = $(this.elem[0].contentDocument)

            for (let i = 0; i < genes.length; i++) {

                $('#' + i, $svg).attr('class', genes[i])

            }

        })

    }

    /**
     * Reset the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    resetShapeAndLocate() {

        return this.fitToGrid()

    }

    showAnim() { return new Animation('bom-appear', 500) }

    hideAnim() { return new Animation('bom-disappear', 500) }

    remove() {

        this.elem.remove()

        ALL_CELLS.splice(ALL_CELLS.indexOf(this), 1)

    }

    /**
     * Animates the cell using the give css animation with the given duration.
     *
     * @param {string} animation
     * @param {number} duration
     */
    anim(animation, duration) {

        return this.elem.anim(animation, duration)

    }

    up() {

        return this.moveUpOnGrid()

    }

    down() {

        return this.moveDownOnGrid()

    }

    left() {

        return this.moveLeftOnGrid()

    }

    right() {

        return this.moveRightOnGrid()

    }

}
