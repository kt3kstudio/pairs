const {renderEmoji, extractCells} = require('../../src/util/emoji')

describe('renderEmoji', () => {
  it('renders emojis in the given string', () => {
    expect(renderEmoji('Hello :f: :m:')).to.equal('Hello <i class="emoji emoji-f "></i> <i class="emoji emoji-m "></i>')
  })

  it('adds the additional given class', () => {
    expect(renderEmoji('Hello :f: :m:', 'foo')).to.equal('Hello <i class="emoji emoji-f foo"></i> <i class="emoji emoji-m foo"></i>')
  })

  it('does not convert unknown emojis', () => {
    expect(renderEmoji(':foo: :bar:')).to.equal(':foo: :bar:')
  })
})

describe('extractCells', () => {
  it('extracts the cell type emojis from the given text', () => {
    expect(extractCells(':f: :m:')).to.eql(['f', 'm'])
  })
})
