/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.PlayScene = subclass(scene.level.Context, function (pt) {
    'use strict'

    /**
     * Initializes the scene.
     */
    pt.init = function () {

        this.character = this.getCharacter().character
        this.level = this.elem.cc.get('intro-scene').level

        // models
        this.cells = this.elem.cc.get('cell-collection')
        this.cells.setGrid(this.getDimensionFactory().playGrid())
        this.cells.loadFromObjectList(this.level.cells.cells)

        this.getField().setRect(this.getDimensionFactory().fieldRect())

        // services
        this.fps = new domain.level.FusionPreparationService(this.getDimensionFactory().evalRoomGrid())
        this.fusionService = this.elem.cc.get('fusion-service').setGrid(this.getDimensionFactory().fusionBoxGrid())
        this.exitQueue = new domain.level.ExitQueue(this.getDimensionFactory().queueGrid())

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.getBall(), this.cells)

        // init scoreboard dimension
        this.getScoreboard().setRect(this.getDimensionFactory().scoreboardRect())

        var that = this

        this.start().then(function (playerWon) {

            that.end(playerWon)

        })

    }.event('play-scene-start')

    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} source The source stream
     * @return {Promise}
     */
    pt.playLoop = function (source) {

        var that = this

        return source.pipe(function (dir) {
            that.character.playingState.add(dir)

            that.character.savePlayingState()

            return that.bms.ballMoveAndLeaveOne(dir)
        }).filterNull().pipe(function (cell) {
            return that.fps.take(cell)
        }).filterNull().pipe(function (fusionPair) {
            that.getScoreboard().addScore(fusionPair.score())

            return that.fusionService.performFusion(fusionPair)
        }).pipe(function (newCell) {
            return that.exitQueue.enqueue(newCell).then(function () {
                return newCell
            })
        }).filter(function (cell) {
            return cell.isLastOne()
        }).map(function () {
            if (!that.exitQueue.theLastOneIsEvolved()) {
                // this finishes the main stream and therefore resolves the promise
                return
            }

            that.character.playingState.bump()

            return that.cells.loadList(that.exitQueue.releaseCells()).resetShapeAndLocate()
        }).takeWhile(function (x) {
            return x != null
        }).getPromise().then(function () {
            return wait(0)
        })
    }

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    pt.start = function () {
        var that = this

        this.getScoreboard().appear()
        this.getMenuButton().show()

        return this.getField().appear().then(function () {
            return that.getCharacter().speechEndPromise
        }).then(function () {
            return that.character.reloadPlayingState()
        }).then(function () {
            return that.cells.appear()
        }).then(function () {
            return that.character.playingState.release().reduce(function (promise, round) {
                return promise.then(function () {
                    var dirs = round.map(function (dir, i) { return wait(i * 180, dir) })

                    return that.playLoop(dirs.toFlatStream())
                })
            }, Promise.resolve())
        }).then(function () {
            console.log('swipe stream start!')

            return that.playLoop(that.getDirStream())
        }).then(function () {
            console.log('swipe stream finished!')

            that.removeSwipeField()
        })
    }

    /**
     * Gets the stream of direction symbols of the swipe field.
     *
     * @return {Rx.Observable}
     */
    pt.getDirStream = function () {
        var field = $('.swipe-field')

        return Rx.Observable.merge(
            field.streamOf('swipeup').map('up'),
            field.streamOf('swipedown').map('down'),
            field.streamOf('swipeleft').map('left'),
            field.streamOf('swiperight').map('right')
        )
    }

    /**
     * Removes the swipe field.
     */
    pt.removeSwipeField = function () {
        $('.swipe-field').remove()
    }

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     *
     * @param {Boolean} playerWon True if the player won the game
     */
    pt.end = function (playerWon) {
        this.character.clearPlayingState()

        if (playerWon) {
            this.elem.trigger('play-scene-success')
        } else {
            this.elem.trigger('play-scene-failure')
        }
    }
})

$.cc.assign('play-scene', scene.level.PlayScene)
