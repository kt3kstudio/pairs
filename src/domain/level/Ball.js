/**
 * Ball class represents the ball inside the field of the level.
 *
 * @class
 */
domain.level.Ball = subclass(domain.common.GridWalker, function (pt, parent) {
    'use strict'

    var TRANS_DUR = 150

    var MAX = 3

    pt.constructor = function (elem) {

        parent.constructor.apply(this, arguments)

        var pos = elem.data('pos') || {m: 1, n: 1}

        this.setGrid(elem.data('grid'), pos.m, pos.n)
        this.setTransitionDuration(TRANS_DUR)

    }

    pt.maxX = MAX
    pt.maxY = MAX

    pt.showAnim = 'ball-appear'
    pt.showAnimDur = TRANS_DUR

    pt.hideAnim = 'ball-disappear'
    pt.hideAnimDur = TRANS_DUR

    pt.willShow = function () {

        var elem = this.elem

        return parent.willShow.apply(this, arguments).then(function () {

            elem.css('display', 'inline')

        })
    }

    /**
     * Moves the ball to the direction.
     *
     * @param {String} dir
     * @return {Promise}
     */
    pt.move = function (dir) {

        return this.setPos(this.posAhead(dir))

    }

    /**
     * Moves to the center in x dir.
     *
     * @return {Promise}
     */
    pt.goCenterX = function () {

        return this.moveToM(1)

    }

    /**
     * Moves to the center in y dir.
     *
     * @return {Promise}
     */
    pt.goCenterY = function () {

        return this.moveToN(1)

    }

    pt.posAhead = function (dir) {

        switch (dir) {

            case 'up': return this.relativePos(0, -1)
            case 'down': return this.relativePos(0, 1)
            case 'left': return this.relativePos(-1, 0)
            case 'right': return this.relativePos(1, 0)

        }

    }

    pt.relativePos = function (m, n) {

        return {m: (this.m + m + this.maxX) % this.maxX, n: (this.n + n + this.maxY) % this.maxY}

    }

    pt.setPos = function (pos) {

        this.moveToGridPosition(pos.m, pos.n)

    }

    /**
     * Gets the current grid position.
     *
     * @return {Object}
     */
    pt.pos = function () {

        return {m: this.m, n: this.n}

    }

    pt.refuseToMove = function (dir) {

        if (dir === 'up' || dir === 'down') {

            return this.elem.anim('ball-refuse-y', TRANS_DUR)

        } else {

            return this.elem.anim('ball-refuse-x', TRANS_DUR)

        }

    }

})

$.cc.assign('ball', domain.level.Ball)
