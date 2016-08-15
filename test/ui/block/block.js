
const block = require('../../../src/ui/block')
const {on, component} = $.cc
const {div} = require('dom-gen')

describe('Block', () => {

  @component
  @block
  class BlockTest {
    @on('block-need-guiding-rect')
    onBlockNeedGuidingRect (e, block) {
      this.onChildNeedGuidingRect(e, block)
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

      parent.rect = {}

      block.needsGuidingRect()
      expect(block.guidingRect).to.equal(parent.rect)
    })

    it('throws if the parent does not give the guiding rect', () => {
      const block = div().cc.init('block-test')

      expect(() => block.needsGuidingRect()).to.throw()
    })
  })
})
