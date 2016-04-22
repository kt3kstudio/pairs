import SceneContext from '../scene-context'
import './component'

/**
 * The common context for level scenes.
 */
export default class Context extends SceneContext {

    /**
     * Gets the field grid.
     *
     * @return {Field}
     */
    getField() {

        return this.get('field-grid')

    }

    /**
     * Gets the character.
     *
     * @return {Character}
     */
    getCharacter() {

        return this.get('character-on-level')

    }

    /**
     * Gets the ball
     *
     * @return {Ball}
     */
    getBall() {

        return this.get('ball')

    }

    /**
     * Gets the paper.
     *
     * @return {Paper}
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

    /**
     * Gets the residents
     * @param {string} name The name of the residents
     */
    residents(name) {

        return this.elem.find('.' + name).toArray().map(dom => $(dom).cc.get(name))

    }

}
