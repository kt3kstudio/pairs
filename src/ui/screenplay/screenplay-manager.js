import ScreenplayLine from './screenplay-line'
import {parse} from 'scenarioscript'

const {event, component} = $.cc

/**
 * ScreenplayManager
 */
@component('screenplay-manager')
export default class ScreenplayManager {

    constructor(elem) {
        this.context = elem.data('context')

        this.lines = parse(elem.text()).map(line => new ScreenplayLine(line.role, line.message, this.context, line.params))
    }

    /**
     * Returns true iff all the actors are ready.
     * @return {boolean}
     */
    actorsReady() {
        return this.lines.filter(line => !line.actorIsReady()).length === 0
    }

    /**
     * Plays the screenplay
     * @return {Promise}
     */
    @event('screenplay-start')
    play() {
        return this.lines.reduce((previous, line) => previous.then(() => line.play()), Promise.resolve())
    }
}
