const { component } = capsid

const BLOCKING_CLASS = 'blocking'

@component('ui-blocker')
class Blocker {
  unblock () {
    this.el.classList.remove('blocking')
  }

  block () {
    this.el.classList.add('blocking')
  }
}

module.exports = Blocker
