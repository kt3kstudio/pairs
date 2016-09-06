const block = require('../../../src/ui/block')
const {component} = $.cc
const {div} = require('dom-gen')
const {Rect} = require('spn')

describe('Block', () => {
  void @component
  @block
  class BlockTest {
    block (rect) {
      return rect
    }
  }

  describe('needsGuidingRect', () => {
    it('triggers the block-need-guiding-rect event with itself as the first parameter', done => {
      const block = div().cc.init('block-test')

      const parent = div().cc.init('block-test')

      parent.elem.append(block.elem)

      parent.rect = {}

      parent.elem.on('block-need-guiding-rect', (e, child) => {
        expect(child).to.equal(block)
        done()
      })

      block.needsGuidingRect()
    })

    it('gives itself the guiding rect from the parent', () => {
      const block = div().cc.init('block-test')

      const parent = div().cc.init('block-test')

      parent.elem.append(block.elem)

      parent.blockRect = {}

      block.needsGuidingRect()
      expect(block.__guidingRect__).to.equal(parent.blockRect)
    })

    it('gives window size rect if the parent does not give the guiding rect', () => {
      const block = div().cc.init('block-test')

      block.needsGuidingRect()

      expect(block.__guidingRect__).to.exist
      expect(block.__guidingRect__.width()).to.equal($(window).width())
      expect(block.__guidingRect__.height()).to.equal($(window).height())
    })
  })

  describe('initBlock', () => {
    it('returns a rect and sets the blockRect property', () => {
      const block = div().cc.init('block-test')

      expect(block.initBlock()).to.be.instanceof(Rect)

      expect(block.blockRect).to.be.instanceof(Rect)
    })
  })
})
