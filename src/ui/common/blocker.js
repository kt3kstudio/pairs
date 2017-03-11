const { component } = capsid

const BLOCKING_CLASS = 'blocking'

@component('ui-blocker')
class Blocker {

  constructor () {
    this.x = 0
  }

  __init__ () {
    const el = document.createElement('img')
    el.src = `${BASEPATH}/img/loading.svg`
    this.el.appendChild(el)
  }

  update () {
    this.el.classList.toggle(BLOCKING_CLASS, this.x > 0)
  }

  unblock () {
    this.x = Math.max(this.x - 1, 0)

    this.update()
  }

  block () {
    this.x++

    this.update()
  }

}

module.exports = Blocker
