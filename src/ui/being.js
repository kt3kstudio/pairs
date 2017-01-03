const { traits } = require('traits-decorator')
const { wait } = require('spn')
const { component } = $.cc

class Being {
  show (dur) {
    this.$el.addClass('showing')

    return Promise.resolve(typeof this.willShow === 'function' && this.willShow())

      .then(() => {
        const anim = typeof this.showAnim === 'function' && this.showAnim()

        return anim && anim.apply(this.elem, dur)
      })

      .then(() => typeof this.constructor.SHOW_DURATION === 'number' && wait(this.constructor.SHOW_DURATION))

      .then(() => typeof this.didShow === 'function' && this.didShow())

      .then(() => this.$el.addClass('shown'))
  }

  hide (dur) {
    this.$el.removeClass('shown')

    return Promise.resolve(typeof this.willHide === 'function' && this.willHide())

      .then(() => {
        const anim = typeof this.hideAnim === 'function' && this.hideAnim()

        return anim && anim.apply(this.elem, dur)
      })

      .then(() => typeof this.constructor.SHOW_DURATION === 'number' && wait(this.constructor.SHOW_DURATION))

      .then(() => typeof this.didHide === 'function' && this.didHide())

      .then(() => this.$el.removeClass('showing'))
  }
}

module.exports = Cls => traits(Being)(component(Cls))
module.exports.dur = dur => Cls => {
  Cls.SHOW_DURATION = dur

  return module.exports(Cls)
}
