const {renderEmoji} = require('../../src/util/emoji')

describe('renderEmoji', () => {

    it('renders emojis in the given string', () => {

        expect(renderEmoji('Hello :f: :m:')).to.equal('Hello <i class="emoji emoji-f"></i> <i class="emoji emoji-m"></i>')

    })

})
