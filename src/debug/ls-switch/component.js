const {on, component} = $.cc
const {button} = require('dom-gen')

const ls = window.localStorage
const copy = require('clipboard-js').copy

@component
class LsSwitch {
  static getData () {
    const dump = {}

    Object.keys(ls).forEach(key => {
      dump[key] = JSON.parse(ls[key])
    })

    return dump
  }

  static getJSON () {
    return JSON.stringify(LsSwitch.getData(), null, 2)
  }

  static copyJSON () {
    copy(LsSwitch.getJSON())
  }

  static apply (data) {
    ls.clear()

    Object.keys(data).forEach(key => {
      ls[key] = JSON.stringify(data[key])
    })
  }

  __init__ () {
    const elem = this.$el

    const source = window.presets

    elem.append(button('COPY').addClass('copy'), '|')

    Object.keys(source).forEach(name => {
      elem.append(button(name).addClass('apply').data('data', source[name]))
    })
  }

  @on('click', { at: '.apply' }) apply (e) {
    const data = $(e.target).data('data')

    console.log('LsSwitch: Applying the preset data to localStorage.')
    console.log(JSON.stringify(data))

    LsSwitch.apply(data)
  }

  @on('click', { at: '.copy' }) copy () {
    console.log('LsSwitch: Copying the localStorage to the clipboard.')

    LsSwitch.copyJSON()
  }
}

window.LsSwitch = LsSwitch

module.exports = LsSwitch
