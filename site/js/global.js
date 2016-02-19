import $ from 'jquery'
import Rx from 'rx-lite'
import {polyfill} from 'es6-promise'
import 'es6-symbol/implement'

global.$ = $
global.jQuery = $
global.Rx = Rx

polyfill()
