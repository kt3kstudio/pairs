const {on, component} = $.cc
const {button} = require('dom-gen')

const ls = window.localStorage

const presets = {}

const list = ['level-702-has-2-keys']

presets['level-702-has-2-keys'] = require(`./level-702-has-2-keys.json`)

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

  constructor (elem) {
    list.forEach(name => {
      elem.append(button(name).addClass('apply').data('data', presets[name]))
    })
  }

  @on('click').at('.apply') apply (e) {
    const data = $(e.target).data('data')

    console.log('Applying')
    console.log(data)

    LsSwitch.apply(data)
  }
}

window.LsSwitch = LsSwitch

module.exports = LsSwitch
