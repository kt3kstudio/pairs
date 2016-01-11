import $ from 'jquery'
import Rx from 'rx-lite'
import {polyfill} from 'es6-promise'

global.$ = $
global.jQuery = $
global.Rx = Rx
polyfill()
