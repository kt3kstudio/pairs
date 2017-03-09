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
    this.el.classList.remove('blocking')
  }

  block () {
    this.el.classList.add('blocking')
  }

}

module.exports = Blocker
