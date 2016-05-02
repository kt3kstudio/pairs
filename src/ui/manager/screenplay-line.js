/**
 * Screenplay line represents a line of a screenplay.
 */
export default class ScreenplayLine {

    /**
     * @param {string} selector The selector of the actor
     * @param {string} line The screenplay line
     */
    constructor(selector, line) {
        this.selector = selector
        this.line = line
    }

}
