export const CELLS = [
    'm',
    'f',
    'a',
    'w',
    'b'
]

export const emojis = CELLS

/**
 * Renders the emoji simbols in the text to emoji tag.
 * @param {string} text The raw text
 * @param {string} cls The additional css class
 * @return {string}
 */
export function renderEmoji(text, cls) {
    return text.replace(/:([_a-z]+):/g, (_, emoji) => emojiToTag(emoji, cls))
}

/**
 * Parses the text and returns a list of cells in it.
 * @param {string} text The source text
 * @return {string[]}
 */
export function extractCells(text) {
    const cells = []

    text.replace(/:([_a-z]+):/g, (_, cell) => cells.push(cell))

    return cells.filter(cell => CELLS.indexOf(cell) !== -1)
}

/**
 * Returns the html expression of the emoji.
 * @param {string} emoji The id of emoji symbol
 * @return {string}
 */
function emojiToTag(emoji, cls) {

    if (emojis.indexOf(emoji) === -1) {

        console.log('unknown emoji:', emoji)
        return ':' + emoji + ':'

    }

    return `<i class="emoji emoji-${emoji} ${cls || ''}"></i>`
}
