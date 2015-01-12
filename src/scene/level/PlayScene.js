/**
 * @class
 * @extends scene.common.Scene
 *
 * PlayScene controlls the main playing scene of the level page.
 */
scene.level.PlayScene = (function () {
    'use strict';


    /**
     * @constructor
     * @param {scene.common.Scene} prevScene
     */
    var exports = function (prevScene) {

        var pos = this.pos = prevScene.pos;

        // continuous actors
        this.ball = prevScene.ball;
        this.level = prevScene.level;
        this.chr = prevScene.chr;

        // prepare dimensions
        var fieldDimension = pos.fieldPosition();
        var prepDimension = pos.evalRoomPosition();
        var exitQueueDimension = pos.queuePosition();
        var fusionDimension = pos.fusionBoxPosition();

        // datadomain
        this.playingState = new datadomain.PlayingState(this.chr.name);

        // models
        this.cells = new domain.level.FieldCells(fieldDimension, '#main');
        this.cells.loadFromObjectList(this.level.cells);
        this.field = new domain.level.Field(fieldDimension);

        // services
        this.fps = new domain.level.FusionPreparationService(prepDimension);
        this.fusionService = new domain.level.FusionService(fusionDimension, '#main');
        this.exitQueue = new domain.level.ExitQueue(exitQueueDimension);

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.ball, this.cells);

        // ui components
        this.swipe = new ui.level.SwipeEvent('.wrapper');
        this.scoreBoard = new ui.level.Scoreboard(pos.scoreboardDimension());
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));

        // debug things
        this.fCounter = new debug.FusionCounter();

    };


    var psPt = exports.prototype = new scene.common.Scene();



    /**
     * Binds event handlers to the stream.
     *
     * @param {Rx.Observable} source The source stream
     * @return {Rx.Observer}
     */
    psPt.bindEventHandlers = function (source) {

        var that = this;

        return source.pipe(function (dir) {


            that.playingState.add(dir);

            that.playingState.save();

            return that.bms.ballMoveAndLeaveOne(dir);


        }).filterNull().pipe(function (cell) {


            return that.fps.take(cell);


        }).filterNull().map(function (pairs) {


            return new domain.level.FusionPair(pairs[0], pairs[1]);


        }).pipe(function (fusionPair) {


            that.fCounter.count(fusionPair);

            console.log(that.fCounter.toString());

            that.scoreBoard.addScore(fusionPair.score());

            return that.fusionService.performFusion(fusionPair);


        }).pipe(function (newCell) {


            return that.exitQueue.enqueue(newCell);


        }).filter(function (cell) {


            return cell.isLastOne();


        }).pipe(function () {

            that.playingState.bump();

            that.cells.loadList(that.exitQueue.queue.splice(0).map(function (queuee) {

                return queuee.cell;

            }));

            return that.cells.appear();


        }).getPromise().then(function () {

            return wait(500);

        });

    };

    /**
     * Starts the scene.
     *
     * @return {Promise}
     */
    psPt.start = function () {

        var that = this;

        this.scoreBoard.appear();
        this.menuButton.show();

        return this.field.appear().then(function () {

            return that.chr.speechEndPromise;

        }).then(function () {

            return that.playingState.restore();

        }).then(function () {

            return that.cells.appear();

        }).then(function () {

            var rounds = that.playingState.rounds.splice(0);

            that.playingState.bump();

            return rounds.reverse().reduce(function (promise, round) {

                return promise.then(function () {

                    var dirs = round.map(function (dir, i) { return wait(i * 180, dir); });

                    return that.bindEventHandlers(dirs.toFlatStream());

                });

            }, Promise.resolve());


        }).then(function () {

            console.log('start!');

            return that.bindEventHandlers(that.swipe.getStream());

        });

    };


    psPt.resetPlayingState = function () {

        this.playingState.rounds = [[]];
        this.playingState.save();

    };

    return exports;

}());
