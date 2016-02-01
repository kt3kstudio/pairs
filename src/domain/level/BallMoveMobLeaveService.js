import PossibleMoveDetectionService from './PossibleMoveDetectionService'

/**
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 * @class
 */
domain.level.BallMoveMobLeaveService = subclass(function (pt) {
    'use strict'

    /**
     * @constructor
     * @param {domain.level.Ball} ball The ball
     * @param {domain.level.CellCollection} cells The cells
     */
    pt.constructor = function (ball, cells) {

        this.ball = ball
        this.mobs = new Mobs(cells)

        this.pmds = new PossibleMoveDetectionService(this.ball, cells)

    }

    /**
     * Processes the stream of direction and returns the stream of cells.
     *
     * @param {Rx.Observable<String>} dirStream The stream of directions
     * @return {Rx.Observable<domain.level.Cell>}
     */
    pt.processDirStream = function (dirStream) {

        var self = this

        return dirStream.pipe(function (dir) {

            return self.ballMoveAndLeaveOne(dir)

        }).filterNull()

    }

    /**
     * Makes the ball move to the specified direction and a mob leave the field.
     *
     * @param {String} dir The direction the ball moves (up|down|right|left)
     * @returns {domain.level.Cell|Rx.Observable} A promise which resolves when the mob(bom) left the field
     */
    pt.ballMoveAndLeaveOne = function (dir) {

        var pos = this.ball.posAhead(dir)

        if (this.mobs.find(pos) == null) {

            this.ball.refuseToMove(dir)

            return null

        }

        this.ball.move(dir)

        return this.leaveAtPos(pos)

    }

    /**
     * Make the mob at the ball leave the field.
     *
     * @return {domain.level.Cell}
     */
    pt.leaveLastOneAtBall = function () {

        return this.mobs.leave(this.ball.pos()).setLastOne()

    }

    /**
     * Make a mob at the specified position leave the field.
     *
     * @param {Object} pos The position
     * @return {domain.level.Cell|Rx.Observable}
     */
    pt.leaveAtPos = function (pos) {

        var that = this

        var mob = this.mobs.leave(pos)

        if (this.pmds.possible()) {

            return mob

        }

        console.log('no more move!')

        if (this.pmds.cellRemainsAtBall()) {

            console.log('cell remains at ball')

            return [mob, wait(600).then(function () {

                return that.leaveLastOneAtBall()

            })].toFlatStream()

        }

        console.log('no cell left')

        return mob.setLastOne()

    }

    /**
     * Mobs is the role class which represents the collection of cells on and below the field.
     *
     * Mobs is the adaptor class of domain.level.FieldCells class into the BallMoveMobLeaveService context.
     *
     * @class domain.level.BallMoveMobLeaveService.Mobs
     * @private
     */
    var Mobs = subclass(function (pt) {

        /**
         * @constructor
         * @param {domain.level.CellCollection} cells The collection of cells
         */
        pt.constructor = function (cells) {

            this.cells = cells

        }

        /**
         * Check if the field is empty of cells.
         *
         * @return {Boolean}
         */
        pt.isEmpty = function () {

            return this.cells.isEmpty()

        }

        /**
         * Makes the cell at the position leave the field.
         *
         * @param {Object} pos The position
         */
        pt.leave = function (pos) {

            var w = this.cells.select(pos)

            this.cells.remove(w)

            w = w[0]

            this.cells.selectRange(pos).forEach(function (cell) {

                cell.up()

            })

            return w

        }

        /**
         * Finds the cell at the position.
         *
         * @param {Object} pos The position
         */
        pt.find = function (pos) {

            return this.cells.find(pos)

        }

    })

})
