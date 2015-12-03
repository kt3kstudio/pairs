/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
domain.level.Cell = subclass(domain.common.GridWalker, function (pt, parent) {
    'use strict'

    pt.cellRatioX = 0.65
    pt.cellRatioY = 0.65

    /**
     * @constructor
     * @param {String} gene The gene string
     * @param {String|HTMLElement} parent The parent dom
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem)

        this.gene = elem.data('gene')

        this.__isLastOne = false
        this.__isEvolved = false

        pt.constructor.allList.push(this)

    }

    pt.constructor.allList = []

    pt.constructor.disappear = function () {

        return pt.constructor.allList.map(function (cell, i) {

            wait(40 * i).then(function () {

                return cell.disappear()

            })

        }).pop()

    }

    /**
     * Sets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.setLastOne = function () {

        this.__isLastOne = true

        return this

    }

    /**
     * Unsets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.unsetLastOne = function () {

        this.__isLastOne = false

        return this

    }

    /**
     * Returns true if it's the last one of the round.
     *
     * @return {Boolean}
     */
    pt.isLastOne = function () {

        return this.__isLastOne

    }

    /**
     * Sets the flag of being evolved from the parents.
     */
    pt.setEvolved = function () {

        this.__evolved = true

        return this

    }

    /**
     * Unsets the flag of being evolved.
     */
    pt.unsetEvolved = function () {

        this.__evolved = false

        return this

    }

    /**
     * Returns true if it's evolved from its parents, otherwise false.
     *
     * @return {Boolean}
     */
    pt.isEvolved = function () {

        return this.__evolved

    }

    /**
     * Chooses the image for the gene.
     *
     * @private
     * @return {String}
     */
    pt.selectImage = function () {

        if (this.gene === 'f') {

            return 'images/neef.svg'

        }

        if (this.gene === 'm') {

            return 'images/nim.svg'

        }

        if (this.gene === 'a') {

            return 'images/ankh.svg'

        }

        if (this.gene === 'w') {

            return 'images/wheel.svg'

        }

        if (this.gene === 'b') {

            return 'images/box.svg'

        }

        var cellKind = domain.common.BomTable[this.gene.length]

        return 'images/' + cellKind + '.svg'

    }

    /**
     * Creates the dom for this
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        var that = this

        var elem = this.elem

        return parent.willShow.apply(this, arguments).then(function () {

            elem.attr('data', that.selectImage())

            that.setTransitionDuration(300)

            return elem.once('load')

        }).then(function () {

            that.fitToGrid()

            var genes = that.gene.split('')

            var $svg = $(elem[0].contentDocument)

            for (var i = 0; i < genes.length; i++) {

                $('#' + i, $svg).attr('class', genes[i])

            }

        })

    }

    /**
     * Reset the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    pt.resetShapeAndLocate = function () {

        return this.fitToGrid()

    }

    pt.showAnim = new domain.common.Animation('bom-appear', 500)

    pt.hideAnim = new domain.common.Animation('bom-disappear', 500)

    pt.didAppear = function () {

        return this

    }

    pt.anim = function (animationName, duration) {

        return this.elem.anim(animationName, duration)

    }

    pt.remove = function () {

        this.elem.remove()

        pt.constructor.allList.splice(pt.constructor.allList.indexOf(this), 1)

    }

    pt.up = function () { return this.moveUpOnGrid() }
    pt.down = function () { return this.moveDownOnGrid() }
    pt.left = function () { return this.moveLeftOnGrid() }
    pt.right = function () { return this.moveRightOnGrid() }

})

$.cc.assign('cell', domain.level.Cell)
