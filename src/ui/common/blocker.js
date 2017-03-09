const { component } = capsid

const BLOCKING_CLASS = 'blocking'

@component('ui-blocker')
class Blocker {

  __init__ () {
    const el = document.createElement('img')
    el.src = `${BASEPATH}/img/loading.svg`
    this.el.appendChild(el)
  }

  unblock () {
    this.el.classList.remove(BLOCKING_CLASS)
  }

  block () {
    this.el.classList.add(BLOCKING_CLASS)
  }

}

module.exports = Blocker
