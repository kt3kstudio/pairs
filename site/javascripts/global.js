import $ from 'jquery'
import Rx from 'rx-lite'
import {polyfill} from 'es6-promise'
import {wait} from 'spn'

global.$ = $
global.jQuery = $
global.Rx = Rx
polyfill()
global.wait = wait
