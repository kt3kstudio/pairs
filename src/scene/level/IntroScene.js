/**
 * IntroScene class handles the introduction scene of the level page.
 *
 * @class
 * @extends scene.level.Context
 */
scene.level.IntroScene = subclass(scene.level.Context, function (pt) {
    'use strict'

    /**
     * The entry point of the level scene.
     *
     * @return {Promise}
     */
    pt.init = function () {

        var self = this

        this.load().then(function () {

            self.start()

        })

    }.event('scene-start')

    /**
     * Loads the data
     */
    pt.load = function () {

        var that = this

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId)

        }).then(function (character) {

            that.character = character

            return new datadomain.LevelRepository().getById(character.position.floorObjectId)

        }).then(function (level) {

            that.level = level

        })

    }

    /**
     * Starts the scene
     *
     * @return {Promise}
     */
    pt.start = function () {

        var that = this

        this.spawnBall()
        this.spawnPaper()
        this.spawnCharacter(that.character)

        var centerGrid = this.getDimensionFactory().centerGrid()

        var paper = this.getPaper()

        var chr = this.getCharacter()

        chr.setGrid(centerGrid, 0, 1)

        chr.fitToGrid()

        paper.setGrid(centerGrid, 0, 0)

        paper.show()

        return ui.common.BackgroundService.turnWhite().then(function () {

            return that.getCharacter().moveUpOnGrid(600)

        }).then(function () {

            // the character takes the paper in the room.
            that.getPaper().disappear()

            var goals = $('<p />').text(that.level.goal.toString())

            // the character read up the goals of the room
            return that.getCharacter().speak(goals, {cancelDom: '.wrapper'})

        }).then(function () {

            that.getCharacter().hide()

            return that.getBall().show()

        }).then(function () {

            return that.elem.trigger('play-scene-start')

        })

    }

    /**
     * Spawns the ball.
     *
     * @private
     */
    pt.spawnBall = function () {

        $($('#tpl-ball').html()).css({display: 'none'}).data({

            grid: this.getDimensionFactory().playGrid(),
            pos: {m: 1, n: 1}

        }).appendTo(this.elem).cc.init('ball')

    }

    /**
     * Spawns the paper.
     *
     * @private
     */
    pt.spawnPaper = function () {

        $('<img />').appendTo(this.elem).cc.init('paper')

    }

    /**
     * Spawns the character sprite.
     *
     * @private
     */
    pt.spawnCharacter = function (character) {

        $('<img />').appendTo(this.elem).data({character: character}).cc.init('character-on-level')

    }

})

$.cc.assign('intro-scene', scene.level.IntroScene)
