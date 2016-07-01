const CELLS = [
  'm',
  'f',
  'a',
  'w',
  'b'
]
exports.CELLS = CELLS

const emojis = CELLS
exports.emojis = emojis

/**
 * Renders the emoji simbols in the text to emoji tag.
 * @param {string} text The raw text
 * @param {string} cls The additional css class
 * @return {string}
 */
exports.renderEmoji = (text, cls) => text.replace(/:([_a-z]+):/g, (_, emoji) => emojiToTag(emoji, cls))

/**
 * Parses the text and returns a list of cells in it.
 * @param {string} text The source text
 * @return {string[]}
 */
exports.extractCells = text => {
  const cells = []

  text.replace(/:([_a-z]+):/g, (_, cell) => cells.push(cell))

  return cells.filter(cell => CELLS.indexOf(cell) !== -1)
}

/**
 * Returns the html expression of the emoji.
 * @param {string} emoji The id of emoji symbol
 * @return {string}
 */
function emojiToTag (emoji, cls) {
  if (emojis.indexOf(emoji) === -1) {
    return ':' + emoji + ':'
  }

  return `<i class="emoji emoji-${emoji} ${cls || ''}"></i>`
}
