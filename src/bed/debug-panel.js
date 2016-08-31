const getPropertyNames = require('get-property-names')
const {hr, div, button} = require('dom-gen')
const {component, on} = $.cc

const methodMask = ['constructor']

@component
class DebugPanel {
  constructor (elem) {
    elem.append(
      div({addClass: 'toggle'}, 'DEBUG'),
      button({addClass: 'reset'}, 'RESET'),
      div({addClass: 'container'})
    )

    this.target = $(document.querySelector(elem.attr('target')))

    this.storeFixtures(elem)

    if (elem.attr('auto-open') === 'true') {
      setTimeout(() => elem.find('.toggle').trigger('click'))
    }

    if (elem.attr('auto-reset') === 'true') {
      setTimeout(() => elem.find('.reset').trigger('click'))
    }
  }

  /**
   * Stores the fixtures.
   */
  storeFixtures (elem) {
    const container = div()

    container.html(elem.find('script').text())

    const fixtures = []

    container.children().each(function () {
      const cls = this.classList[0]
      fixtures.push({name: cls, html: this.outerHTML})
    })

    this.fixtures = fixtures
  }

  /**
   * The handler of toggle click.
   */
  @on('click').at('.toggle') click () {
    if (this.flag) {
      this.flag = false
      this.elem.css('top', -$(window).height() * 0.85 + 'px')
    } else {
      this.flag = true
      this.elem.css('top', '0')
    }
  }

  container (...args) {
    return this.elem.find('.container').append(...args)
  }

  /**
   * Resets the contents.
   */
  @on('click').at('.reset') reset () {
    this.container().empty()
    this.target.empty()

    this.createComponentButtons()
  }

  /**
   * Creates component buttons.
   */
  createComponentButtons () {
    this.fixtures.forEach(item => {
      this.container(button({addClass: 'component-btn', attr: {html: item.html}}, item.name))
    })
  }

  @on('click').at('.component-btn') componentClick (e) {
    this.container(hr())

    const html = $(e.target).attr('html')
    const name = $(e.target).text()

    this.target.append($(html).cc())
    const coelement = this.target.find('.' + name).cc.get(name)

    getPropertyNames(coelement).forEach(key => {
      if (typeof coelement[key] === 'function' && methodMask.indexOf(key) < 0) {
        this.container(button({addClass: 'method-btn', data: {coelement, key}}, key))
      }
    })
  }

  @on('click').at('.method-btn') methodClick (e) {
    const coelement = $(e.target).data('coelement')
    const key = $(e.target).data('key')

    const result = coelement[key]()
    console.log(result)
    window.a = window.a || []
    window.a.unshift(result)
  }
}

module.exports = DebugPanel
