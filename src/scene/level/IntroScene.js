
/**
 * IntroScene class handles the introduction scene of the level page.
 *
 * @class
 * @extends scene.level.Context
 */
scene.level.IntroScene = subclass(scene.level.Context, function (pt) {
    'use strict';

    /**
     * The entry point of the level scene.
     *
     * @return {Promise}
     */
    pt.init = function () {

        var that = this;

        this.pos = new domain.level.DimensionFactory();

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId);

        }).then(function (character) {

            that.character = character;

            return new datadomain.LevelRepository().getById(character.position.floorObjectId);

        }).then(function (level) {

            that.level = level;

            that.spawnBall();
            that.spawnPaper();
            that.spawnCharacter(that.character);

            return that.start();

        });

    }.event('scene-start');

    pt.start = function () {

        var that = this;

        var paperPos = this.pos.paperPosition();

        this.chr = this.elem.find('.character-on-level').cc.getActor();
        this.paper = this.elem.find('.paper').cc.getActor();
        this.ball = this.elem.find('.ball').cc.getActor();

        this.chr.x = paperPos.left;
        this.chr.y = 800;

        this.chr.place();

        this.paper.x = paperPos.left;
        this.paper.y = paperPos.top;

        this.paper.appear();

        return ui.common.BackgroundService.turnWhite().then(function () {

            return that.chr.moveTo('y', paperPos.top, 600);

        }).then(function () {

            // the character takes the paper in the room.
            that.paper.disappear();

            var goals = $('<p />').text(that.level.goal.toString());

            // the character read up the goals of the room
            return that.chr.speak(goals, {cancelDom: '.wrapper'});

        }).then(function () {

            that.chr.hide();

            return that.ball.appear();

        }).then(function () {

            return that.elem.cc.get('play-scene').init();

        });

    };


    /**
     * Spawns the ball.
     *
     * @private
     */
    pt.spawnBall = function () {

        $($('#tpl-ball').html()).data({

            dimension: this.pos.fieldPosition(),
            pos: {x: 1, y: 1}

        }).appendTo(this.elem).cc.init('ball');

    };

    /**
     * Spawns the paper.
     *
     * @private
     */
    pt.spawnPaper = function () {

        $('<img />').appendTo(this.elem).cc.init('paper');

    };

    /**
     * Spawns the character sprite.
     *
     * @private
     */
    pt.spawnCharacter = function (character) {

        $('<img />').appendTo(this.elem).data({character: character}).cc.init('character-on-level');

    };

});

$.cc.assign('intro-scene', scene.level.IntroScene);
