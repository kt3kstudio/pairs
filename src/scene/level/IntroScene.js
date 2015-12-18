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
     * @protected
     * @return {Promise}
     */
    pt.main = function () {

        var self = this

        this.layoutManager = new scene.level.IntroSceneLayoutManager()

        this.load().then(function () {

            self.setUp()

            return self.start()

        }).then(function () {

            // goes to next scene
            return self.elem.trigger('main.play-scene')

        })

    }.event('scene-start')

    /**
     * Loads the data
     *
     * @protected
     * @return {Promise}
     */
    pt.load = function () {

        var self = this

        return new datadomain.UserRepository().get().then(function (user) {

            return new datadomain.CharacterRepository().getById(user.charId)

        }).then(function (character) {

            self.character = character

            return new datadomain.LevelRepository().getById(character.position.floorObjectId)

        }).then(function (level) {

            self.level = level

        })

    }

    /**
     * Sets up the components.
     *
     * @protected
     * @return {Promise}
     */
    pt.setUp = function () {

        this.spawnBall()
        this.spawnPaper()
        this.spawnCharacter(this.character)

        var centerGrid = this.layoutManager.centerGrid()

        this.getPaper().setGrid(centerGrid, 0, 0)

        this.getCharacter().setGrid(centerGrid, 0, 1)

        this.getCharacter().fitToGrid()

    }

    /**
     * Starts the scene
     *
     * @return {Promise}
     */
    pt.start = function () {

        var that = this

        this.getPaper().show()

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
