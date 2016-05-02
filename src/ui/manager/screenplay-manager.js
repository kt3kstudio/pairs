import ScreenplayLine from './screenplay-line'

const {event, component, Coelement} = $.cc

/**
 * ScreenplayManager
 */
@component('screenplay-manager')
export default class ScreenplayManager extends Coelement {

    constructor(elem) {
        super(elem)

        this.lines = ScreenplayManager.parse(elem.text())
    }

    /**
     * Parses the screenplay DSL.
     * @private
     * @param {string} text The text of screenplay
     */
    static parse(text) {
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .map(line => ScreenplayManager.parseLine(line))

        return lines
    }

    /**
     * Parses the line
     * @private
     * @param {string} lineText The text of the line
     */
    static parseLine(lineText) {

        const [selector, ...args] = lineText.split(/\s+/)
        return new ScreenplayLine(selector, args.join(' '))

    }

    @event('screenplay-start')
    start() {
    }

}
