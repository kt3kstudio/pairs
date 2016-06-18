import Resident from './resident'
import {Animation} from 'spn'

const {component} = $.cc

@component('moo')
export default class Moo extends Resident {

  showAnim() { return new Animation('bom-appear', 400) }
  hideAnim() { return new Animation('bom-disappear', 400) }

  willHide() {

    this.elem.css('opacity', 0)

  }

  image() {

    return `${global.BASEPATH}/img/moo.svg`

  }
}
