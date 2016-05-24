/**
 * Screenplay line represents a line of a screenplay.
 */
export default class ScreenplayLine {

    /**
     * @param {string} selector The selector of the actor
     * @param {string} line The screenplay line
     */
    constructor(selector, line, context) {
        this.selector = selector
        this.line = line
        this.context = context
    }

    /**
     * Gets the actor of this line.
     */
    getActor() {

        return $(this.selector, this.context).cc.getActor()

    }

    /**
     * Plays the role.
     */
    play() {

        return this.getActor().speak(this.line)

    }

    /**
     * Checks if the corresponding actor is ready.
     *
     * If actor is available as a dom and the class has speak method, then it's "ready".
     * @return {boolean}
     */
    actorIsReady() {

        const actor = this.getActor()

        return actor != null && typeof actor.speak === 'function'

    }

}
