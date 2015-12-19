/**
 * The common context for level scenes.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.Context = subclass(domain.common.SceneContext, function (pt) {
    'use strict'

    /**
     * Gets the menu button.
     *
     * @return {ui.common.MenuButton}
     */
    pt.getMenuButton = function () {

        return this.getGlobal('.menu-button-root', 'menu-button')

    }

    /**
     * Gets the field grid.
     *
     * @return {domain.level.Field}
     */
    pt.getField = function () {

        return this.get('field-grid')

    }

    /**
     * Gets the character.
     *
     * @return {domain.level.Character}
     */
    pt.getCharacter = function () {

        return this.get('character-on-level')

    }

    /**
     * Gets the dimension factory.
     *
     * @return {domain.level.DimensionFactory}
     */
    pt.getDimensionFactory = function () {

        this.dimFactory = this.dimFactory || new domain.level.DimensionFactory()

        return this.dimFactory

    }

    /**
     * Gets the ball
     *
     * @return {domain.level.Ball}
     */
    pt.getBall = function () {

        return this.get('ball')

    }

    /**
     * Gets the paper.
     *
     * @return {domain.level.PieceOfPaper}
     */
    pt.getPaper = function () {

        return this.get('paper')

    }

    /**
     * Gets the scoreboard.
     *
     * @return {domain.level.Scoreboard}
     */
    pt.getScoreboard = function () {

        return this.get('scoreboard')

    }

    /**
     * Gets the result pane.
     *
     * @return {ui.level.ResultPane}
     */
    pt.getResultPane = function () {

        return this.get('result-pane')

    }

})
