/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.PlayScene = subclass(scene.level.Context, function (pt) {
    'use strict';

    /**
     * Initializes the scene.
     */
    pt.init = function () {

        var pos = this.pos = new domain.level.DimensionFactory();

        // continuous actors
        this.ball = this.elem.find('.ball').cc.getActor();
        this.character = this.elem.find('.character-on-level').cc.getActor().character;
        this.level = this.elem.cc.get('intro-scene').level;
        this.chr = this.elem.find('.character-on-level').cc.getActor();

        // prepare dimensions
        var fieldDimension = pos.fieldPosition();
        var prepDimension = pos.evalRoomPosition();
        var exitQueueDimension = pos.queuePosition();
        var fusionDimension = pos.fusionBoxPosition();

        // models
        this.cells = this.elem.cc.get('cell-collection');
        this.cells.setDimension(fieldDimension);
        this.cells.loadFromObjectList(this.level.cells.cells);

        this.field = $('.field-grid').cc.getActor();
        this.field.setDimension(fieldDimension);

        // services
        this.fps = new domain.level.FusionPreparationService(prepDimension);
        this.fusionService = this.elem.cc.get('fusion-service').setDimension(fusionDimension);
        this.exitQueue = new domain.level.ExitQueue(exitQueueDimension);

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.ball, this.cells);

        // init scoreboard dimension
        this.scoreboard = this.elem.find('.scoreboard').cc.getActor();
        this.scoreboard.setDimension(pos.scoreboardDimension());

        var that = this;

        this.start().then(function () {

            that.end();

        });

    };


    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} source The source stream
     * @return {Rx.Observer}
     */
    pt.bindEventHandlers = function (source) {

        var that = this;

        return source.pipe(function (dir) {

            that.character.playingState.add(dir);

            that.character.savePlayingState();

            return that.bms.ballMoveAndLeaveOne(dir);


        }).filterNull().pipe(function (cell) {


            return that.fps.take(cell);


        }).filterNull().pipe(function (fusionPair) {

            that.scoreboard.addScore(fusionPair.score());

            return that.fusionService.performFusion(fusionPair);


        }).pipe(function (newCell) {


            return that.exitQueue.enqueue(newCell).then(function () {

                return newCell;

            });


        }).filter(function (cell) {


            return cell.isLastOne();


        }).map(function () {


            if (!that.exitQueue.theLastOneIsEvolved()) {

                // this finishes the main stream and therefore resolves the promise
                return;

            }


            that.character.playingState.bump();

            return that.cells.loadList(that.exitQueue.releaseCells()).resetShapeAndLocate();


        }).takeWhile(function (x) {

            return x != null;

        }).getPromise().then(function () {

            return wait(500);

        });

    };

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    pt.start = function () {

        var that = this;

        this.scoreboard.appear();
        this.getMenuButton().show();

        return this.field.appear().then(function () {

            return that.chr.speechEndPromise;

        }).then(function () {

            return that.character.reloadPlayingState();

        }).then(function () {

            return that.cells.appear();

        }).then(function () {

            return that.character.playingState.release().reduce(function (promise, round) {

                return promise.then(function () {

                    var dirs = round.map(function (dir, i) { return wait(i * 180, dir); });

                    return that.bindEventHandlers(dirs.toFlatStream());

                });

            }, Promise.resolve());


        }).then(function () {

            console.log('swipe stream start!');

            return that.bindEventHandlers(that.getDirStream());

        }).then(function () {

            console.log('swipe stream finished!');

            that.removeSwipeField();

        });

    };

    /**
     * Gets the stream of direction symbols of the swipe field.
     *
     * @return {Rx.Observable}
     */
    pt.getDirStream = function () {

        var field = $('.swipe-field');

        return Rx.Observable.merge(
            field.streamOf('swipeup').map('up'),
            field.streamOf('swipedown').map('down'),
            field.streamOf('swipeleft').map('left'),
            field.streamOf('swiperight').map('right')
        );

    };

    /**
     * Removes the swipe field.
     */
    pt.removeSwipeField = function () {

        $('.swipe-field').remove();

    };

    /**
     * Ends the playing scene, clear playing data, and kicks the next scene.
     */
    pt.end = function () {

        this.character.clearPlayingState();

        this.elem.cc.get('outro-scene').init();

    };

});


$.cc.assign('play-scene', scene.level.PlayScene);
