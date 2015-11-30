/**
 * OutroScene handles the scene after finishing main play.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.OutroScene = subclass(scene.level.Context, function (pt) {
    'use strict'

    /**
     * Stars the scene.
     */
    pt.start = function () {

        var that = this

        var resPane = this.getResultPane()

        resPane.setRect(this.getDimensionFactory().resultPaneRect())
        resPane.setScore(this.getScoreboard().score)

        return this.getResultPane().show(30000000).then(function () {

            domain.level.Cell.disappear()

            that.getMenuButton().hide()

            that.getScoreboard().disappear()

            return that.getField().disappear()

        }).then(function () {

            return that.getBall().goCenterX()

        }).then(function () {

            return that.getBall().goCenterY()

        }).then(function () {

            return Promise.all([
                that.getCharacter().appear(400),
                that.getBall().disappear()
            ])

        }).then(function () {

            return that.getCharacter().moveTo('y', 800, 1000)

        }).then(function () {

            return ui.common.BackgroundService.turnBlack()

        }).then(function () {

            history.back()

        })

    }.event('play-scene-success play-scene-failure')

})

$.cc.assign('outro-scene', scene.level.OutroScene)
