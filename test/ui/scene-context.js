const SceneContext = require('../../src/ui/scene-context')
const {div} = require('dom-gen')

describe('SceneContext', () => {
  let ctx

  beforeEach(() => {
    ctx = new SceneContext()
    ctx.elem = div()
  })

  describe('main', () => {
    it('returns a promise', () => {
      expect(ctx.main()).to.be.instanceof(Promise)
    })

    it('calls load, setUp and start', done => {
      let loadCalled = false
      let setUpCalled = false
      let startCalled = false

      ctx.load = () => {
        loadCalled = true

        expect(setUpCalled).to.be.false
        expect(startCalled).to.be.false
      }

      ctx.setUp = () => {
        setUpCalled = true

        expect(loadCalled).to.be.true
        expect(startCalled).to.be.false
      }

      ctx.start = () => {
        expect(loadCalled).to.be.true
        expect(setUpCalled).to.be.true

        done()
      }

      ctx.main()
    })
  })
})
