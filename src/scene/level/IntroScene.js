
/**
 * IntroScene class handles the introduction scene of the level page.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.IntroScene = subclass(domain.common.Role, function (pt, parent) {
    'use strict';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var that = this;

        setTimeout(function () {

            that.init();

        });

    };

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

            return Promise.all([

                that.spawnBall(),
                that.spawnPaper(),
                that.spawnCharacter(that.character)

            ]);

        }).then(function () {

            return that.start();

        });
    };

    pt.start = function () {

        var that = this;

        var paperPos = this.pos.paperPosition();

        this.chr = this.elem.find('.character-on-level').getActor();
        this.paper = this.elem.find('.paper').getActor();
        this.ball = this.elem.find('.ball').getActor();

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

            return that.elem.getRole('play-scene').init();

        });

    };


    /**
     * Spawns the ball.
     *
     * @return {Promise}
     */
    pt.spawnBall = function () {

        $($('#tpl-ball').html()).data({

            dimension: this.pos.fieldPosition(),
            pos: {x: 1, y: 1}

        }).appendTo(this.elem);

        return $.CC.init('ball');

    };

    /**
     * Spawns the paper.
     *
     * @return {Promise}
     */
    pt.spawnPaper = function () {

        $('<img class="paper" />').appendTo(this.elem);

        return $.CC.init('paper');

    };

    /**
     * Spawns the character sprite.
     *
     * @return {Promise}
     */
    pt.spawnCharacter = function (character) {

        $('<img class="character-on-level" />').appendTo(this.elem).data({character: character});

        return $.CC.init('character-on-level');

    };

});

$.CC.assign('intro-scene', scene.level.IntroScene);
