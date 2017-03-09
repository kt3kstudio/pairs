const BackgroundService = require('./common/background-service')
const isFunction = f => typeof f === 'function'

const { get, component } = capsid

const scene = Cls => {
  Object.defineProperty(Cls.prototype, 'main', {
    value () {
      return Promise.resolve(isFunction(this.load) && this.load())

      .then(() => isFunction(this.setUp) && this.setUp())

      .then(() => isFunction(this.start) && this.start())
    }
  })

  Object.defineProperty(Cls.prototype, 'bg', {
    get: () => BackgroundService
  })

  Object.defineProperty(Cls.prototype, 'menuButton', {
    get: () => $('.menu-button-root').cc.get('menu-button')
  })

  Object.defineProperty(Cls.prototype, 'blocker', {
    get () {
      return get('ui-blocker', this.el.querySelector('.ui-blocker'))
    }
  })

  return component(Cls)
}

scene.primary = Cls => {
  capsid.on('scene-start')(Cls.prototype, 'main')

  return scene(Cls)
}

module.exports = scene
