export const emojis = [
    'm',
    'f',
    'a',
    'w',
    'b'
]

/**
 * Renders the emoji simbols in the text to emoji tag.
 * @param {string} text The raw text
 * @return {string}
 */
export function renderEmoji(text) {
    return text.replace(/:([_a-z]+):/g, emojiToTag)
}

/**
 * Returns the html expression of the emoji.
 * @param {string} emoji The id of emoji symbol
 * @return {string}
 */
function emojiToTag(_, emoji) {

    if (emojis.indexOf(emoji) === -1) {

        console.log('unknown emoji:', emoji)
        return ':' + emoji + ':'

    }

    return `<i class="emoji emoji-${emoji}"/><i>`
}
