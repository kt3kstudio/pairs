import $ from 'jquery'
import Rx from 'rx-lite'
import {polyfill} from 'es6-promise'
import 'es6-symbol/implement'
import Tether from 'tether'
import Drop from 'tether-drop'

global.$ = $
global.jQuery = $
global.Rx = Rx
global.Tether = Tether
global.Drop = Drop

require('class-component')

$.cc.subclass = require('subclassjs')

polyfill()
