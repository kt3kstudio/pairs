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

        // models
        this.map = new domain.level.Map(fieldDimension);
        this.map.loadFromBomList(this.level.cells);
        this.field = new domain.level.Field(fieldDimension);

        // services
        this.fps = new domain.level.FusionPreparationService(prepDimension);
        this.fusionService = new domain.level.FusionService(fusionDimension);
        this.exitQueue = new domain.level.ExitQueue(exitQueueDimension);

        // services
        this.bms = new domain.level.BallMoveMobLeaveService(this.ball, this.map);

        // ui components
        this.swipe = new ui.level.SwipeEvent('.wrapper');
        this.scoreBoard = new ui.level.Scoreboard(pos.scoreboardDimension());
        this.menuButton = $('.menu-button').menuButton($('#level-menu'));

        // debug things
        this.pointBox = debug.PointBox; // singleton

    };


    var psPt = exports.prototype = new scene.common.Scene();


    /**
     * Starts the scene.
     */
    psPt.start = function () {

        var that = this;


        this.subscription = this.swipe.getStream().pipe(function (dir) {

            return that.bms.ballMoveAndLeaveOne(dir);

        }).filterNull().pipe(function (cell) {

            return that.fps.take(cell);

        }).filterNull().map(function (pairs) {

            return new domain.level.FusionPair(pairs[0], pairs[1]);

        }).pipe(function (fusionPair) {

            that.scoreBoard.addScore(fusionPair.score());

            that.pointBox.countUp(fusionPair.leftGene(), fusionPair.rightGene());

            return that.fusionService.performFusion(fusionPair);

        }).pipe(function (newCell) {

            return that.exitQueue.enqueue(newCell);

        }).filter(function (cell) {

            return cell.isLastOne;

        }).forEach(function () {

            that.swipe.unbind();
            that.subscription.dispose();
            that.finish();

        }, function (e) {
            console.log (e);
            console.log (e.stack);
        });


        this.scoreBoard.appear();
        this.menuButton.show();

        return that.field.appear().then(function () {

            return that.chr.speechEndPromise;

        }).then(function () {

            return that.map.appear('#main');

        });

    };


    return exports;

}());
