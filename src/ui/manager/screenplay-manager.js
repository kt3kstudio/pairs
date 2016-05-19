import ScreenplayLine from './screenplay-line'
import {BASE_PATH} from '../../'
import {parse} from 'scenarioscript'

const {event, component, Coelement} = $.cc

const emojiList = [
    'love'
]

/**
 * ScreenplayManager
 */
@component('screenplay-manager')
export default class ScreenplayManager extends Coelement {

    constructor(elem) {
        super(elem)

        this.context = elem.data('context')

        this.lines = ScreenplayManager.parse(elem.text())
        this.lines.forEach(line => line.context = this.context)
    }

    /**
     * Parses the screenplay DSL.
     * @private
     * @param {string} text The text of screenplay
     */
    static parse(text) {

        return parse(text).map(line => new ScreenplayLine(line.role, line.message))

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

    /**
     * Renders the emoji simbols in the text to emoji tag.
     * @param {string} raw The raw text
     * @return {string}
     */
    static renderEmoji(raw) {
        return raw.replace(/:([_a-z]+):/g, ScreenplayManager.emojiToTag)
    }

    /**
     * Returns the html expression of the emoji.
     * @param {string} emoji The id of emoji symbol
     * @return {string}
     */
    static emojiToTag(_, emoji) {

        if (!(/[mf]+/.test(emoji)) && emojiList.indexOf(emoji) === -1) {

            console.log('unknown emoji', emoji)
            return ':' + emoji + ':'

        }

        return `<img class="emoji-${emoji}" src="${BASE_PATH}/img/quatron.svg" width="30"/>`

    }

}
