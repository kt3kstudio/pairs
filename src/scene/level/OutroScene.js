/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.OutroScene = subclass(scene.level.Context, function (pt, parent) {
    'use strict'

    pt.main = function () {

        parent.main.apply(this, arguments)

    }.event('play-scene-success play-scene-failure')

    /**
     * Sets up the scene.
     */
    pt.setUp = function () {

        var layout = new scene.level.PlaySceneLayout()

        this.getResultPane().setRect(layout.resultPaneRect())
        this.getResultPane().setScore(this.getScoreboard().score)

    }

    /**
     * Starts the scene.
     */
    pt.start = function () {

        var self = this

        return this.getResultPane().show(30000000).then(function () {

            domain.level.Cell.disappear()

            self.getMenuButton().hide()

            self.getScoreboard().disappear()

            return self.getField().disappear()

        }).then(function () {

            return self.getBall().goCenterX()

        }).then(function () {

            return self.getBall().goCenterY()

        }).then(function () {

            return Promise.all([
                self.getCharacter().show(400),
                self.getBall().disappear()
            ])

        }).then(function () {

            return self.getCharacter().moveTo('y', 800, 1000)

        }).then(function () {

            return ui.common.BackgroundService.turnBlack()

        }).then(function () {

            history.back()

        })

    }

})

$.cc.assign('outro-scene', scene.level.OutroScene)
