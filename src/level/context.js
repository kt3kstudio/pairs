import SceneContext from '../ui/scene-context'
require('./component')

/**
 * The common context for level scenes.
 */
class Context extends SceneContext {
    /**
     * Gets the field grid.
     * @return {Field}
     */
    getField() {
        return this.get('field-grid')
    }

    /**
     * Gets the character.
     * @return {Character}
     */
    getCharacter() {
        return this.get('hero')
    }

    /**
     * Gets the ball
     * @return {Ball}
     */
    getBall() {
        return this.get('ball')
    }

    /**
     * Gets the paper.
     * @return {Paper}
     */
    getPaper() {
        return this.get('paper')
    }

    /**
     * Gets the scoreboard.
     * @return {Scoreboard}
     */
    getScoreboard() {
        return this.get('scoreboard')
    }

    /**
     * Gets the goal-panel
     * @return {GoalPanel}
     */
    goalPanel() {
        return this.get('goal-panel')
    }

    /**
     * Gets the result pane.
     * @return {ResultPane}
     */
    getResultPane() {
        return this.get('result-pane')
    }

    /**
     * Gets the residents
     * @param {string} name The name of the residents
     * @return {Resident[]}
     */
    residents(name) {
        return this.elem.find('.' + name).toArray().map(dom => $(dom).cc.get(name))
    }
}

module.exports = Context
