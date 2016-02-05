import MeioticService from '../genetics/MeioticService'

const meiosis = new MeioticService()
const getGene = cell => cell ? cell.gene : ''
const isLastOne = cell => cell ? cell.isLastOne() : false

/**
 * FusionPair represents the pair of cells which perform the fusion of them.
 */
export default class FusionPair {

    /**
     * @constructor
     * @param {domain.level.Cell} left The left cell
     * @param {domain.level.Cell} right The right cell
     */
    constructor(left, right) {

        this.left = left
        this.right = right

        this.__newGene__ = meiosis.recombination(this.leftGene(), this.rightGene())

    }

    /**
     * Creates a new gene from the pair of cells
     *
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */
    newGene() {

        return this.__newGene__

    }

    /**
     * Checks if the pair is evolving.
     *
     * @return {Boolean}
     */
    isEvolving() {

        const prevLength = Math.max(meiosis.virtualLength(this.leftGene()), meiosis.virtualLength(this.rightGene()))
        const newLength = meiosis.virtualLength(this.newGene())

        return newLength > prevLength

    }

    /**
     * Returns true if the pair is the last one of the round.
     *
     * @return {Boolean}
     */
    isLastOne() {

        return isLastOne(this.left) || isLastOne(this.right)

    }

    /**
     * Returns the left gene.
     *
     * @return {String}
     */
    leftGene() {

        return getGene(this.left)

    }

    /**
     * Returns the right gene.
     *
     * @return {String}
     */
    rightGene() {

        return getGene(this.right)

    }

    /**
     * Calculates the score of the pair.
     *
     * @return {Number} The score
     */
    score() {

        const length = meiosis.virtualLength(this.newGene())

        let s = Math.pow(length, 2) * 10

        if (this.isLastOne()) {

            s *= 2

        }

        return s

    }

}
