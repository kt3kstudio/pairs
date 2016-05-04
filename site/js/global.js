import $ from 'jquery'
import Rx from 'rx-lite'
import {polyfill} from 'es6-promise'
import 'es6-symbol/implement'
import Tether from 'tether'

global.$ = $
global.jQuery = $
global.Rx = Rx
global.Tether = Tether

polyfill()
