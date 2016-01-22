import SceneContext from '../../domain/common/SceneContext'

/**
 * The common context for level scenes.
 */
export default class Context extends SceneContext {

    /**
     * Gets the field grid.
     *
     * @return {domain.level.Field}
     */
    getField() {

        return this.get('field-grid')

    }

    /**
     * Gets the character.
     *
     * @return {domain.level.Character}
     */
    getCharacter() {

        return this.get('character-on-level')

    }

    /**
     * Gets the ball
     *
     * @return {domain.level.Ball}
     */
    getBall() {

        return this.get('ball')

    }

    /**
     * Gets the paper.
     *
     * @return {domain.level.Paper}
     */
    getPaper() {

        return this.get('paper')

    }

    /**
     * Gets the scoreboard.
     *
     * @return {ui.level.Scoreboard}
     */
    getScoreboard() {

        return this.get('scoreboard')

    }

    /**
     * Gets the result pane.
     *
     * @return {ui.level.ResultPane}
     */
    getResultPane() {

        return this.get('result-pane')

    }

}
