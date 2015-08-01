/**
 * PlayScene controlls the main playing scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.PlayScene = subclass(domain.common.Role, function (pt) {
    'use strict';


    /**
     * Initializes the scene.
     */
    pt.init = function () {

        var pos = this.pos = new domain.level.DimensionFactory();

        // continuous actors
        this.ball = this.elem.find('.ball').getActor();
        this.character = this.elem.find('.character-on-level').getActor().character;
        this.level = this.elem.getRole('intro-scene').level;
        this.chr = this.elem.find('.character-on-level').getActor();

        // prepare dimensions
        var fieldDimension = pos.fieldPosition();
        var prepDimension = pos.evalRoomPosition();
        var exitQueueDimension = pos.queuePosition();
        var fusionDimension = pos.fusionBoxPosition();

        // models
        this.cells = new domain.level.FieldCells(fieldDimension, '#main');
        this.cells.loadFromObjectList(this.level.cells.cells);
        this.field = $('.field-grid').getActor();
        this.field.setDimension(fieldDimension);

        // services
        this.fps = new domain.level.FusionPreparationService(prepDimension);
        this.fusionService = new domain.level.FusionService(fusionDimension, '#main');
        this.exitQueue = new domain.level.ExitQueue(exitQueueDimension);

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.ball, this.cells);

        // ui components
        this.swipe = new ui.level.SwipeEvent('.wrapper');
        this.scoreboard = this.elem.find('.scoreboard').getActor();
        this.scoreboard.setDimension(pos.scoreboardDimension());
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));

        var that = this;

        this.start().then(function () {

            that.end();

        });

    };


    pt.spawnScoreboard = function () {

        $('<div class="scoreboard" />').appendTo(this.elem);

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


        }).filterNull().map(function (pairs) {


            return new domain.level.FusionPair(pairs[0], pairs[1]);


        }).pipe(function (fusionPair) {

            that.scoreboard.addScore(fusionPair.score());

            return that.fusionService.performFusion(fusionPair);


        }).pipe(function (newCell) {


            return that.exitQueue.enqueue(newCell);


        }).filter(function (cell) {


            return cell.isLastOne();


        }).map(function () {


            if (!that.exitQueue.theLastOneIsEvolved()) {

                return;

            }


            that.character.playingState.bump();

            return that.cells.loadList(that.exitQueue.releaseCells()).appear();


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
        this.menuButton.show();

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

            return that.bindEventHandlers(that.swipe.getStream());

        }).then(function () {

            console.log('swipe stream finished!');

            that.swipe.unbind();

        });

    };

    pt.end = function () {

        this.character.clearPlayingState();

        this.elem.getRole('outro-scene').init();

    };

});


$.CC.assign('play-scene', scene.level.PlayScene);
