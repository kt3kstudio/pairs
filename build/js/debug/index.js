(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domGen = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = domGen;

/**
 * Returns a generator of the doms of the given tag name.
 * @param {string} tagName The tag name of the dom to create
 * @return {Function}
 */
function domGen(tagName) {

  /**
   * Generates a dom with the given params.
   * @param {object} [opts] The options to pass as the second arg of $('<tag/>', arg)
   * @param {object[]} args The objects to append to the element
   * @return {jQuery}
   */
  return function (opts) {
    var _$, _ref;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!seemLikePlainObject(opts)) {
      args.unshift(opts);
      opts = undefined;
    }

    return (_$ = $('<' + tagName + '/>', opts)).append.apply(_$, _toConsumableArray((_ref = []).concat.apply(_ref, args)));
  };
}

/**
 * Checkes if the object is plain.
 * @param {object} o The object
 * @return {boolean}
 */
function seemLikePlainObject(o) {
  return o instanceof Object && Object.getPrototypeOf(o).hasOwnProperty('isPrototypeOf');
}
domGen.a = domGen('a');
domGen.abbr = domGen('abbr');
domGen.address = domGen('address');
domGen.area = domGen('area');
domGen.article = domGen('article');
domGen.aside = domGen('aside');
domGen.audio = domGen('audio');
domGen.b = domGen('b');
domGen.base = domGen('base');
domGen.bdi = domGen('bdi');
domGen.bdo = domGen('bdo');
domGen.blockquote = domGen('blockquote');
domGen.body = domGen('body');
domGen.br = domGen('br');
domGen.button = domGen('button');
domGen.canvas = domGen('canvas');
domGen.caption = domGen('caption');
domGen.cite = domGen('cite');
domGen.code = domGen('code');
domGen.col = domGen('col');
domGen.colgroup = domGen('colgroup');
domGen.data = domGen('data');
domGen.datalist = domGen('datalist');
domGen.dd = domGen('dd');
domGen.del = domGen('del');
domGen.details = domGen('details');
domGen.dfn = domGen('dfn');
domGen.dialog = domGen('dialog');
domGen.div = domGen('div');
domGen.dl = domGen('dl');
domGen.dt = domGen('dt');
domGen.em = domGen('em');
domGen.embed = domGen('embed');
domGen.fieldset = domGen('fieldset');
domGen.figcaption = domGen('figcaption');
domGen.figure = domGen('figure');
domGen.footer = domGen('footer');
domGen.form = domGen('form');
domGen.h1 = domGen('h1');
domGen.h2 = domGen('h2');
domGen.h3 = domGen('h3');
domGen.h4 = domGen('h4');
domGen.h5 = domGen('h5');
domGen.h6 = domGen('h6');
domGen.head = domGen('head');
domGen.header = domGen('header');
domGen.hr = domGen('hr');
domGen.html = domGen('html');
domGen.i = domGen('i');
domGen.iframe = domGen('iframe');
domGen.img = domGen('img');
domGen.input = domGen('input');
domGen.ins = domGen('ins');
domGen.kbd = domGen('kbd');
domGen.keygen = domGen('keygen');
domGen.label = domGen('label');
domGen.legend = domGen('legend');
domGen.li = domGen('li');
domGen.link = domGen('link');
domGen.main = domGen('main');
domGen.map = domGen('map');
domGen.mark = domGen('mark');
domGen.math = domGen('math');
domGen.menu = domGen('menu');
domGen.menuitem = domGen('menuitem');
domGen.meta = domGen('meta');
domGen.meter = domGen('meter');
domGen.nav = domGen('nav');
domGen.noscript = domGen('noscript');
domGen.object = domGen('object');
domGen.ol = domGen('ol');
domGen.optgroup = domGen('optgroup');
domGen.option = domGen('option');
domGen.output = domGen('output');
domGen.p = domGen('p');
domGen.param = domGen('param');
domGen.picture = domGen('picture');
domGen.pre = domGen('pre');
domGen.progress = domGen('progress');
domGen.q = domGen('q');
domGen.rb = domGen('rb');
domGen.rp = domGen('rp');
domGen.rt = domGen('rt');
domGen.rtc = domGen('rtc');
domGen.ruby = domGen('ruby');
domGen.s = domGen('s');
domGen.samp = domGen('samp');
domGen.script = domGen('script');
domGen.section = domGen('section');
domGen.select = domGen('select');
domGen.small = domGen('small');
domGen.source = domGen('source');
domGen.span = domGen('span');
domGen.strong = domGen('strong');
domGen.style = domGen('style');
domGen.sub = domGen('sub');
domGen.summary = domGen('summary');
domGen.sup = domGen('sup');
domGen.svg = domGen('svg');
domGen.table = domGen('table');
domGen.tbody = domGen('tbody');
domGen.td = domGen('td');
domGen.template = domGen('template');
domGen.textarea = domGen('textarea');
domGen.tfoot = domGen('tfoot');
domGen.th = domGen('th');
domGen.thead = domGen('thead');
domGen.time = domGen('time');
domGen.title = domGen('title');
domGen.tr = domGen('tr');
domGen.track = domGen('track');
domGen.u = domGen('u');
domGen.ul = domGen('ul');
domGen.var = domGen('var');
domGen.video = domGen('video');
domGen.wbr = domGen('wbr');

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
module.exports = getPropertyNames

/**
 * @param {Object} object The object
 * @return {string[]}
 */
function getPropertyNames (object) {
  var names = []

  do {
    Object.getOwnPropertyNames(object).forEach(function (name) {
      if (names.indexOf(name) === -1) {
        names.push(name)
      }
    })

    object = Object.getPrototypeOf(object)
  } while (object !== Object.prototype)

  return names
}

},{}],3:[function(require,module,exports){
var SEPARATOR = 'separator'
var MESSAGE = 'message'
/**
 * Parses ScenarioScript.
 * @param {string}
 * @return {Object} This has type: string, keys; role: string, message: string, params: object
 */
exports.parse = function (script) {

  return script.split(/\n/).map(trim).filter(Boolean).map(parseLine)

}

/**
 * @param {string} line The line of scenario
 */
function trim(line) {

  if (!line) {
    return line
  }

  return line.replace(/^\s*|\s$/g, '')

}

/**
 * Parses a line.
 * @param {string} line The line
 * @return {object}
 */
function parseLine(line) {

  var type = getType(line)

  if (type === SEPARATOR) {

    return createSeparatorObj(line)

  } else { // type is MESSAGE

    return createMessageObj(line)

  }

}

/**
 * Gets the type of the line.
 * @param {string} line The line
 */
function getType(line) {

  if (/^-+$/.test(line)) {

    return SEPARATOR

  } else {

    return MESSAGE

  }

}

/**
 * Creates the separator object.
 * @param {string} line The line
 * @return {object}
 */
function createSeparatorObj(line) {

  return new Line({
    type: SEPARATOR,
    role: null,
    message: null,
    params: {size: line.length}
  })

}

var messageHeadRe = /^\s*(\[([^\]]*)\])?(.*)$/
var messageTailRe = /\((.*)\)\s*$/

/**
 * Creates the message object.
 * @param {string} line The line
 * @return {object}
 */
function createMessageObj(line) {

  var match0 = line.match(messageHeadRe)

  var role = trim(match0[2])

  var messageTail = trim(match0[3])

  var match1 = messageTail.match(messageTailRe)

  var message = trim(messageTail.replace(messageTailRe, ''))

  var params = match1 && match1[1] && parseParams(match1[1])

  return new Line({
    type: MESSAGE,
    role: role,
    message: message,
    params: params
  })

}

/**
 * Returns the object of the given string of key and value pairs.
 * @param {string} str The key value string
 * @return {object}
 */
function parseParams(str) {

  var params = {}

  var pairs = str.split(',').map(trim).map(parseKeyValue)

  pairs.forEach(function (kv) {

    params[kv.key] = kv.value

  })

  return params

}

/**
 * Parses the string as a pair of key and value.
 * @param {string} str
 * @return
 */
function parseKeyValue(str) {
  var index = str.indexOf('=')

  if (index === -1) {

    // If the = sign is missing, then the value is true.
    return {key: str, value: true}

  } else {

    return {
      key: str.substring(0, index),
      value: parseValue(str.substring(index + 1))
    }

  }

}

/**
 * RegExp which represents the number in JSON.
 * http://stackoverflow.com/questions/13340717/json-numbers-regular-expression
 */
var numberRE = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/

/**
 * Parses the string as value.
 *
 * This casts the str to boolean or number if it looks like those. Otherwise this does nothing.
 * @param {string} str The string
 * @return {object}
 */
function parseValue(str) {

  if (/true/i.test(str)) {

    return true

  } else if (/false/i.test(str)) {

    return false

  } else if (numberRE.test(str)) {

    return +str

  } else {

    return str

  }

}

/**
 * @constructor
 * @param {object} params The parameters
 */
function Line(params) {

  this.type = params.type
  this.role = params.role
  this.message = params.message
  this.params = params.params || {}

}

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wait = require('./wait');
var reflow = require('./reflow');
var ifNumElse = require('./if-num-else');

var ANIMATION_PROP_NAME = '-webkit-animation';

/**
 * Animation class represents the css animation.
 */

var Animation = function () {
  /**
   * @param {String} name The name of the css animation (keyframes)
   * @param {Number} duration The duration of the animation
   */

  function Animation(name, duration) {
    _classCallCheck(this, Animation);

    this.name = name;
    this.duration = duration;
  }

  /**
   * @param {jQuery} elem The dom element
   * @param {number} dur The duration
   * @return {Promise}
   */


  _createClass(Animation, [{
    key: 'apply',
    value: function apply(elem, dur) {
      elem.css(ANIMATION_PROP_NAME, '');

      reflow(elem);

      elem.css(ANIMATION_PROP_NAME, this.name + ' ' + ifNumElse(dur, this.duration) + 'ms');

      return wait(this.duration);
    }
  }]);

  return Animation;
}();

module.exports = Animation;
},{"./if-num-else":19,"./reflow":27,"./wait":28}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of the size of 2-dimensional rectangles.
 */

var Area = function () {
  /**
   * @param {number} width The width
   * @param {number} height The height
   */

  function Area(width, height) {
    _classCallCheck(this, Area);

    this.width = width;
    this.height = height;
  }

  /**
   * Returns a scaled area with the given scales.
   * @param {number} scaleX The x scale
   * @param {number} [scaleY] The y scale
   */


  _createClass(Area, [{
    key: "scale",
    value: function scale(scaleX, scaleY) {
      if (scaleY == null) {
        scaleY = scaleX;
      }

      return new Area(this.width * scaleX, this.height * scaleY);
    }

    /**
     * Returns a area of the square of the given side size.
     * @param {number} size The size of a side
     */

  }], [{
    key: "square",
    value: function square(size) {
      return new Area(size, size);
    }
  }]);

  return Area;
}();

module.exports = Area;
},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */

var Being = function () {
  function Being() {
    _classCallCheck(this, Being);
  }

  _createClass(Being, [{
    key: "showAnim",

    /**
     * Returns the animation of showing
     *
     * @abstract
     * @return {Animation}
     */
    value: function showAnim() {}

    /**
     * Returns the animation of hiding
     *
     * @abstract
     * @return {Animation}
     */

  }, {
    key: "hideAnim",
    value: function hideAnim() {}

    /**
     * @abstract
     * @return {Promise}
     */

  }, {
    key: "willShow",
    value: function willShow() {}

    /**
     * @abstract
     * @return {Promise}
     */

  }, {
    key: "didShow",
    value: function didShow() {}

    /**
     * Shows the element using the animation returned by showAnim.
     * 表示時アニメーション (showAnim) に従ってアニメーションさせる。
     *
     * This invokes `willShow` before and `didShow` after.
     * 事前に willShow hook, 事後に didShow hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: "show",
    value: function show(dur) {
      var _this = this;

      return Promise.resolve(this.willShow()).then(function () {
        var anim = _this.showAnim();

        return anim != null && anim.apply(_this.elem, dur);
      }).then(function () {
        return _this.didShow();
      });
    }

    /**
     * @abstract
     * @return {Promise}
     */

  }, {
    key: "willHide",
    value: function willHide() {}

    /**
     * @abstract
     * @return {Promise}
     */

  }, {
    key: "didHide",
    value: function didHide() {}

    /**
     * Hides the element using the animation returned by hideAnim.
     * 非表示時アニメーション (hideAnim) に従ってアニメーションさせる。
     *
     * This invokes `willHide` before and `didHide` after.
     * 事前に willHide hook, 事後に didHide hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: "hide",
    value: function hide(dur) {
      var _this2 = this;

      return Promise.resolve(this.willHide()).then(function () {
        var anim = _this2.hideAnim();

        return anim != null && anim.apply(_this2.elem, dur);
      }).then(function () {
        return _this2.didHide();
      });
    }

    /**
     * Hides the component and then removes it.
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: "disappear",
    value: function disappear(dur) {
      var _this3 = this;

      return this.hide(dur).then(function () {
        return _this3.elem.remove();
      });
    }
  }]);

  return Being;
}();

module.exports = Being;
},{}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wait = require('./wait');
var Being = require('./being');
var Posture = require('./posture');
var reflow = require('./reflow');
var Point = require('./point');
var Area = require('./area');
var ifNumElse = require('./if-num-else');

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */

var Body = function (_Being) {
  _inherits(Body, _Being);

  function Body() {
    _classCallCheck(this, Body);

    /**
     * @deprecated
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Body).call(this));

    _this.transitionDuration = _this.defaultTransitionDuration();

    /**
     * @property {Number} x sprite's x coordinate value
     */
    _this.x = 0;

    /**
     * @property {Number} y sprite's y coordinate value
     */
    _this.y = 0;

    /**
     * @property {Posture} posture The posture of the rectangle
     */
    _this.posture = new Posture({
      width: _this.width(),
      height: _this.height(),
      ratioX: _this.ratioX(),
      ratioY: _this.ratioY(),
      marginX: _this.marginX(),
      marginY: _this.marginY()
    });
    return _this;
  }

  /**
   * Default parameters
   */


  _createClass(Body, [{
    key: 'width',
    value: function width() {
      return 100;
    }
  }, {
    key: 'height',
    value: function height() {
      return 100;
    }
  }, {
    key: 'ratioX',
    value: function ratioX() {
      return 0;
    }
  }, {
    key: 'ratioY',
    value: function ratioY() {
      return 0;
    }
  }, {
    key: 'marginX',
    value: function marginX() {
      return 0;
    }
  }, {
    key: 'marginY',
    value: function marginY() {
      return 0;
    }
  }, {
    key: 'defaultTransitionDuration',
    value: function defaultTransitionDuration() {
      return 500;
    }

    /**
     * Returns the actual width of the elem.
     */

  }, {
    key: 'actualWidth',
    value: function actualWidth() {
      return this.posture.actualWidth();
    }

    /**
     * Returns the actual height of the elem.
     */

  }, {
    key: 'actualHeight',
    value: function actualHeight() {
      return this.posture.actualHeight();
    }

    /**
     * Prepares dom of the body.
     * @override
     */

  }, {
    key: 'willShow',
    value: function willShow() {
      this.updateOffset();
      this.updateRect();

      reflow(this.elem);
    }

    /**
     * Gets the right limit in px.
     * @return {Number} x value of the right limit
     */

  }, {
    key: 'rightLimit',
    value: function rightLimit() {
      return this.posture.rightLimit(this.x);
    }

    /**
     * Gets the left limit in px.
     * @return {Number} x value of the left limit
     */

  }, {
    key: 'leftLimit',
    value: function leftLimit() {
      return this.posture.leftLimit(this.x);
    }

    /**
     * Gets the top limit in px.
     */

  }, {
    key: 'topLimit',
    value: function topLimit() {
      return this.posture.topLimit(this.y);
    }

    /**
     * Gets the bottom limit in px.
     */

  }, {
    key: 'bottomLimit',
    value: function bottomLimit() {
      return this.posture.bottomLimit(this.y);
    }

    /**
     * Gets the x of the center.
     * @return {Number}
     */

  }, {
    key: 'centerX',
    value: function centerX() {
      return this.posture.centerX(this.x);
    }

    /**
     * Gets the y of the center.
     * @return {Number}
     */

  }, {
    key: 'centerY',
    value: function centerY() {
      return this.posture.centerY(this.y);
    }

    /**
     * Updates the elem's offset according to current position.
     * @private
     */

  }, {
    key: 'updateOffset',
    value: function updateOffset() {
      this.elem.css('top', this.topLimit());
      this.elem.css('left', this.leftLimit());
    }

    /**
     * Updates the elem's width and height.
     * @private
     */

  }, {
    key: 'updateRect',
    value: function updateRect() {
      this.elem.width(this.actualWidth());
      this.elem.height(this.actualHeight());
    }

    /**
     * Stops the dom transition and update current state by the dom state.
     * @private
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.elem.width(this.elem.width());
      this.elem.height(this.elem.height());
      this.elem.css('top', this.elem.css('top'));
      this.elem.css('left', this.elem.css('left'));

      this.posture.setActualWidth(this.elem.width());
      this.posture.setActualHeight(this.elem.height());

      this.x = Body.pxToNum(this.elem.css('left')) + this.posture.width * this.posture.ratioX;
      this.y = Body.pxToNum(this.elem.css('top')) + this.posture.height * this.posture.ratioY;
    }

    /**
     * Converts the pixel to the number.
     * @param {string} px The pixel
     * @return {number}
     */

  }, {
    key: 'engage',


    /**
     * Updates the dom with current state and returns a promise which resolves when the updates finished.
     * @param {number} [duration] The transition duration
     * @return {Promise}
     */
    value: function engage(duration) {
      duration = ifNumElse(duration, this.defaultTransitionDuration());

      this.elem.css('transition-duration', duration + 'ms');

      reflow(this.elem);

      this.updateRect();
      this.updateOffset();

      return wait(duration);
    }

    /**
     * Updates the actual elem dom according to the current posture.
     * Returns a promise which resolves with the transitionDuration milliseconds.
     * @deprecated
     * @param {Number} [dur] The
     * @return {Promise}
     */

  }, {
    key: 'updateElem',
    value: function updateElem(dur) {
      if (dur) {
        this.setTransitionDuration(dur);
      }

      this.updateRect();
      this.updateOffset();

      return wait(this.transitionDuration);
    }

    /**
     * Moves the elem to the given y position.
     * @deprecated
     * @param {Number} to The y position
     */

  }, {
    key: 'moveToY',
    value: function moveToY(to) {
      this.y = to;

      return this.updateElem();
    }

    /**
     * Moves the elem to the given x position.
     * @deprecated
     * @param {Number} to The x position
     */

  }, {
    key: 'moveToX',
    value: function moveToX(to) {
      this.x = to;

      return this.updateElem();
    }

    /**
     * Sets the transition duration.
     * @deprecated
     * @param {number} dur The transition duration
     */

  }, {
    key: 'setTransitionDuration',
    value: function setTransitionDuration(dur) {
      this.transitionDuration = dur;

      this.elem.css('transition-duration', dur + 'ms');

      reflow(this.elem);
    }

    /**
     * Fits to the guiding rect (updates the x, y and posture to fit into the given rect. does not update the dom)
     * @param {Rect} rect
     */

  }, {
    key: 'setRect',
    value: function setRect(rect) {
      this.x = this.posture.getXInRect(rect);
      this.y = this.posture.getYInRect(rect);

      this.posture.fitToRect(rect);
    }

    /**
     * Sets the body at the given point.
     * @param {Point} point The point
     */

  }, {
    key: 'setAt',
    value: function setAt(point) {
      this.x = point.x;
      this.y = point.y;
    }

    /**
     * Returns the point where this body is at.
     * @return {Point}
     */

  }, {
    key: 'getPoint',
    value: function getPoint() {
      return new Point(this.x, this.y);
    }

    /**
     * @param {Area} area The area to fit
     */

  }, {
    key: 'setArea',
    value: function setArea(area) {
      this.posture.fitToArea(area);
    }

    /**
     * Gets the area which the body occupies.
     * @return {Area}
     */

  }, {
    key: 'getArea',
    value: function getArea() {
      return new Area(this.posture.width, this.posture.height);
    }
  }], [{
    key: 'pxToNum',
    value: function pxToNum(px) {
      return +px.slice(0, -2);
    }
  }]);

  return Body;
}(Being);

module.exports = Body;
},{"./area":5,"./being":6,"./if-num-else":19,"./point":24,"./posture":25,"./reflow":27,"./wait":28}],8:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Animation = require('../animation');

/**
 * Adds `hideAnim` and `showAnim` methods to the decorated class with the given params.
 * @param {Array} show The show animation params
 * @param {Array} hide The hide animation params
 */
module.exports = function (_ref) {
  var show = _ref.show;
  var hide = _ref.hide;
  return function (Cls) {
    if (show) {
      var _show = _slicedToArray(show, 2);

      var name = _show[0];
      var dur = _show[1];

      module.exports.show(name, dur)(Cls);
    }

    if (hide) {
      var _hide = _slicedToArray(hide, 2);

      var name = _hide[0];
      var dur = _hide[1];

      module.exports.hide(name, dur)(Cls);
    }

    return Cls;
  };
};

/**
 * Adds `hideAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
module.exports.hide = function (name) {
  var dur = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];
  return function (Cls) {
    Cls.prototype.hideAnim = function () {
      return new Animation(name, dur);
    };
    return Cls;
  };
};

/**
 * Adds `showAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
module.exports.show = function (name) {
  var dur = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

  var d = function d(Cls) {
    Cls.prototype.showAnim = function () {
      return new Animation(name, dur);
    };
    return Cls;
  };

  d.hide = function (name, dur) {
    return function (Cls) {
      return module.exports.hide(name, dur)(d(Cls));
    };
  };

  return d;
};
},{"../animation":4}],9:[function(require,module,exports){
"use strict";

/**
 * Adds the height method to the class.
 * @param {number} height The height
 * @param {Function} Cls The class to decorate
 */
module.exports = function (height) {
  return function (Cls) {
    Cls.prototype.height = function () {
      return height;
    };
  };
};
},{}],10:[function(require,module,exports){
'use strict';

exports.animation = require('./animation');
exports.ratio = require('./ratio');
exports.transition = require('./transition');
exports.width = require('./width');
exports.height = require('./height');
exports.margin = require('./margin');
},{"./animation":8,"./height":9,"./margin":11,"./ratio":12,"./transition":13,"./width":14}],11:[function(require,module,exports){
"use strict";

/**
 * The decorator for adding `margin%` methods.
 */
module.exports = function (_ref) {
  var x = _ref.x;
  var y = _ref.y;
  var left = _ref.left;
  var right = _ref.right;
  var top = _ref.top;
  var bottom = _ref.bottom;
  return function (Cls) {
    var prototype = Cls.prototype;

    if (x) {
      prototype.marginX = function () {
        return x;
      };
    }
    if (y) {
      prototype.marginY = function () {
        return y;
      };
    }
    if (left) {
      prototype.marginLeft = function () {
        return left;
      };
    }
    if (right) {
      prototype.marginRight = function () {
        return right;
      };
    }
    if (top) {
      prototype.marginTop = function () {
        return top;
      };
    }
    if (bottom) {
      prototype.marginBottom = function () {
        return bottom;
      };
    }

    return Cls;
  };
};
},{}],12:[function(require,module,exports){
"use strict";

/**
 * Adds `ratioX` and `ratioY` methods.
 * @param {number} x The ratioX value
 * @param {number} y The ratioY value
 */
module.exports = function (_ref) {
  var x = _ref.x;
  var y = _ref.y;
  return function (Cls) {
    if (x) {
      module.exports.x(x)(Cls);
    }

    if (y) {
      module.exports.y(y)(Cls);
    }

    return Cls;
  };
};

/**
 * Adds ratioX method to the class.
 * @param {number} x The ratioX value
 */
module.exports.x = function (x) {
  var d = function d(Cls) {
    Cls.prototype.ratioX = function () {
      return x;
    };
    return Cls;
  };

  d.y = function (y) {
    return function (Cls) {
      return module.exports.y(y)(d(Cls));
    };
  };

  return d;
};

/**
 * Adds ratioY method to the class.
 * @param {number} y The ratioY value
 */
module.exports.y = function (y) {
  return function (Cls) {
    Cls.prototype.ratioY = function () {
      return y;
    };
    return Cls;
  };
};
},{}],13:[function(require,module,exports){
"use strict";

/**
 * Sets defaultTransitionDuration method to the class.
 * @param {number} duration The transition duration
 * @param {Function} Cls The class to decorate
 */
exports.duration = function (duration) {
  return function (Cls) {
    Cls.prototype.defaultTransitionDuration = function () {
      return duration;
    };
  };
};
},{}],14:[function(require,module,exports){
"use strict";

/**
 * Adds the height method to the class.
 * @param {number} width The width
 * @param {Function} Cls The class to decorate
 */
module.exports = function (width) {
  return function (Cls) {
    Cls.prototype.width = function () {
      return width;
    };
  };
};
},{}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of the mapping from the direction and state to its corresponding image.
 */

var DirStateImageMap = function () {
  function DirStateImageMap() {
    _classCallCheck(this, DirStateImageMap);

    this.imageMap = {};
  }

  /**
  * @param {string} dir The direction
  * @param {string} state The state
  * @param {Image} image The image
   */


  _createClass(DirStateImageMap, [{
    key: 'addImageByDirState',
    value: function addImageByDirState(image, dir, state) {
      this.imageMap[this.getMapKey(dir, state)] = image;
    }

    /**
     * Gets the image by the dir and state.
     *
     * @param {string} dir The direction
     * @param {string} state The state
     * @return {Image}
     */

  }, {
    key: 'get',
    value: function get(dir, state) {
      var image = this.imageMap[this.getMapKey(dir, state)];

      if (!image) {
        throw new Error('illegal (dir, state): (' + this.dir + ', ' + this.state + ')');
      }

      return image;
    }

    /**
     * Returns the key string for the dir and state.
     *
     * @private
     * @param {string} dir The direction
     * @param {string} state The state
     * @return {string}
     */

  }, {
    key: 'getMapKey',
    value: function getMapKey(dir, state) {
      return dir + '/' + state;
    }
  }]);

  return DirStateImageMap;
}();

module.exports = DirStateImageMap;
},{}],16:[function(require,module,exports){
"use strict";

exports.UP = 0;
exports.TOP = 0;
exports.LEFT = 1;
exports.RIGHT = 2;
exports.BOTTOM = 3;
exports.DOWN = 3;
},{}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = require('./body');

/**
 * A GridWalker is a Body which walks along the given Grid.
 */

var GridWalker = function (_Body) {
  _inherits(GridWalker, _Body);

  _createClass(GridWalker, [{
    key: 'ratioX',

    /**
     * @override
     */
    value: function ratioX() {
      return 0.5;
    }

    /**
     * @override
     */

  }, {
    key: 'ratioY',
    value: function ratioY() {
      return 0.5;
    }

    /**
     * The ratio of how much the grid walker occupies the given cell width.
     *
     * @return {number}
     */

  }, {
    key: 'cellRatioX',
    value: function cellRatioX() {
      return 1;
    }

    /**
     *  The ratio of how much the grid walker occupies the given cell height.
     *
     * @return {number}
     */

  }, {
    key: 'cellRatioY',
    value: function cellRatioY() {
      return 1;
    }
  }]);

  function GridWalker() {
    _classCallCheck(this, GridWalker);

    /**
     * @property {number} m The horizontal grid position
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GridWalker).call(this));

    _this.m = 0;

    /**
     * @property {number} n The vertical grid position
     */
    _this.n = 0;
    return _this;
  }

  /**
   * @override
   */


  _createClass(GridWalker, [{
    key: 'willShow',
    value: function willShow() {
      return this.fitToGrid();
    }

    /**
     * Sets the grid and the position in it.
     *
     * @param {Grid} grid The grid layout info
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */

  }, {
    key: 'setGrid',
    value: function setGrid(grid, m, n) {
      this.grid = grid;

      this.setGridPosition(m, n);
    }

    /**
     * Sets the grid position.
     *
     * @param {Number} [m] The horizontal grid position
     * @param {Number} [n] The vertical grid position
     */

  }, {
    key: 'setGridPosition',
    value: function setGridPosition(m, n) {
      if (typeof m === 'number') {
        this.m = m;
      }

      if (typeof n === 'number') {
        this.n = n;
      }
    }

    /**
     * Updates the element's dom state using the current grid state info.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'updateElemOnGrid',
    value: function updateElemOnGrid(dur) {
      this.x = this.grid.getX(this.m);
      this.y = this.grid.getY(this.n);

      return this.updateElem(dur);
    }

    /**
     * Fits the posture into the (grid.cellWidth, grid.cellHeight) and moves to the current grid position.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'fitToGrid',
    value: function fitToGrid(dur) {
      this.posture.fitInto(this.grid.cellWidth * this.cellRatioX(), this.grid.cellHeight * this.cellRatioY());

      return this.updateElemOnGrid(dur);
    }

    /**
     * Moves to the horizontal grid positon m.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveToM',
    value: function moveToM(m, dur) {
      this.x = this.grid.getX(this.m = m);

      return this.updateElem(dur);
    }

    /**
     * Moves to the vertical grid position n.
     *
     * @param {Number} n The vertical grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveToN',
    value: function moveToN(n, dur) {
      this.y = this.grid.getY(this.n = n);

      return this.updateElem(dur);
    }

    /**
     * Moves to the given grid position.
     *
     * @param {Number} m The horizontal grid position
     * @param {Number} n The vertical grid position
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveToGridPosition',
    value: function moveToGridPosition(m, n, dur) {
      this.setGridPosition(m, n);

      return this.updateElemOnGrid(dur);
    }

    /**
     * Moves along the grid.
     *
     * @param {Number} diffM The move distance along the horizontal line
     * @param {Number} diffN The move distance along the vertical line
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveOnGrid',
    value: function moveOnGrid(distM, distN, dur) {
      return this.moveToGridPosition(this.m + distM, this.n + distN, dur);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveUpOnGrid',
    value: function moveUpOnGrid(dur) {
      return this.moveOnGrid(0, -1, dur);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveRightOnGrid',
    value: function moveRightOnGrid(dur) {
      return this.moveOnGrid(1, 0, dur);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveDownOnGrid',
    value: function moveDownOnGrid(dur) {
      return this.moveOnGrid(0, 1, dur);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @param {Number} [dur] The duration to change
     * @return {Promise}
     */

  }, {
    key: 'moveLeftOnGrid',
    value: function moveLeftOnGrid(dur) {
      return this.moveOnGrid(-1, 0, dur);
    }
  }]);

  return GridWalker;
}(Body);

module.exports = GridWalker;
},{"./body":7}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = require('./rect');
var ifNumElse = require('./if-num-else');

/**
 * Grid model represents the grid layout.
 *
 * The unit of a grid means the rectangle from x_0 to x_1 and from y_0 to x_1
 * The cell of a grid means the rectangle which is put on each grid point.
 * The cell size is just a recommendation of the size of cell.
 *
 * Usually cell width and height are equal to or less then unit width and height respectively.
 */

var Grid = function () {
  /**
   * @param {Number} x The x coordinate
   * @param {Number} y The y coordinate
   * @param {Number} [unitWidth] The width of the unit
   * @param {Number} [unitHeight] The height of the unit
   * @param {Number} [cellWidth] The width of the cell
   * @param {Number} [cellHeight] The height of the cell
   */

  function Grid(_ref) {
    var x = _ref.x;
    var y = _ref.y;
    var unitWidth = _ref.unitWidth;
    var unitHeight = _ref.unitHeight;
    var cellWidth = _ref.cellWidth;
    var cellHeight = _ref.cellHeight;

    _classCallCheck(this, Grid);

    this.x = x;
    this.y = y;
    this.unitWidth = ifNumElse(unitWidth, 0);
    this.unitHeight = ifNumElse(unitHeight, 0);
    this.cellWidth = ifNumElse(cellWidth, this.unitWidth);
    this.cellHeight = ifNumElse(cellHeight, this.unitHeight);
  }

  /**
   * Gets the x of the given grid m position.
   *
   * @param {Number} m The m position (Integer)
   * @return {Number}
   */


  _createClass(Grid, [{
    key: 'getX',
    value: function getX(m) {
      return this.x + this.unitWidth * m;
    }

    /**
     * Gets the y of the given grid n position.
     *
     * @param {Number} n The n position (Integer)
     * @return {Number}
     */

  }, {
    key: 'getY',
    value: function getY(n) {
      return this.y + this.unitHeight * n;
    }

    /**
     * Returns the translated grid by the given distances.
     *
     * @param {Number} x The horizontal translate distance
     * @param {Number} y The vertical translate distance
     * @return {Grid}
     */

  }, {
    key: 'translate',
    value: function translate(x, y) {
      return this.override({
        x: this.x + x,
        y: this.y + y
      });
    }

    /**
     * Returns the shifted grid by the given grid numbers
     *
     * @param {Number} m The horizontal shift number
     * @param {Number} n The vertical shift number
     * @return {Grid}
     */

  }, {
    key: 'shift',
    value: function shift(m, n) {
      return this.translate(this.unitWidth * m, this.unitHeight * n);
    }

    /**
     * Scales the grid by the x axis.
     *
     * @param {Number} scale The scale
     * @return {Grid}
     */

  }, {
    key: 'scaleX',
    value: function scaleX(scale) {
      return this.override({
        unitWidth: this.unitWidth * scale,
        cellWidth: this.cellWidth * scale
      });
    }

    /**
     * Scales the grid by the y axis.
     *
     * @param {Number} scale The scale
     * @return {Grid}
     */

  }, {
    key: 'scaleY',
    value: function scaleY(scale) {
      return this.override({
        unitHeight: this.unitHeight * scale,
        cellHeight: this.cellHeight * scale
      });
    }
  }, {
    key: 'scaleCellX',
    value: function scaleCellX(scale) {
      return this.override({ cellWidth: this.cellWidth * scale });
    }
  }, {
    key: 'scaleCellY',
    value: function scaleCellY(scale) {
      return this.override({ cellHeight: this.cellHeight * scale });
    }

    /**
     * Overrides the given paramter by the given value and returns a new grid.
     *
     * @param {number} x The x
     * @param {number} y The y
     * @param {number} unitWidth The unitWidth
     * @param {number} unitHeight The unitHeight
     * @param {number} cellWidth The cellWidth
     * @param {number} cellHeight The cellHeight
     */

  }, {
    key: 'override',
    value: function override(_ref2) {
      var x = _ref2.x;
      var y = _ref2.y;
      var unitWidth = _ref2.unitWidth;
      var unitHeight = _ref2.unitHeight;
      var cellWidth = _ref2.cellWidth;
      var cellHeight = _ref2.cellHeight;

      return new Grid({
        x: ifNumElse(x, this.x),
        y: ifNumElse(y, this.y),
        unitWidth: ifNumElse(unitWidth, this.unitWidth),
        unitHeight: ifNumElse(unitHeight, this.unitHeight),
        cellWidth: ifNumElse(cellWidth, this.cellWidth),
        cellHeight: ifNumElse(cellHeight, this.cellHeight)
      });
    }

    /**
     * Returns a dual rect.
     *
     * @return {Rect}
     */

  }, {
    key: 'toRect',
    value: function toRect() {
      var halfWidth = this.unitWidth / 2;
      var halfHeight = this.unitHeight / 2;

      return new Rect({
        top: this.y - halfHeight,
        left: this.x - halfWidth,
        right: this.x + halfWidth,
        bottom: this.y + halfHeight

      });
    }

    /**
     * Returns a dual rect.
     *
     * @return {Rect}
     */

  }, {
    key: 'dual',
    value: function dual() {
      return this.toRect();
    }
  }]);

  return Grid;
}();

module.exports = Grid;
},{"./if-num-else":19,"./rect":26}],19:[function(require,module,exports){
'use strict';

/**
 * Shorthand for `typeof num === 'number' ? num : defaultValue`.
 * @param {object} num The number or anthing
 * @param {number} defaultValue The default value
 * @return {number}
 */
module.exports = function (num, defaultValue) {
  return typeof num === 'number' ? num : defaultValue;
};
},{}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The image object
 */

var Image = function () {
  /**
   * @constructor
   * @param {string} src The url of the image
   * @param {boolean} mirrorX If the image is mirrored by x-axis
   * @param {boolean} mirrorY If the image is mirrored by y-axis
   */

  function Image(src, mirrorX, mirrorY) {
    _classCallCheck(this, Image);

    this.src = src;
    this.mirrorX = mirrorX;
    this.mirrorY = mirrorY;

    this.scaleX = this.mirrorX ? -1 : 1;
    this.scaleY = this.mirrorY ? -1 : 1;
  }

  /**
   * Apply the image src and style to the element.
   *
   * @param {jQuery} elem The element to apply the image info (needs to be <img> jquery object)
   */


  _createClass(Image, [{
    key: 'apply',
    value: function apply(elem) {
      elem.css('transform', this.makeTransform());

      elem.attr('src', this.src);
    }

    /**
     * Makes the transform style.
     *
     * @private
     * @return {string}
     */

  }, {
    key: 'makeTransform',
    value: function makeTransform() {
      return 'scale(' + this.scaleX + ', ' + this.scaleY + ')';
    }
  }]);

  return Image;
}();

module.exports = Image;
},{}],21:[function(require,module,exports){
'use strict';

exports.wait = require('./wait');
exports.reflow = require('./reflow');
exports.ifNumElse = require('./if-num-else');
exports.Being = require('./being');
exports.Body = require('./body');
exports.Posture = require('./posture');
exports.LayoutFactory = require('./layout-factory');
exports.Rect = require('./rect');
exports.Grid = require('./grid');
exports.GridWalker = require('./grid-walker');
exports.Animation = require('./animation');
exports.Image = require('./image');
exports.DirStateImageMap = require('./dir-state-image-map');
exports.DIRS = require('./dirs');
exports.decorators = require('./decorators');
Object.keys(exports.decorators).forEach(function (key) {
  exports[key] = exports.decorators[key];
});
exports.Area = require('./area');
exports.Point = require('./point');
},{"./animation":4,"./area":5,"./being":6,"./body":7,"./decorators":10,"./dir-state-image-map":15,"./dirs":16,"./grid":18,"./grid-walker":17,"./if-num-else":19,"./image":20,"./layout-factory":23,"./point":24,"./posture":25,"./rect":26,"./reflow":27,"./wait":28}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Interval model represents the interval on the line.
 *
 * Interval is immutable.
 */

var Interval = function () {
  /**
   * @param {number} high The high of the interval
   * @param {number} low The low of the interval
   */

  function Interval(high, low) {
    _classCallCheck(this, Interval);

    if (high < low) {
      var _ref = [low, high];
      high = _ref[0];
      low = _ref[1];
    }

    this.high = high;
    this.low = low;
  }

  /**
   * Returns the width of the interval.
   *
   * @return {number}
   */


  _createClass(Interval, [{
    key: 'width',
    value: function width() {
      return this.high - this.low;
    }

    /**
     * Returns the middle of the interval.
     *
     * @return {number}
     */

  }, {
    key: 'middle',
    value: function middle() {
      return (this.high + this.low) / 2;
    }

    /**
     * Returns a product (a rect) of the intervals.
     *
     * @param {Interval} interval
     * @param {Rect}
     */

  }, {
    key: 'by',
    value: function by(interval) {
      var Rect = require('./rect');

      return Rect.ofIntervals(this, interval);
    }

    /**
     * @param {number} width
     * @return {Interval}
     */

  }, {
    key: 'cutHigh',
    value: function cutHigh(width) {
      return new Interval(this.high, this.high - width);
    }

    /**
     * @param {number} width
     * @return {Interval}
     */

  }, {
    key: 'cutLow',
    value: function cutLow(width) {
      return new Interval(this.low + width, this.low);
    }

    /**
     * Returns an interval which is shifted the given amount.
     *
     * @param {number} shift The amount of shift, n means shift higher position by its size * n
     * @return {Interval}
     */

  }, {
    key: 'shift',
    value: function shift(n) {
      var shiftWidth = this.width() * n;

      return new Interval(this.high + shiftWidth, this.low + shiftWidth);
    }

    /**
     * @param {number} highMargin
     * @param {number} lowMargin
     * @return {Interval}
     */

  }, {
    key: 'margin',
    value: function margin(highMargin, lowMargin) {
      return new Interval(this.high - highMargin, this.low + lowMargin);
    }

    /**
     * @param {number} size The size of the interval
     * @return {Interval}
     */

  }], [{
    key: 'ofSize',
    value: function ofSize(size) {
      return new Interval(size, 0);
    }
  }]);

  return Interval;
}();

module.exports = Interval;
},{"./rect":26}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = require('./rect');
var Grid = require('./grid');

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */

var LayoutFactory = function () {
  function LayoutFactory() {
    _classCallCheck(this, LayoutFactory);
  }

  _createClass(LayoutFactory, [{
    key: 'grid',

    /**
     * Creates a grid with the given options.
     *
     * @param {Object} options The options
     * @return {Grid}
     */
    value: function grid(options) {
      return new Grid(options);
    }

    /**
     * Creates a rect with the given options.
     *
     * @param {Object} options The options
     * @return {Rect}
     */

  }, {
    key: 'rect',
    value: function rect(options) {
      return new Rect(options);
    }
  }]);

  return LayoutFactory;
}();

module.exports = LayoutFactory;
},{"./grid":18,"./rect":26}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./dirs');

var UP = _require.UP;
var LEFT = _require.LEFT;
var RIGHT = _require.RIGHT;
var DOWN = _require.DOWN;

/**
 * The model of the positions of points in 2-dimensional space.
 */

var Point = function () {
  /**
   * @param {number} x The x
   * @param {number} y The y
   */

  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  /**
   * Returns the point above the given distance.
   * @param {number} distance The distance
   */


  _createClass(Point, [{
    key: 'up',
    value: function up(distance) {
      return new Point(this.x, this.y - distance);
    }

    /**
     * Returns the point left of the given distance.
     * @param {number} distance The distance
     */

  }, {
    key: 'left',
    value: function left(distance) {
      return new Point(this.x - distance, this.y);
    }

    /**
    * Returns the point right of the given distance.
    * @param {number} distance The distance
     */

  }, {
    key: 'right',
    value: function right(distance) {
      return new Point(this.x + distance, this.y);
    }

    /**
    * Returns the point below the given distance.
    * @param {number} distance The distance
     */

  }, {
    key: 'down',
    value: function down(distance) {
      return new Point(this.x, this.y + distance);
    }

    /**
     * Gets the direction to the given point (one of '')
     * @param {Point}
     * @return {Point}
     */

  }, {
    key: 'minus',
    value: function minus(point) {
      return new Point(this.x - point.x, this.y - point.y);
    }

    /**
     */

  }, {
    key: 'getDir',
    value: function getDir() {
      if (Math.abs(this.x) >= Math.abs(this.y)) {
        if (this.x >= 0) {
          return RIGHT;
        }
        return LEFT;
      }

      if (this.y > 0) {
        return DOWN;
      }
      return UP;
    }
  }]);

  return Point;
}();

module.exports = Point;
},{"./dirs":16}],25:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ifNumElse = require('./if-num-else');
var Rect = require('./rect');

/**
 * Posture is the model of the information about how the Body is placed and arranged to its position.
 *
 * @class
 */

var Posture = function () {
  /**
   * @param {Number} [width=100] The width
   * @param {Number} [height=100] The height
   * @param {Number} [ratioX=0] The ratio of horizontal position of the rectangle. ratioX == 0 means the left limit of the rectangle is x. ratioX == 1 means the right limit of the rectangle is x.
   * @param {Number} [ratioY=0] The ratio of vertical position of the rectangle. ratioY == 0 means the top limit of the rectangle is x. ratioY == 1 means the bottom limit of the rectangle is x.
   * @param {Number} [marginX=0] The horizontal margin
   * @param {Number} [marginY=0] The vertical margin
   * @param {Number} [marginLeft] The left margin
   * @param {Number} [marginTop] The top margin
   * @param {Number} [marginRight] The right margin
   * @param {Number} [marginBottom] The bottom margin
   */

  function Posture() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var width = _ref.width;
    var height = _ref.height;
    var ratioX = _ref.ratioX;
    var ratioY = _ref.ratioY;
    var marginX = _ref.marginX;
    var marginY = _ref.marginY;
    var marginLeft = _ref.marginLeft;
    var marginTop = _ref.marginTop;
    var marginRight = _ref.marginRight;
    var marginBottom = _ref.marginBottom;

    _classCallCheck(this, Posture);

    this.width = ifNumElse(width, 100);
    this.height = ifNumElse(height, 100);

    this.ratioX = ifNumElse(ratioX, 0);
    this.ratioY = ifNumElse(ratioY, 0);

    this.marginX = ifNumElse(marginX, 0);
    this.marginY = ifNumElse(marginY, 0);

    this.marginTop = marginTop;
    this.marginRight = marginRight;
    this.marginBottom = marginBottom;
    this.marginLeft = marginLeft;
  }

  /**
   * The actual height of the rect.
   * @return {number}
   */


  _createClass(Posture, [{
    key: 'actualHeight',
    value: function actualHeight() {
      return this.height - this.getMarginTop() - this.getMarginBottom();
    }

    /**
     * @param {number} height The actual height
     */

  }, {
    key: 'setActualHeight',
    value: function setActualHeight(height) {
      this.height = this.getMarginTop() + this.getMarginBottom() + height;
    }

    /**
     * @param {number} width The actual width
     */

  }, {
    key: 'setActualWidth',
    value: function setActualWidth(width) {
      this.width = this.getMarginLeft() + this.getMarginRight() + width;
    }

    /**
     * The actual width of the rect.
     * @return {number}
     */

  }, {
    key: 'actualWidth',
    value: function actualWidth() {
      return this.width - this.getMarginLeft() - this.getMarginRight();
    }

    /**
     * Returns the top margin.
     * @return {number}
     */

  }, {
    key: 'getMarginTop',
    value: function getMarginTop() {
      return ifNumElse(this.marginTop, this.marginY);
    }

    /**
     * Returns the right margin.
     *
     * @return {number}
     */

  }, {
    key: 'getMarginRight',
    value: function getMarginRight() {
      return ifNumElse(this.marginRight, this.marginX);
    }

    /**
     * Returns the bottom margin.
     *
     * @return {number}
     */

  }, {
    key: 'getMarginBottom',
    value: function getMarginBottom() {
      return ifNumElse(this.marginBottom, this.marginY);
    }

    /**
     * Returns the left margin.
     *
     * @return {number}
     */

  }, {
    key: 'getMarginLeft',
    value: function getMarginLeft() {
      return ifNumElse(this.marginLeft, this.marginX);
    }

    /**
     * The top limit of the rect.
     *
     * @param {number} y The primary vertical position
     * @return {number}
     */

  }, {
    key: 'topLimit',
    value: function topLimit(y) {
      return y - this.height * this.ratioY + this.getMarginTop();
    }

    /**
     * The bottom limit of the rect.
     * @param {number} y The primary vertical position
     * @return {number}
     */

  }, {
    key: 'bottomLimit',
    value: function bottomLimit(y) {
      return this.topLimit(y) + this.actualHeight();
    }

    /**
     * The left limit of the rect.
     * @param {number} x The primary horizontal position
     * @return {number}
     */

  }, {
    key: 'leftLimit',
    value: function leftLimit(x) {
      return x - this.width * this.ratioX + this.getMarginLeft();
    }

    /**
     * The right limit of the rect.
     * @param {number} x The primary horizontal position
     * @return {number}
     */

  }, {
    key: 'rightLimit',
    value: function rightLimit(x) {
      return this.leftLimit(x) + this.actualWidth();
    }

    /**
     * The horizontal center of the rect.
     * @param {number} x The primary horizontal position
     * @return {number}
     */

  }, {
    key: 'centerX',
    value: function centerX(x) {
      return (this.leftLimit(x) + this.rightLimit(x)) / 2;
    }

    /**
     * The vertical center of the rect.
     * @param {number} y The primary vertical position
     * @return {number}
     */

  }, {
    key: 'centerY',
    value: function centerY(y) {
      return (this.topLimit(y) + this.bottomLimit(y)) / 2;
    }

    /**
     * Gets the horizontal position when it is placed in the given rect.
     * @param {Rect} rect
     * @return {number}
     */

  }, {
    key: 'getXInRect',
    value: function getXInRect(rect) {
      return rect.left + rect.width() * this.ratioX;
    }

    /**
     * Gets the vertical position when it is placed in the given rect.
     * @param {Rect} rect
     * @return {number}
     */

  }, {
    key: 'getYInRect',
    value: function getYInRect(rect) {
      return rect.top + rect.height() * this.ratioY;
    }

    /**
     * Fits the size to the size of the given rect.
     * @param {Rect} rect
     */

  }, {
    key: 'fitToRect',
    value: function fitToRect(rect) {
      this.fitToArea(rect.area());
    }

    /**
     * Fits the size to the given area.
     * @param {Area} area The area
     */

  }, {
    key: 'fitToArea',
    value: function fitToArea(area) {
      this.width = area.width;
      this.height = area.height;
    }

    /**
     * Scales the rectangle to fit as an inner tangent of the rectangle of the given width and height.
     * @param {number} width The width of the target outer rectangle
     * @param {number} height The height of the target outer rectangle
     */

  }, {
    key: 'fitInto',
    value: function fitInto(width, height) {
      var tangent = new Rect({
        top: 0,
        left: 0,
        right: this.width,
        bottom: this.height
      }).similarInnerTangent(new Rect({
        top: 0,
        left: 0,
        right: width,
        bottom: height
      }));

      this.width = tangent.width();
      this.height = tangent.height();
    }
  }]);

  return Posture;
}();

module.exports = Posture;
},{"./if-num-else":19,"./rect":26}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ifNumElse = require('./if-num-else');
var Interval = require('./interval');
var Area = require('./area');

/**
 * Rect model represents the static rectangle in a screen.
 *
 * Rect is immutable.
 */

var Rect = function () {
  /**
   * @param {number} top The top position
   * @param {number} right The right position
   * @param {number} bottom The bottom position
   * @param {number} left The left position
   */

  function Rect(_ref) {
    var top = _ref.top;
    var right = _ref.right;
    var bottom = _ref.bottom;
    var left = _ref.left;

    _classCallCheck(this, Rect);

    this.horizontal = new Interval(right, left);
    this.vertical = new Interval(bottom, top);
  }

  /**
   * Gets the top position.
   * @return {number}
   */


  _createClass(Rect, [{
    key: 'width',


    /**
     * Gets the width.
     *
     * @return {number}
     */
    value: function width() {
      return this.horizontal.width();
    }

    /**
     * Gets the height.
     *
     * @return {number}
     */

  }, {
    key: 'height',
    value: function height() {
      return this.vertical.width();
    }

    /**
     * Gets the horizontal center.
     *
     * @return {number}
     */

  }, {
    key: 'centerX',
    value: function centerX() {
      return this.horizontal.middle();
    }

    /**
     * Gets the vertical center.
     *
     * @return {number}
     */

  }, {
    key: 'centerY',
    value: function centerY() {
      return this.vertical.middle();
    }

    /**
     * Returns a new rect which scales the top side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */

  }, {
    key: 'scaleTop',
    value: function scaleTop(scale) {
      return this.cutBottom(this.height() * scale);
    }

    /**
     * Returns a new rect which scales the left side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */

  }, {
    key: 'scaleLeft',
    value: function scaleLeft(scale) {
      return this.cutRight(this.width() * scale);
    }

    /**
     * Returns a new rect which scales the right side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */

  }, {
    key: 'scaleRight',
    value: function scaleRight(scale) {
      return this.cutLeft(this.width() * scale);
    }

    /**
     * Returns a new rect which scales the bottom side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */

  }, {
    key: 'scaleBottom',
    value: function scaleBottom(scale) {
      return this.cutTop(this.height() * scale);
    }

    /**
     * Shifts up by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */

  }, {
    key: 'shiftUp',
    value: function shiftUp() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      return this.horizontal.by(this.vertical.shift(-n));
    }

    /**
     * Shifts left by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */

  }, {
    key: 'shiftLeft',
    value: function shiftLeft() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      return this.horizontal.shift(-n).by(this.vertical);
    }

    /**
     * Shifts right by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */

  }, {
    key: 'shiftRight',
    value: function shiftRight() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      return this.horizontal.shift(n).by(this.vertical);
    }

    /**
     * Shifts down by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */

  }, {
    key: 'shiftDown',
    value: function shiftDown() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      return this.horizontal.by(this.vertical.shift(n));
    }

    /**
     * Cuts out the given height from the top.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */

  }, {
    key: 'cutTop',
    value: function cutTop(height) {
      return this.horizontal.by(this.vertical.cutLow(height));
    }

    /**
     * Cuts out the given height from the left.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */

  }, {
    key: 'cutLeft',
    value: function cutLeft(width) {
      return this.horizontal.cutLow(width).by(this.vertical);
    }

    /**
     * Cuts out the given height from the right.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */

  }, {
    key: 'cutRight',
    value: function cutRight(width) {
      return this.horizontal.cutHigh(width).by(this.vertical);
    }

    /**
     * Cuts out the given height from the bottom.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */

  }, {
    key: 'cutBottom',
    value: function cutBottom(height) {
      return this.horizontal.by(this.vertical.cutHigh(height));
    }

    /**
     * Return the next rect which shares the top side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */

  }, {
    key: 'extCutTop',
    value: function extCutTop(height) {
      return this.shiftUp().cutBottom(height);
    }

    /**
     * Return the next rect which shares the left side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */

  }, {
    key: 'extCutLeft',
    value: function extCutLeft(width) {
      return this.shiftLeft().cutRight(width);
    }

    /**
     * Return the next rect which shares the right side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */

  }, {
    key: 'extCutRight',
    value: function extCutRight(width) {
      return this.shiftRight().cutLeft(width);
    }

    /**
     * Return the next rect which shares the bottom side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */

  }, {
    key: 'extCutBottom',
    value: function extCutBottom(height) {
      return this.shiftDown().cutTop(height);
    }

    /**
     * Returns a dual grid
     *
     * @return {Grid}
     */

  }, {
    key: 'toGrid',
    value: function toGrid() {
      var Grid = require('./grid');

      return new Grid({
        x: this.centerX(),
        y: this.centerY(),
        unitWidth: this.width(),
        unitHeight: this.height()
      });
    }

    /**
     * Returns the similar rect which is an inner tangent of (and at the center of) the given rect.
     *
     * @param {Rect} rect The target rect
     * @return {Rect}
     */

  }, {
    key: 'similarInnerTangent',
    value: function similarInnerTangent(rect) {
      var horizontal = rect.horizontal;
      var vertical = rect.vertical;

      if (rect.width() / rect.height() > this.width() / this.height()) {
        var horizontalMargin = (rect.width() - this.width() * rect.height() / this.height()) / 2;
        horizontal = horizontal.margin(horizontalMargin, horizontalMargin);
      } else {
        var verticalMargin = (rect.height() - this.height() * rect.width() / this.width()) / 2;
        vertical = vertical.margin(verticalMargin, verticalMargin);
      }

      return horizontal.by(vertical);
    }

    /**
     * Excludes the margin of the given sides.
     *
     * @param {number} top The top margin
     * @param {number} left The left margin
     * @param {number} right The right margin
     * @param {number} bottom The bottom margin
     */

  }, {
    key: 'margin',
    value: function margin(_ref2) {
      var top = _ref2.top;
      var left = _ref2.left;
      var right = _ref2.right;
      var bottom = _ref2.bottom;

      return this.horizontal.margin(ifNumElse(right, 0), ifNumElse(left, 0)).by(this.vertical.margin(ifNumElse(bottom, 0), ifNumElse(top, 0)));
    }

    /**
     * Retruns the rect of the size of the current window.
     *
     * @return {Rect}
     */

  }, {
    key: 'getBestRect',


    /**
     * Gets the best (biggest) available rect inside this rect of the given horizontal and vertical ratio.
     *
     * @param {number} horizontal The horizontal ratio
     * @param {number} vertical The vertical ratio
     * @return {Rect}
     */
    value: function getBestRect(_ref3) {
      var horizontal = _ref3.horizontal;
      var vertical = _ref3.vertical;

      return Rect.ofSize(horizontal, vertical).similarInnerTangent(this);
    }

    /**
     * Creates the rect of the give size.
     *
     * @param {number} width The width
     * @param {number} height The height
     */

  }, {
    key: 'dual',


    /**
     * Returns a dual grid.
     * @return {Grid}
     */
    value: function dual() {
      return this.toGrid();
    }

    /**
     * Returns the area which this rect occupies.
     * @return {Area}
     */

  }, {
    key: 'area',
    value: function area() {
      return new Area(this.width(), this.height());
    }
  }, {
    key: 'top',
    get: function get() {
      return this.vertical.low;
    }

    /**
     * Gets the bottom position.
     * @return {number}
     */

  }, {
    key: 'bottom',
    get: function get() {
      return this.vertical.high;
    }

    /**
     * Gets the left position.
     * @return {number}
     */

  }, {
    key: 'left',
    get: function get() {
      return this.horizontal.low;
    }

    /**
     * Gets the right position.
     * @return {number}
     */

  }, {
    key: 'right',
    get: function get() {
      return this.horizontal.high;
    }
  }], [{
    key: 'ofIntervals',
    value: function ofIntervals(horizontal, vertical) {
      return new Rect({
        top: vertical.low,
        bottom: vertical.high,
        left: horizontal.low,
        right: horizontal.high
      });
    }
  }, {
    key: 'windowAsRect',
    value: function windowAsRect() {
      return Rect.ofSize($(window).width(), $(window).height());
    }
  }, {
    key: 'ofSize',
    value: function ofSize(width, height) {
      return Interval.ofSize(width).by(Interval.ofSize(height));
    }
  }]);

  return Rect;
}();

module.exports = Rect;
},{"./area":5,"./grid":18,"./if-num-else":19,"./interval":22}],27:[function(require,module,exports){
"use strict";

/**
 * Reflows the given element
 *
 * @param {jQuery|HTMLElement} elem The element
 */
module.exports = function (elem) {
  var offsetHeight = $(elem).get(0).offsetHeight;

  offsetHeight = offsetHeight + 1;

  return elem;
};
},{}],28:[function(require,module,exports){
"use strict";

/**
 * Returns a promise which resolves in the given milliseconds.
 *
 * @param {number} n The time in milliseconds
 * @param {object} result The value to resolve
 * @return {Promise}
 */
module.exports = function (n, result) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(result);
    }, n);
  });
};
},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.traits = traits;
exports.requires = requires;
exports.excludes = excludes;
exports.alias = alias;
exports.as = as;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _REF_ = Symbol();
var _COCKTAIL_REQUIRED_NAME_ = '$$required$$';

function _filterKeys(key) {
    return !key.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/);
}

function _applyMethod(method, traitProto, subject, aliases, excluded) {
    _applyIfNotExcluded(method, traitProto, subject, aliases, excluded);
}

function _raiseErrorIfConflict(methodName, traitProto, subjectProto) {
    var subjectMethod = subjectProto[methodName],
        traitMethod = traitProto[methodName],
        sameMethodName = subjectMethod && traitMethod,
        methodsAreNotTheSame = sameMethodName && subjectMethod.toString() !== traitMethod.toString(),
        traitMethodIsNotARequired = sameMethodName && !_isRequiredMethod(traitProto, methodName),
        subjecMethodIsNotARequired = sameMethodName && !_isRequiredMethod(subjectProto, methodName);

    if (sameMethodName && methodsAreNotTheSame && traitMethodIsNotARequired && subjecMethodIsNotARequired) {
        throw new Error('Method named: ' + methodName + ' is defined twice.');
    }
}

function _raiseErrorIfItIsState(key, traitProto) {
    if (typeof traitProto[key] !== 'function') {
        throw new Error('Trait MUST NOT contain any state. Found: ' + key + ' as state while processing trait');
    }
}

function _isRequiredMethod(target, methodName) {
    var method = target[methodName];
    return method && method.name === _COCKTAIL_REQUIRED_NAME_;
}

function _applyIfNotExcluded(method, traitProto, subject, aliases, excluded) {

    if (excluded.indexOf(method) === -1) {

        var _alias2 = aliases[method] || method;

        _raiseErrorIfConflict(_alias2, traitProto, subject);

        if (!subject[_alias2] || _isRequiredMethod(subject, _alias2)) {
            Object.defineProperty(subject, _alias2, Object.getOwnPropertyDescriptor(traitProto, method));
        }
    }
}

// trait or trait descriptor

function _reference() {
    return this[_REF_] || this;
}

function _aliases() {
    return this.alias || {};
}

function _excludes() {
    return this.excludes || [];
}
// --

function _apply(t) {
    var subject = this,
        aliases = _aliases.call(t),
        excluded = _excludes.call(t),
        ref = _reference.call(t),
        tp = ref.prototype || ref;

    Object.getOwnPropertyNames(tp).filter(_filterKeys).forEach(function (method) {
        _raiseErrorIfItIsState(method, tp);
        _applyMethod(method, tp, subject, aliases, excluded);
    });
}

function _addTrait(t) {
    var subject = this.prototype;
    _apply.call(subject, t);
}

function _asDescriptor() {
    return this.prototype || !this[_REF_] ? _defineProperty({}, _REF_, this) : this;
}

// PUBLIC API -----------------------------------

// decorators

/**
 * @decorator traits
 * Applies all traits as part of the target class.
 * @params Trait1, ...TraitN {Class|Object}
 * @usage
 *    
 *    @traits(TExample) class MyClass {}
 *    
 */

function traits() {
    for (var _len = arguments.length, traitList = Array(_len), _key = 0; _key < _len; _key++) {
        traitList[_key] = arguments[_key];
    }

    return function (target) {
        traitList.forEach(function (trait) {
            _addTrait.call(target, trait);
        });
    };
}

/**
 * @decorator requires
 * Does Nothing. 
 * It's intended to describe / document what methods or properties should be provided by the host class.
 * @params Description1, ...DescriptionN {String}
 * @usage
 *
 * class TPrintCollection {
 * 
 *     @requires('collection')
 *     printCollection() {
 *         console.log(this.collection)
 *     }    
 * }    
 * 
 */

function requires() {
    return function (target, name, descriptor) {};
}

// bindings

/**
 * @binding excludes
 * Excludes the list of methods from the Trait. This is intended to be used within @traits decorator.
 * @params MethodName1, ...MethodNameN {String}
 * @usage
 *
 * @traits(TExample::excludes('methodOne', 'menthodTwo')) class MyClass {}
 *
 */

function excludes() {
    var descriptor = _asDescriptor.call(this);

    for (var _len2 = arguments.length, excludes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        excludes[_key2] = arguments[_key2];
    }

    descriptor.excludes = excludes;

    return descriptor;
}

/**
 * @binding alias
 * Alias the methods defined as key from the Trait as value. This is intended to be used within @traits decorator.
 * @params alias {Object}
 * @usage
 *
 * @traits(TExample::alias({'methodOne': 'parentMethodOne'})) class MyClass {}
 *
 */

function alias(aliases) {
    var descriptor = _asDescriptor.call(this);

    descriptor.alias = aliases;

    return descriptor;
}

/**
 * @binding as
 * Shortcut for excludes and alias. This is intended to be used within @traits decorator.
 * @params options {Object}
 * @oarams options.alias {Object}
 * @params options.exludes {String[]}
 * @usage
 *
 * @traits( TExample::as({ alias: {'methodOne': 'parentMethodOne'}, excludes: ['methodTwo'] }) ) class MyClass {}
 *
 */

function as(options) {
    var _context, _ref2;

    var descriptor = _asDescriptor.call(this);
    var _alias = options.alias;
    var _excludes = options.excludes;

    (_ref2 = (_context = alias.call(descriptor, _alias), excludes)).call.apply(_ref2, [_context].concat(_toConsumableArray(_excludes)));

    return descriptor;
}

/*do nothing*/
},{}],30:[function(require,module,exports){
'use strict';

require('../../../src/debug/debug-scene');

},{"../../../src/debug/debug-scene":33}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var getPropertyNames = require('get-property-names');

var _require = require('dom-gen');

var hr = _require.hr;
var div = _require.div;
var button = _require.button;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

var methodMask = ['constructor'];

var CcFixtureControl = (_dec = on('click').at('.reset'), _dec2 = on('click').at('.component-btn'), _dec3 = on('click').at('.method-btn'), component(_class = (_class2 = function () {
  function CcFixtureControl(elem) {
    _classCallCheck(this, CcFixtureControl);

    elem.append(button({ addClass: 'reset' }, 'RESET'), div({ addClass: 'container' }));

    this.target = $(document.querySelector(elem.attr('target')));

    this.storeFixtures(elem);

    if (elem.attr('auto-reset') === 'true') {
      setTimeout(function () {
        return elem.find('.reset').trigger('click');
      });
    }
  }

  /**
   * Stores the fixtures.
   */

  _createClass(CcFixtureControl, [{
    key: 'storeFixtures',
    value: function storeFixtures(elem) {
      var container = div();

      container.html(elem.find('script').text());

      var fixtures = [];

      container.children().each(function () {
        var cls = this.classList[0];
        fixtures.push({ name: cls, html: this.outerHTML });
      });

      this.fixtures = fixtures;
    }
  }, {
    key: 'container',
    value: function container() {
      var _elem$find;

      return (_elem$find = this.elem.find('.container')).append.apply(_elem$find, arguments);
    }

    /**
     * Resets the contents.
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.container().empty();
      this.target.empty();
      this.target.trigger('scene-start');

      this.createComponentButtons();
    }

    /**
     * Creates component buttons.
     */

  }, {
    key: 'createComponentButtons',
    value: function createComponentButtons() {
      var _this = this;

      this.fixtures.forEach(function (item) {
        _this.container(button({ addClass: 'component-btn', attr: { html: item.html } }, item.name));
      });
    }
  }, {
    key: 'componentClick',
    value: function componentClick(e) {
      var _this2 = this;

      this.container(hr());

      var html = $(e.target).attr('html');
      var name = $(e.target).text();

      this.target.append($(html).cc());
      var coelement = this.target.find('.' + name).cc.get(name);

      getPropertyNames(coelement).forEach(function (key) {
        if (typeof coelement[key] === 'function' && methodMask.indexOf(key) < 0) {
          _this2.container(button({ addClass: 'method-btn', data: { coelement: coelement, key: key } }, key));
        }
      });
    }
  }, {
    key: 'methodClick',
    value: function methodClick(e) {
      var coelement = $(e.target).data('coelement');
      var key = $(e.target).data('key');

      var result = coelement[key]();
      console.log(result);
      window.a = window.a || [];
      window.a.unshift(result);
    }
  }]);

  return CcFixtureControl;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'reset', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'reset'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'componentClick', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'componentClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'methodClick', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'methodClick'), _class2.prototype)), _class2)) || _class);

module.exports = CcFixtureControl;

},{"dom-gen":1,"get-property-names":2}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('dom-gen');

var div = _require.div;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var DebugPanel = (_dec = on('click').at('.toggle'), component(_class = (_class2 = function () {
  function DebugPanel(elem) {
    var _this = this;

    _classCallCheck(this, DebugPanel);

    elem.append(div({ addClass: 'toggle' }, 'DEBUG'));

    if (elem.attr('auto-open') === 'true') {
      setTimeout(function () {
        return _this.click();
      });
    }

    $(document).on('keydown', function (e) {
      if (e.which === 27) {
        _this.click();
      }
    });
  }

  /**
   * The handler of toggle click.
   */

  _createClass(DebugPanel, [{
    key: 'click',
    value: function click() {
      if (this.flag) {
        this.flag = false;
        this.elem.css('top', -$(window).height() * 0.85 + 'px');
      } else {
        this.flag = true;
        this.elem.css('top', '0');
      }
    }
  }]);

  return DebugPanel;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'click', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'click'), _class2.prototype)), _class2)) || _class);

module.exports = DebugPanel;

},{"dom-gen":1}],33:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

require('../level/component');
require('../level/service');
require('./debug-panel');
require('./cc-fixture-control');
require('./rect');
var scene = require('../ui/scene');
var block = require('../ui/block');
var _$$cc = $.cc;
var component = _$$cc.component;
var wire = _$$cc.wire;

var _require = require('dom-gen');

var div = _require.div;
var DebugScene = (_dec = scene.primary, component(_class = block(_class = _dec(_class = (_class2 = function () {
  function DebugScene() {
    _classCallCheck(this, DebugScene);
  }

  _createClass(DebugScene, [{
    key: 'block',
    value: function block(rect) {
      return rect.scaleLeft(9 / 10).scaleRight(8 / 9).scaleTop(9 / 10).scaleBottom(8 / 9);
    }
  }, {
    key: 'setUp',
    value: function setUp() {
      this.elem.append(div({ cc: 'rect' }));
      this.rect.setRect(this.initBlock());
      this.rect.show();
    }
  }, {
    key: 'start',
    value: function start() {}
  }, {
    key: 'rect',
    get: function get() {}
  }]);

  return DebugScene;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'rect', [wire], Object.getOwnPropertyDescriptor(_class2.prototype, 'rect'), _class2.prototype)), _class2)) || _class) || _class) || _class);

module.exports = DebugScene;

},{"../level/component":41,"../level/service":52,"../ui/block":54,"../ui/scene":56,"./cc-fixture-control":31,"./debug-panel":32,"./rect":34,"dom-gen":1}],34:[function(require,module,exports){
'use strict';

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var Body = _require.Body;
var component = $.cc.component;

/**
 * The component which visualizes the rectangle.
 */

var Rect = component(_class = function (_Body) {
  _inherits(Rect, _Body);

  function Rect() {
    _classCallCheck(this, Rect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Rect).apply(this, arguments));
  }

  return Rect;
}(Body)) || _class;

module.exports = Rect;

},{"spn":21}],35:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var Animation = _require.Animation;
var GridWalker = _require.GridWalker;
var component = $.cc.component;

var TRANS_DUR = 150;
var MAX = 3;
var CENTER_M = 1;
var CENTER_N = 1;

/**
 * Ball class represents the ball inside the field of the level.
 */

var Ball = component(_class = function (_GridWalker) {
  _inherits(Ball, _GridWalker);

  function Ball(elem) {
    _classCallCheck(this, Ball);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this));

    _this.maxX = MAX;
    _this.maxY = MAX;

    _this.setGrid(elem.data('grid'), CENTER_M, CENTER_N);

    _this.elem = elem;
    _this.setTransitionDuration(TRANS_DUR);
    return _this;
  }

  _createClass(Ball, [{
    key: 'showAnim',
    value: function showAnim() {
      return new Animation('ball-appear', TRANS_DUR);
    }
  }, {
    key: 'hideAnim',
    value: function hideAnim() {
      return new Animation('ball-disappear', TRANS_DUR);
    }
  }, {
    key: 'willShow',
    value: function willShow() {
      var _this2 = this;

      return _get(Object.getPrototypeOf(Ball.prototype), 'willShow', this).call(this).then(function () {
        return _this2.elem.css('display', 'inline');
      });
    }

    /**
     * Moves the ball to the direction.
     *
     * @param {String} dir
     * @return {Promise}
     */

  }, {
    key: 'move',
    value: function move(dir) {
      return this.setPos(this.posAhead(dir));
    }

    /**
     * Moves to the center in x dir.
     *
     * @return {Promise}
     */

  }, {
    key: 'goCenterX',
    value: function goCenterX() {
      return this.moveToM(CENTER_M);
    }

    /**
     * Moves to the center in y dir.
     *
     * @return {Promise}
     */

  }, {
    key: 'goCenterY',
    value: function goCenterY() {
      return this.moveToN(CENTER_N);
    }
  }, {
    key: 'posAhead',
    value: function posAhead(dir) {
      switch (dir) {
        case 'up':
          return this.relativePos(0, -1);
        case 'down':
          return this.relativePos(0, 1);
        case 'left':
          return this.relativePos(-1, 0);
        case 'right':
          return this.relativePos(1, 0);
      }
    }
  }, {
    key: 'relativePos',
    value: function relativePos(m, n) {
      return { m: (this.m + m + this.maxX) % this.maxX, n: (this.n + n + this.maxY) % this.maxY };
    }
  }, {
    key: 'setPos',
    value: function setPos(pos) {
      this.moveToGridPosition(pos.m, pos.n);
    }

    /**
     * Gets the current grid position.
     *
     * @return {Object}
     */

  }, {
    key: 'pos',
    value: function pos() {
      return { m: this.m, n: this.n };
    }
  }, {
    key: 'refuseToMove',
    value: function refuseToMove(dir) {
      if (dir === 'up' || dir === 'down') {
        return this.elem.anim('ball-refuse-y', TRANS_DUR);
      } else {
        return this.elem.anim('ball-refuse-x', TRANS_DUR);
      }
    }
  }]);

  return Ball;
}(GridWalker)) || _class;

module.exports = Ball;

},{"spn":21}],36:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldIndexGenerator = require('../../util/FieldIndexGenerator');

var _require = require('spn');

var wait = _require.wait;

var _require2 = require('dom-gen');

var object = _require2.object;
var component = $.cc.component;

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */

var CellCollection = component(_class = function () {
  function CellCollection() {
    _classCallCheck(this, CellCollection);

    this.cells = [];
  }

  /**
   * @param {Grid} grid
   */

  _createClass(CellCollection, [{
    key: 'setGrid',
    value: function setGrid(grid) {
      this.grid = grid;
    }

    /**
     * Checks if the field is empty.
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.cells.length === 0;
    }
  }, {
    key: 'loadFromGenes',
    value: function loadFromGenes(genes) {
      var _this = this;

      this.loadList(genes.map(function (gene) {
        return _this.createCellFromGene(gene);
      }));
    }

    /**
     * Create a cell from the gene.
     * @param {string} gene The gene string
     * @return {Cell}
     */

  }, {
    key: 'createCellFromGene',
    value: function createCellFromGene(gene) {
      return object({
        data: { gene: gene },
        prependTo: this.elem
      }).cc.init('cell');
    }

    /**
     * Loads field cells from cell list.
     *
     * @param {Array<Cell>}
     */

  }, {
    key: 'loadList',
    value: function loadList(list) {
      var _this2 = this;

      var indices = new FieldIndexGenerator().generate(list.length, this.usedIndices());

      list.forEach(function (cell, i) {
        var nm = indices[i];

        cell.setGrid(_this2.grid, nm[1], nm[0]);
        cell.unsetLastOne();

        _this2.cells.push(cell);
      });
    }

    /**
     * Processes the stream of released cells from the exit queue.
     *
     * @param {Rx.Observable<Cell[]>}
     * @return {Rx.Observable}
     */

  }, {
    key: 'rearangeCells',
    value: function rearangeCells(releasedCellStream) {
      var _this3 = this;

      return releasedCellStream.pipe(function (releasedCells) {
        _this3.loadList(releasedCells);

        return _this3.resetShapeAndLocate();
      });
    }

    /**
     * Appears all the cells.
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */

  }, {
    key: 'appear',
    value: function appear() {
      return this.cells.map(function (cell, i) {
        return wait(i * 56).then(function () {
          return cell.show();
        });
      }).pop();
    }

    /**
     * Reset the shapes of the cells and locate them.
     * @return {Promise}
     */

  }, {
    key: 'resetShapeAndLocate',
    value: function resetShapeAndLocate() {
      return this.cells.map(function (cell, i) {
        return wait(i * 56).then(function () {
          return cell.fitToGrid();
        });
      }).pop();
    }

    /**
     * Selects all the cells at the position.
     * @param {Object} pos The position
     * @return {Array}
     */

  }, {
    key: 'select',
    value: function select(pos) {
      return this.cells.filter(function (cell) {
        return cell.m === pos.m && cell.n === pos.n;
      });
    }

    /**
     * Finds a cell at the position.
     * @param {Object} pos The position.
     * @return {Cell}
     */

  }, {
    key: 'find',
    value: function find(pos) {
      var candidates = this.select(pos);

      if (candidates.length === 0) {
        return null;
      }

      return candidates[0];
    }

    /**
     * Selects the cells below the given postion.
     * @param {Object} pos The position
     * @return {Array}
     */

  }, {
    key: 'selectRange',
    value: function selectRange(pos) {
      return this.cells.filter(function (cell) {
        return cell.m === pos.m && cell.n > pos.n;
      });
    }

    /**
     * Removes the given cells.
     * @param {Array} cells The cells
     */

  }, {
    key: 'remove',
    value: function remove(cells) {
      this.cells = this.cells.filter(function (cell) {
        return cells.indexOf(cell) < 0;
      });
    }

    /**
     * Returns the list of used position indices.
     * @return {Array}
     */

  }, {
    key: 'usedIndices',
    value: function usedIndices() {
      return this.cells.map(function (cell) {
        return [cell.m, cell.n];
      });
    }
  }]);

  return CellCollection;
}()) || _class;

module.exports = CellCollection;

},{"../../util/FieldIndexGenerator":69,"dom-gen":1,"spn":21}],37:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sprite = require('../../ui/sprite/');

var _require = require('spn');

var GridWalker = _require.GridWalker;
var DIRS = _require.DIRS;
var ratio = _require.ratio;

var _require2 = require('../../ui/screenplay/speaker');

var speaker = _require2.speaker;
var component = $.cc.component;

/**
 * The main character on the level scene.
 */

var Character = (_dec = sprite.character, _dec2 = component('hero'), _dec3 = ratio.x(0.5).y(1), speaker(_class = _dec(_class = _dec2(_class = _dec3(_class = function (_GridWalker) {
  _inherits(Character, _GridWalker);

  function Character(elem) {
    _classCallCheck(this, Character);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Character).call(this));

    _this.initSprite(elem);
    _this.setSpeaker(elem);
    return _this;
  }

  /**
   * @override
   */

  _createClass(Character, [{
    key: 'willShow',
    value: function willShow() {
      this.updateSprite();

      return _get(Object.getPrototypeOf(Character.prototype), 'willShow', this).call(this);
    }
  }, {
    key: 'didShow',
    value: function didShow() {
      this.elem.css('opacity', 1);
    }

    /**
     * @override
     */

  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('opacity', 0);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */

  }, {
    key: 'moveUpOnGrid',
    value: function moveUpOnGrid() {
      this.turn(DIRS.UP);

      return _get(Object.getPrototypeOf(Character.prototype), 'moveUpOnGrid', this).call(this);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */

  }, {
    key: 'moveRightOnGrid',
    value: function moveRightOnGrid() {
      this.turn(DIRS.RIGHT);

      return _get(Object.getPrototypeOf(Character.prototype), 'moveRightOnGrid', this).call(this);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */

  }, {
    key: 'moveDownOnGrid',
    value: function moveDownOnGrid() {
      this.turn(DIRS.DOWN);

      return _get(Object.getPrototypeOf(Character.prototype), 'moveDownOnGrid', this).call(this);
    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */

  }, {
    key: 'moveLeftOnGrid',
    value: function moveLeftOnGrid() {
      this.turn(DIRS.LEFT);

      return _get(Object.getPrototypeOf(Character.prototype), 'moveLeftOnGrid', this).call(this);
    }
  }]);

  return Character;
}(GridWalker)) || _class) || _class) || _class) || _class);

module.exports = Character;

},{"../../ui/screenplay/speaker":61,"../../ui/sprite/":63,"spn":21}],38:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var Animation = _require.Animation;
var Body = _require.Body;
var component = $.cc.component;

/**
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of FieldCells and BallMoveMobLeaveService classes.
 */

var Field = (_dec = component('field-grid'), _dec(_class = function (_Body) {
  _inherits(Field, _Body);

  function Field() {
    _classCallCheck(this, Field);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));
  }

  _createClass(Field, [{
    key: 'showAnim',
    value: function showAnim() {
      return new Animation('field-appear', 200);
    }
  }, {
    key: 'hideAnim',
    value: function hideAnim() {
      return new Animation('field-disappear', 400);
    }

    /**
     * @param {Rect} rect The rect to fit into
     */

  }, {
    key: 'setRect',
    value: function setRect(rect) {
      _get(Object.getPrototypeOf(Field.prototype), 'setRect', this).call(this, rect);

      this.posture.marginX = -5;
      this.posture.marginY = -5;
    }
  }]);

  return Field;
}(Body)) || _class);

module.exports = Field;

},{"spn":21}],39:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('dom-gen');

var object = _require.object;
var _$$cc = $.cc;
var emit = _$$cc.emit;
var component = _$$cc.component;

/**
 * FusionService performs the fusion of the pair of cells.
 */

var FusionService = (_dec = component('fusion-service'), _dec2 = emit('cell-fusion').last, _dec(_class = (_class2 = function () {
  function FusionService() {
    _classCallCheck(this, FusionService);
  }

  _createClass(FusionService, [{
    key: 'setGrid',

    /**
     * @param {Grid} grid The grid
     */
    value: function setGrid(grid) {
      this.grid = grid;
    }

    /**
     * Processes the funsion pair stream and returns the stream of new born cells
     *
     * @param {Rx.Observable<FusionPair>}
     * @return {Rx.Observable<Cell>}
     */

  }, {
    key: 'processFusionPairStream',
    value: function processFusionPairStream(fusionPairStream) {
      var _this = this;

      return fusionPairStream.pipe(function (fusionPair) {
        return _this.performFusion(fusionPair);
      });
    }

    /**
     * Performs fusion.
     *
     * @param {FusionPair} pair The pair
     * @return {Promise} {Promise<Cell>} The new cell
     */

  }, {
    key: 'performFusion',
    value: function performFusion(pair) {
      var _this2 = this;

      return this.getToReactor(pair).then(function () {
        return _this2.fusion(pair);
      });
    }

    /**
     * Makes the pair go to the reactor.
     *
     * @private
     * @param {FusionPair} pair The pair going to fusion reactor
     * @return {Promise} The end of the animation of going to the reactor
     */

  }, {
    key: 'getToReactor',
    value: function getToReactor(pair) {
      var dur = 1000;

      // pair.right could be null
      if (pair.right) {
        pair.right.anim('get-to-reactor-right', dur).then(function () {
          return pair.right.remove();
        });
      }

      // pair.left always exists
      return pair.left.anim('get-to-reactor-left', dur).then(function () {
        return pair.left.remove();
      });
    }

    /**
     * Perform cell fusion.
     * @private
     * @param {FusionPair} pair The fusion pair
     * @return {Promise} The new cell {Promise<Cell>}
     */

  }, {
    key: 'fusion',
    value: function fusion(pair) {
      var dur = 600;

      var cell = object({
        data: { gene: pair.newGene() },
        prependTo: this.elem
      }).cc.init('cell');

      cell.setGrid(this.grid, 0, 0);

      if (pair.isLastOne()) {
        cell.setLastOne();
      }

      if (pair.isEvolving()) {
        cell.setEvolved();
      }

      return cell.show(dur).then(function () {
        return cell;
      });
    }
  }]);

  return FusionService;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'fusion', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'fusion'), _class2.prototype)), _class2)) || _class);

module.exports = FusionService;

},{"dom-gen":1}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

require('../service/goal-detection');

var _require = require('../../util/emoji');

var renderEmoji = _require.renderEmoji;

var _require2 = require('spn');

var Body = _require2.Body;
var animation = _require2.animation;
var ratio = _require2.ratio;
var _$$cc = $.cc;
var on = _$$cc.on;
var component = _$$cc.component;

var CSS_CLASS_GOAL_EMOJI = 'emoji-round-yellow';

/**
 * The goal panel on the top right corner.
 */
// @margin(6, 6, 6, 6)
var GoalPanel = (_dec = animation.show('bom-appear', 400).hide('bom-disapper', 400), _dec2 = ratio.x(0).y(0), _dec3 = on('goal-detection.goal'), _dec(_class = _dec2(_class = component(_class = (_class2 = function (_Body) {
  _inherits(GoalPanel, _Body);

  function GoalPanel() {
    _classCallCheck(this, GoalPanel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GoalPanel).apply(this, arguments));
  }

  _createClass(GoalPanel, [{
    key: 'marginX',
    value: function marginX() {
      return 6;
    }
  }, {
    key: 'marginY',
    value: function marginY() {
      return 6;
    }

    /**
     * Sets the goals as text.
     * @param {string} goals The goals in text
     */

  }, {
    key: 'setGoals',
    value: function setGoals(goals) {
      this.goals = goals;
      this.elem.data('goals-text', goals);
      this.elem.cc('goal-detection');
    }

    /**
     * The handler for the goal detection.
     * @param {object} e The event
     * @param {number} index The index of goaled cell
     */

  }, {
    key: 'onGoalDetection',
    value: function onGoalDetection(e, index) {
      var target = this.elem.find('.emoji')[index];

      $(target).addClass(CSS_CLASS_GOAL_EMOJI);
    }

    /**
     * Returns true iff all the goals have been achieved.
     * @return {boolean}
     */

  }, {
    key: 'isFull',
    value: function isFull() {
      return this.elem.cc.get('goal-detection').remaining() === 0;
    }

    /**
     * Shows the goals.
     */

  }, {
    key: 'showGoals',
    value: function showGoals() {
      this.elem.html(renderEmoji(this.goals));
    }
  }, {
    key: 'willShow',
    value: function willShow() {
      this.showGoals();

      this.updateElem();
    }
  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('opacity', 0);
    }
  }]);

  return GoalPanel;
}(Body), (_applyDecoratedDescriptor(_class2.prototype, 'onGoalDetection', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'onGoalDetection'), _class2.prototype)), _class2)) || _class) || _class) || _class);

module.exports = GoalPanel;

},{"../../util/emoji":70,"../service/goal-detection":51,"spn":21}],41:[function(require,module,exports){
'use strict';

require('./ball');
require('./cell-collection');
require('./character');
require('./field');
require('./fusion-service');
require('./result-pane');
require('./scoreboard');
require('./goal-panel');
require('./swipe-field');
require('./moo');
require('./level-key');
require('./level-signboard');

},{"./ball":35,"./cell-collection":36,"./character":37,"./field":38,"./fusion-service":39,"./goal-panel":40,"./level-key":42,"./level-signboard":43,"./moo":44,"./result-pane":46,"./scoreboard":47,"./swipe-field":48}],42:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sprite = require('../../ui/sprite');

var _require = require('spn');

var Body = _require.Body;
var decorators = _require.decorators;
var animation = decorators.animation;
var ratio = decorators.ratio;
var component = $.cc.component;
var LevelKey = (_dec = sprite.static, _dec2 = ratio.x(0.5).y(1), _dec3 = animation.show('level-key-show', 3000).hide('level-key-hide', 1500), _dec(_class = _dec2(_class = _dec3(_class = component(_class = function (_Body) {
  _inherits(LevelKey, _Body);

  /**
   * @param {jQuery} elem The element
   */

  function LevelKey(elem) {
    _classCallCheck(this, LevelKey);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelKey).call(this));

    _this.initSprite();
    return _this;
  }

  _createClass(LevelKey, [{
    key: 'image',
    value: function image() {
      return global.BASEPATH + '/img/key.svg';
    }

    /**
     * @override
     */

  }, {
    key: 'willShow',
    value: function willShow() {
      this.updateSprite();

      return _get(Object.getPrototypeOf(LevelKey.prototype), 'willShow', this).call(this);
    }

    /**
     * @override
     */

  }, {
    key: 'didShow',
    value: function didShow() {
      this.elem.css('opacity', 1);
    }

    /**
     * @override
     */

  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('opacity', 0);
    }
  }]);

  return LevelKey;
}(Body)) || _class) || _class) || _class) || _class);

module.exports = LevelKey;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../ui/sprite":63,"spn":21}],43:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var Body = _require.Body;
var animation = _require.animation;

var block = require('../../ui/block');

var _require2 = require('dom-gen');

var small = _require2.small;
var br = _require2.br;
var span = _require2.span;
var component = $.cc.component;
var LevelSignboard = (_dec = animation.show('bom-appear', 400).hide('bom-disappear', 400), component(_class = block(_class = _dec(_class = function (_Body) {
  _inherits(LevelSignboard, _Body);

  function LevelSignboard(elem) {
    _classCallCheck(this, LevelSignboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelSignboard).call(this));

    _this.level = elem.text();
    elem.empty();
    return _this;
  }

  /**
   * Sets the contents.
   * @param {object[]} args The contents
   */

  _createClass(LevelSignboard, [{
    key: 'setLabel',
    value: function setLabel() {
      var _elem;

      this.elem.empty();
      (_elem = this.elem).append.apply(_elem, arguments);
    }

    /**
     * Sets the text label for the entering scene.
     */

  }, {
    key: 'setEntering',
    value: function setEntering() {
      this.setLabel(small('Entering'), br(), span('Level ' + this.level));
    }

    /**
     * Sets the text label for the entering scene.
     */

  }, {
    key: 'setLeaving',
    value: function setLeaving() {
      this.setLabel(small('Leaving'), br(), span('Level ' + this.level));
    }

    /**
     * Defines the block's rect by the given guiding rect.
     * @param {Rect} guidingRect
     * @return {Rect}
     */

  }, {
    key: 'block',
    value: function block(guidingRect) {
      return guidingRect.scaleLeft(8 / 9).scaleRight(7 / 8).scaleTop(2 / 3).scaleBottom(1 / 2);
    }
  }, {
    key: 'willShow',
    value: function willShow() {
      this.setRect(this.initBlock());

      _get(Object.getPrototypeOf(LevelSignboard.prototype), 'willShow', this).call(this);
    }
  }, {
    key: 'didShow',
    value: function didShow() {
      this.elem.css('opacity', 1);
    }
  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('opacity', 0);
    }
  }]);

  return LevelSignboard;
}(Body)) || _class) || _class) || _class);

module.exports = LevelSignboard;

},{"../../ui/block":54,"dom-gen":1,"spn":21}],44:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resident = require('./resident');

var _require = require('spn');

var animation = _require.animation;
var component = $.cc.component;
var Moo = (_dec = animation.show('bom-appear', 400).hide('bom-disappear', 400), component(_class = _dec(_class = function (_Resident) {
  _inherits(Moo, _Resident);

  function Moo() {
    _classCallCheck(this, Moo);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Moo).apply(this, arguments));
  }

  _createClass(Moo, [{
    key: 'image',
    value: function image() {
      return global.BASEPATH + '/img/moo.svg';
    }
  }]);

  return Moo;
}(Resident)) || _class) || _class);

module.exports = Moo;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./resident":45,"spn":21}],45:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sprite = require('../../ui/sprite');

var _require = require('../../ui/screenplay/speaker');

var speaker = _require.speaker;

var _require2 = require('spn');

var Body = _require2.Body;
var ratio = _require2.ratio;
var Resident = (_dec = sprite.static, _dec2 = sprite.relativeBody, _dec3 = ratio.x(0.5).y(1), _dec(_class = _dec2(_class = speaker(_class = _dec3(_class = function (_Body) {
  _inherits(Resident, _Body);

  function Resident(elem) {
    _classCallCheck(this, Resident);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resident).call(this));

    _this.initSprite();
    _this.setSpeaker(elem);

    var _elem$attr$split = elem.attr('xy').split(/\s+/);

    var _elem$attr$split2 = _slicedToArray(_elem$attr$split, 2);

    var x = _elem$attr$split2[0];
    var y = _elem$attr$split2[1];

    _this.relX = x / 100;
    _this.relY = y / 100;
    _this.relW = 1 / 8;
    _this.relH = 1 / 8;
    return _this;
  }

  _createClass(Resident, [{
    key: 'willShow',
    value: function willShow() {
      this.updateSprite();

      return _get(Object.getPrototypeOf(Resident.prototype), 'willShow', this).call(this);
    }
  }, {
    key: 'didShow',
    value: function didShow() {
      this.elem.css('opacity', 1);
    }
  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('opacity', 0);
    }
  }]);

  return Resident;
}(Body)) || _class) || _class) || _class) || _class);

module.exports = Resident;

},{"../../ui/screenplay/speaker":61,"../../ui/sprite":63,"spn":21}],46:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var wait = _require.wait;
var Body = _require.Body;

var _require2 = require('dom-gen');

var div = _require2.div;
var ul = _require2.ul;
var li = _require2.li;
var component = $.cc.component;

/**
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 */

var ResultPane = component(_class = function (_Body) {
  _inherits(ResultPane, _Body);

  function ResultPane() {
    _classCallCheck(this, ResultPane);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultPane).apply(this, arguments));
  }

  _createClass(ResultPane, [{
    key: 'setScore',

    /**
     * Sets the score.
     * @param {number} score The score to set
     */
    value: function setScore(score) {
      this.score = score;
    }

    /**
     * @param {boolean} isSuccess True iff the result is successful
     */

  }, {
    key: 'setSuccess',
    value: function setSuccess(isSuccess) {
      this.isSuccess = isSuccess;
    }

    /**
     * Sets the number of the stars.
     * @param {number} star The number of stars
     */

  }, {
    key: 'setStar',
    value: function setStar(star) {
      this.star = star;
    }

    /**
     * @override
     */

  }, {
    key: 'willShow',
    value: function willShow() {
      this.elem.append(div({ addClass: 'result-content', css: { opacity: 0, position: 'relative' } }, ul(li('score: ' + this.score), li('success: ' + this.isSuccess))));

      return _get(Object.getPrototypeOf(ResultPane.prototype), 'willShow', this).call(this);
    }

    /**
     * Shows the result pane and it automatically hides timeout later.
     *
     * @param {number} timeout The time after which the pane hides itself
     * @return {Promise} The promise which resolves when the pane hides
     */

  }, {
    key: 'show',
    value: function show(timeout) {
      var _this2 = this;

      return _get(Object.getPrototypeOf(ResultPane.prototype), 'show', this).call(this).then(function () {
        return _this2.showInfoPane(timeout);
      });
    }

    /**
     * Shows the info pane with the given timeout.
     * @param {Number} timeout
     * @return {Promise}
     */

  }, {
    key: 'showInfoPane',
    value: function showInfoPane(timeout) {
      var _this3 = this;

      return this.elem.attr({ m: 9, n: 7 }).cc.init('multiflip').show().then(function () {
        return Promise.race([wait(timeout), _this3.elem.once('click touchstart')]);
      }).then(function () {
        return _this3.elem.cc.get('multiflip').hide();
      });
    }
  }]);

  return ResultPane;
}(Body)) || _class;

module.exports = ResultPane;

},{"dom-gen":1,"spn":21}],47:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var animation = _require.animation;
var Body = _require.Body;
var ratio = _require.ratio;

var _require2 = require('../../util/util');

var commaNumber = _require2.commaNumber;
var component = $.cc.component;

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */

var Scoreboard = (_dec = animation.show('bom-appear', 400).hide('bom-disappear', 400), _dec2 = ratio.x(0).y(0), component(_class = _dec(_class = _dec2(_class = function (_Body) {
  _inherits(Scoreboard, _Body);

  _createClass(Scoreboard, [{
    key: 'marginX',
    value: function marginX() {
      return 6;
    }
  }, {
    key: 'marginY',
    value: function marginY() {
      return 6;
    }

    /**
     * @constructor
     */

  }]);

  function Scoreboard() {
    _classCallCheck(this, Scoreboard);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scoreboard).call(this));

    _this.score = 0;
    return _this;
  }

  /**
   * Hooks the score retrieving process to the fusion pair stream.
   *
   * @param {Rx.Observable<FusionPair>} fusionPairStream
   * @return {Rx.Observable<FusionPair>}
   */

  _createClass(Scoreboard, [{
    key: 'hookToFusionPairStream',
    value: function hookToFusionPairStream(fusionPairStream) {
      var _this2 = this;

      return fusionPairStream.map(function (fusionPair) {
        _this2.addScore(fusionPair.score());

        return fusionPair;
      });
    }

    /**
     * Set up the initial dom state.
     */

  }, {
    key: 'willShow',
    value: function willShow() {
      _get(Object.getPrototypeOf(Scoreboard.prototype), 'willShow', this).call(this);

      this.update();
    }

    /**
     * Updates the scoreboard's number.
     */

  }, {
    key: 'update',
    value: function update() {
      this.elem.text(commaNumber(this.score));
    }

    /**
     * Add the score to the total score.
     * @param {Number} score The score to add
     */

  }, {
    key: 'addScore',
    value: function addScore(score) {
      this.score += score;

      this.update();
    }

    /**
     * Gets the current score.
     * @return {Number}
     */

  }, {
    key: 'getScore',
    value: function getScore() {
      return this.score;
    }
  }]);

  return Scoreboard;
}(Body)) || _class) || _class) || _class);

module.exports = Scoreboard;

},{"../../util/util":71,"spn":21}],48:[function(require,module,exports){
'use strict';

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var component = $.cc.component;

/**
 * SwipeEvent class provides the stream of the swipe events.
 */

var SwipeField = component(_class = function SwipeField(elem) {
  _classCallCheck(this, SwipeField);

  elem.swipeCross();

  $(document).arrowkeys();

  $(document).on('upkey', function () {
    return elem.trigger('swipeup');
  });
  $(document).on('downkey', function () {
    return elem.trigger('swipedown');
  });
  $(document).on('leftkey', function () {
    return elem.trigger('swipeleft');
  });
  $(document).on('rightkey', function () {
    return elem.trigger('swiperight');
  });
}) || _class;

module.exports = SwipeField;

},{}],49:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var component = $.cc.component;

/**
 * CellQueueBumpService is responsible for checking the bump condition of the cells in the exit queue.
 */

void (_dec = component('cell-queue-bump-service'), _dec(_class = function () {
  function CellQueueBumpService() {
    _classCallCheck(this, CellQueueBumpService);
  }

  _createClass(CellQueueBumpService, [{
    key: 'bump',

    /**
     * @param {Rx.Observable<Cell[]>} exitCells The stream of the lists of the exit cells
     */
    value: function bump(exitCells) {
      return exitCells.takeWhile(function (cells) {
        if (cells.length <= 1) {
          return false;
        }

        var lastOne = cells.slice(-1)[0];

        if (!lastOne.isEvolved()) {
          return false;
        }

        return true;
      });
    }
  }]);

  return CellQueueBumpService;
}()) || _class);

},{}],50:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var component = $.cc.component;

/**
 * The source of cells in a level
 */

void (_dec = component('gene-source'), _dec(_class = function () {
  function _class(elem) {
    _classCallCheck(this, _class);

    this.genes = this.parseGenes(elem.text());
  }

  /**
   * Parses the text genes.
   * @param {string} text The input text
   * @return {string[]}
   */

  _createClass(_class, [{
    key: 'parseGenes',
    value: function parseGenes(text) {
      return text.replace(/^\s*|\s*$/g, '').split(/\s+/);
    }
  }]);

  return _class;
}()) || _class);

},{}],51:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('../../util/emoji');

var extractCells = _require.extractCells;
var _$$cc = $.cc;
var on = _$$cc.on;
var emit = _$$cc.emit;
var component = _$$cc.component;

/**
 * The service class which detects if the goals are achieved.
 */

void (_dec = component('goal-detection'), _dec2 = on('cell-fusion'), _dec3 = emit('goal-detection.goal'), _dec(_class = (_class2 = function () {
  /**
   * Sets the goals.
   * @param {string} goals The goals in text
   */

  function GoalDetectionService(elem) {
    _classCallCheck(this, GoalDetectionService);

    this.goals = extractCells(elem.data('goals-text'));
  }

  /**
   * @param {object} e The event object
   * @param {Cell} cell The new born cell
   */

  _createClass(GoalDetectionService, [{
    key: 'onCellFusion',
    value: function onCellFusion(e, cell) {
      var index = this.goals.indexOf(cell.gene);

      if (index !== -1) {
        this.countGoal(index);
      }
    }

    /**
     * Counts the goal at the given index. This means the goal of the given index is achieved.
     * @param {number} index The index of the goal
     */

  }, {
    key: 'countGoal',
    value: function countGoal(index) {
      delete this.goals[index];

      if (this.remaining() === 0) {
        this.elem.trigger('goal-detection.finish');
      }
    }

    /**
     * Returns the number of remaining goals.
     * @return {number}
     */

  }, {
    key: 'remaining',
    value: function remaining() {
      return this.goals.filter(function (x) {
        return x != null;
      }).length;
    }
  }]);

  return GoalDetectionService;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onCellFusion', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onCellFusion'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'countGoal', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'countGoal'), _class2.prototype)), _class2)) || _class);

},{"../../util/emoji":70}],52:[function(require,module,exports){
'use strict';

require('./goal-detection');
require('./cell-queue-bump-service');
require('./gene-source');

},{"./cell-queue-bump-service":49,"./gene-source":50,"./goal-detection":51}],53:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('spn');

var Rect = _require.Rect;

/**
 * Block is a trait which has its own dimension which is relative to its parent's guiding rect.
 */

var Block = function () {
  function Block() {
    _classCallCheck(this, Block);
  }

  _createClass(Block, [{
    key: 'needsGuidingRect',

    /**
     * Requires the guiding rect.
     */
    value: function needsGuidingRect() {
      this.elem.parent().trigger('block-need-guiding-rect', this);

      if (!this.__guidingRect__) {
        this.__guidingRect__ = Rect.windowAsRect();
      }
    }

    /**
     * Initializes the block's rect by the overriden `block` method
     */

  }, {
    key: 'initBlock',
    value: function initBlock() {
      this.blockRect = this.block(this.getGuidingRect());
      return this.blockRect;
    }
  }, {
    key: 'getGuidingRect',
    value: function getGuidingRect() {
      if (this.__guidingRect__) {
        return this.__guidingRect__;
      }

      this.needsGuidingRect();

      return this.__guidingRect__;
    }

    /**
     * @param {object} e The event object
     * @param {Block} child The child block
     */

  }, {
    key: 'onChildNeedGuidingRect',
    value: function onChildNeedGuidingRect(e, child) {
      e.stopPropagation();

      if (this.blockRect) {
        child.__guidingRect__ = this.blockRect;

        return;
      }

      child.__guidingRect__ = this.getGuidingRect();
    }
  }]);

  return Block;
}();

module.exports = Block;

},{"spn":21}],54:[function(require,module,exports){
'use strict';

var on = $.cc.on;

var _require = require('traits-decorator');

var traits = _require.traits;

module.exports = function (Cls) {
  on('block-need-guiding-rect')(Cls.prototype, 'onChildNeedGuidingRect');

  traits(require('./block'))(Cls);
};

},{"./block":53,"traits-decorator":29}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('spn');

var wait = _require.wait;

var Dur = 700;

/**
 * BackgroundService handles the animation of background colors.
 */

var BackgroundService = function () {
  function BackgroundService() {
    _classCallCheck(this, BackgroundService);
  }

  _createClass(BackgroundService, null, [{
    key: 'turnWhite',

    /**
     * Turns the bg color white.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */
    value: function turnWhite(dur) {
      return this.turn('', dur, false);
    }

    /**
     * Turns the bg color white.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */

  }, {
    key: 'turnBlack',
    value: function turnBlack(dur) {
      return this.turn('', dur, true);
    }

    /**
     * Turns the bg color to the given color.
     *
     * @private
     * @param {String} color The color in css color
     * @param {Number} dur The duration
     * @param {Boolean} darkBg True if use dark background format
     * @return {Promise}
     */

  }, {
    key: 'turn',
    value: function turn(color, dur, darkBg) {
      dur = dur || Dur;

      $(document.body).toggleClass('dark-bg', darkBg).css('background-color', color);

      return wait(dur);
    }
  }]);

  return BackgroundService;
}();

module.exports = BackgroundService;

},{"spn":21}],56:[function(require,module,exports){
'use strict';

var BackgroundService = require('./common/background-service');
var isFunction = function isFunction(f) {
  return typeof f === 'function';
};

var component = $.cc.component;

var scene = function scene(Cls) {
  Object.defineProperty(Cls.prototype, 'main', {
    value: function value() {
      var _this = this;

      return Promise.resolve(isFunction(this.load) && this.load()).then(function () {
        return isFunction(_this.setUp) && _this.setUp();
      }).then(function () {
        return isFunction(_this.start) && _this.start();
      });
    }
  });

  Object.defineProperty(Cls.prototype, 'bg', {
    get: function get() {
      return BackgroundService;
    }
  });

  Object.defineProperty(Cls.prototype, 'menuButton', {
    get: function get() {
      return $('.menu-button-root').cc.get('menu-button');
    }
  });

  return component(Cls);
};

scene.primary = function (Cls) {
  $.cc.on('scene-start')(Cls.prototype, 'main');
  return scene(Cls);
};

module.exports = scene;

},{"./common/background-service":55}],57:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('../../util/emoji');

var renderEmoji = _require.renderEmoji;

var _require2 = require('spn');

var wait = _require2.wait;

var _require3 = require('dom-gen');

var p = _require3.p;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

var DEFAULT_SPEECH_TIMEOUT = 500;

/**
 * SpeechBubble class is ui class for a speech bubble
 * [data] {HTMLElement|string|jQuery} target The target of the bubble
 * [data] {HTMLElement|string|jQuery} skipTarget The target of the bubble
 * [data] {string} message The contents of speech
 * [data] {number} timeout The timeout duration of showing of the bubble
 */
var MessageBalloon = (_dec = component('message-balloon'), _dec2 = on('message-balloon.start'), _dec(_class = (_class2 = function () {
  function MessageBalloon(elem) {
    _classCallCheck(this, MessageBalloon);

    this.target = $(elem.data('target'))[0];
    this.skipTarget = $(elem.data('skip-target'));
    this.message = elem.data('message');
    this.timeout = +elem.data('timeout') || DEFAULT_SPEECH_TIMEOUT;
  }

  /**
   * Starts showing the balloon and returns a promise.
   * @return {Promise}
   */

  _createClass(MessageBalloon, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.elem.trigger('message-balloon.started');

      this.elem.append(p({ css: { height: 0, overflow: 'hidden' } }, renderEmoji(this.message)), // This is dummy for occupying the space.
      p(renderEmoji(this.message, 'punch-emoji')).cc('puncher').trigger('puncher.start') // This is actual message for showing
      );
      var drop = new global.Drop({
        target: this.target,
        content: this.elem[0],
        classes: 'drop-theme-arrows-bounce',
        position: 'top center',
        openOn: 'always'
      });

      return this.elem.once('puncher.ended').then(function () {
        return wait(_this.timeout / 10);
      }).then(function () {
        return drop.close();
      }).then(function () {
        return wait(500);
      }).then(function () {
        return _this.elem.trigger('message-balloon.ended');
      });
    }
  }]);

  return MessageBalloon;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'start', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'start'), _class2.prototype)), _class2)) || _class);

module.exports = MessageBalloon;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../util/emoji":70,"dom-gen":1,"spn":21}],58:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _require = require('spn');

var wait = _require.wait;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

/**
 * Emoji character component.
 */

var PunchEmoji = (_dec = component('punch-emoji'), _dec2 = on('puncher.appended'), _dec(_class = (_class2 = function () {
  /**
   * @param {jQuery} elem The jquery object
   */

  function PunchEmoji(elem) {
    _classCallCheck(this, PunchEmoji);

    elem.css('opacity', 0);
  }

  _createClass(PunchEmoji, [{
    key: 'onAppended',
    value: function onAppended() {
      var _this = this;

      wait(100).then(function () {
        return _this.elem.css('opacity', 1);
      });
    }
  }]);

  return PunchEmoji;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onAppended', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onAppended'), _class2.prototype)), _class2)) || _class);

module.exports = PunchEmoji;

},{"spn":21}],59:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Screenplay line represents a line of a screenplay.
 */

var ScreenplayLine = function () {

  /**
   * @param {string} selector The selector of the actor
   * @param {string} line The screenplay line
   * @param {jQuery} context The context (range) of screenplay. Every role should be inside this range. If null is given, then this class looking for the role in the entire document.
   * @param {object} options The option parameters
   */

  function ScreenplayLine(selector, line, context) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ScreenplayLine);

    this.selector = selector;
    this.line = line;
    this.context = context;
    this.options = options;
  }

  /**
   * Gets the actor of this line.
   */

  _createClass(ScreenplayLine, [{
    key: 'getActor',
    value: function getActor() {
      return this.getElement().data('speaker');
    }

    /**
     * Gets the element.
     * @return {jQuery}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return $(this.selector, this.context);
    }

    /**
     * Plays the role.
     * @param {object} opts The options
     */

  }, {
    key: 'play',
    value: function play(opts) {
      var _this = this;

      return Promise.resolve(this.getActor().speak(this.line, opts)).then(function () {
        if (typeof _this.options.goals === 'string') {
          _this.getElement().trigger('screenplay.goals', _this.options.goals);
        }
      });
    }

    /**
     * Checks if the corresponding actor is ready.
     *
     * If actor is available as a dom and the class has speak method, then it's "ready".
     * @return {boolean}
     */

  }, {
    key: 'actorIsReady',
    value: function actorIsReady() {
      var actor = this.getActor();

      return actor != null && typeof actor.speak === 'function';
    }
  }]);

  return ScreenplayLine;
}();

module.exports = ScreenplayLine;

},{}],60:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ScreenplayLine = require('./screenplay-line');

var _require = require('scenarioscript');

var parse = _require.parse;
var _$$cc = $.cc;
var on = _$$cc.on;
var component = _$$cc.component;

var variables = {};

/**
 * The manager class of screenplay.
 */
var Screenplay = (_dec = component('screenplay'), _dec2 = on('screenplay-start'), _dec(_class = (_class2 = function () {
  function Screenplay(elem) {
    var _this = this;

    _classCallCheck(this, Screenplay);

    this.context = elem.data('context');

    var text = elem.text();

    this.lines = parse(text).map(function (line) {
      return new ScreenplayLine(line.role, line.message, _this.context, line.params);
    });
  }

  /**
   * Replaces @word@ style variables in the text.
   * @param {string} text The text
   * @param {object} vars The variables
   */

  _createClass(Screenplay, [{
    key: 'actorsReady',

    /**
     * Returns true iff all the actors are ready.
     * @return {boolean}
     */
    value: function actorsReady() {
      return this.lines.filter(function (line) {
        return !line.actorIsReady();
      }).length === 0;
    }

    /**
     * Plays the screenplay.
     * @param {object} [vars] The template variables
     * @return {Promise}
     */

  }, {
    key: 'play',
    value: function play() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var vars = _ref.vars;

      vars = vars || {};
      vars = Object.assign({}, variables, vars);

      return this.lines.reduce(function (previous, line) {
        return previous.then(function () {
          return line.play({ vars: vars });
        });
      }, Promise.resolve());
    }
  }], [{
    key: 'replaceVars',
    value: function replaceVars(text, vars) {
      Object.keys(vars).forEach(function (key) {
        var value = vars[key];

        text = text.replace('@' + key + '@', value);
      });

      return text;
    }

    /**
     * @param {object} vars The variables
     */

  }, {
    key: 'addVars',
    value: function addVars(vars) {
      Object.keys(vars).forEach(function (key) {
        var value = vars[key];

        variables[key] = value;
      });
    }
  }]);

  return Screenplay;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'play', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'play'), _class2.prototype)), _class2)) || _class);

module.exports = Screenplay;

},{"./screenplay-line":59,"scenarioscript":3}],61:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screenplay = require('./screenplay');
require('./message-balloon');
require('../screenplay/punch-emoji');

var _require = require('traits-decorator');

var traits = _require.traits;

var _require2 = require('dom-gen');

var div = _require2.div;

var DEFAULT_SPEECH_TIMEOUT = 5000;

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait.
 */

var Speaker = function () {
  function Speaker() {
    _classCallCheck(this, Speaker);
  }

  _createClass(Speaker, [{
    key: 'setSpeaker',

    /**
     * Sets the speaker data.
     * @param {jQuery} elem
     */
    value: function setSpeaker(elem) {
      elem.data('speaker', this);
    }

    /**
     * Speaks the phrase.
     * @param {string} message The contents of the speech
     * @param {object} opts The options
     * @fires 'speech.started' when the speech started
     * @fires 'speech.ended' when the speech ended
     */

  }, {
    key: 'speak',
    value: function speak(message, opts) {
      var _this = this;

      this.elem.trigger('speech.started');

      var timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT;

      message = Screenplay.replaceVars(message, opts.vars);

      return div({ data: {
          message: message,
          timeout: timeout,
          target: this.elem,
          'skip-target': this.elem
        } }).cc('message-balloon').trigger('message-balloon.start').once('message-balloon.ended').then(function () {
        return _this.elem.trigger('speech.ended');
      });
    }
  }]);

  return Speaker;
}();

Speaker.speaker = traits(Speaker);

module.exports = Speaker;

},{"../screenplay/punch-emoji":58,"./message-balloon":57,"./screenplay":60,"dom-gen":1,"traits-decorator":29}],62:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = require('./sprite');
var Ma = require('./ma');

var _require = require('spn');

var Image = _require.Image;
var DirStateImageMap = _require.DirStateImageMap;
var DIRS = _require.DIRS;

var _require2 = require('traits-decorator');

var traits = _require2.traits;

var CHR_TABLE = {
  ma: Ma
};

/**
 * CharSprite class handles 4-directional character sprite.
 *
 * Trant.
 */
var CharSprite = (_dec = traits(Sprite), _dec(_class = function () {
  function CharSprite() {
    _classCallCheck(this, CharSprite);
  }

  _createClass(CharSprite, [{
    key: 'defaultDir',

    /**
     * Returns the default direction.
     */
    value: function defaultDir() {
      return DIRS.DOWN;
    }

    /**
     * Returns the default state.
     */

  }, {
    key: 'defaultState',
    value: function defaultState() {
      return 'default';
    }

    /**
     * Initializes the sprite.
     * @param {jQuery} elem The jquery dom element
     */

  }, {
    key: 'initSprite',
    value: function initSprite(elem) {
      this.character = elem.data('character');

      CHR_TABLE[this.character.id].call(this);

      this.dirStateImage = new DirStateImageMap();

      this.dirStateImage.addImageByDirState(new Image(this.upImage()), DIRS.UP, 'default');
      this.dirStateImage.addImageByDirState(new Image(this.downImage()), DIRS.DOWN, 'default');
      this.dirStateImage.addImageByDirState(new Image(this.leftImage()), DIRS.LEFT, 'default');
      this.dirStateImage.addImageByDirState(new Image(this.rightImage()), DIRS.RIGHT, 'default');
    }

    /**
     * Changes the direction the character currently heading for.
     * @param {DIRS} dir The direction (one of up, down, left or right)
     */

  }, {
    key: 'turn',
    value: function turn(dir) {
      this.setDir(dir);
    }

    /**
     * Sets at the point.
     * @param {Point} point The point to go to
     */

  }, {
    key: 'setTo',
    value: function setTo(point) {
      this.setDir(point.minus(this.getPoint()).getDir());

      this.setAt(point);
    }
  }]);

  return CharSprite;
}()) || _class);

module.exports = CharSprite;

},{"./ma":64,"./sprite":66,"spn":21,"traits-decorator":29}],63:[function(require,module,exports){
'use strict';

var _require = require('traits-decorator');

var traits = _require.traits;

module.exports = traits(require('./sprite'));
module.exports.static = traits(require('./static-sprite'));
module.exports.stayRun = traits(require('./stay-run-sprite'));
module.exports.character = traits(require('./char-sprite'));
module.exports.relativeBody = traits(require('./relative-body'));

},{"./char-sprite":62,"./relative-body":65,"./sprite":66,"./static-sprite":67,"./stay-run-sprite":68,"traits-decorator":29}],64:[function(require,module,exports){
'use strict';

var _require = require('spn');

var Animation = _require.Animation;

/**
 * The sprite modifier of Ma (the protagonist).
 */

module.exports = function () {
  this.id = 'ma';
  this.name = 'ma';

  this.x = 0;
  this.y = 0;

  this.posture.width = 40;
  this.posture.height = 60;

  this.upImage = function () {
    return 'img/ma-B.svg';
  };
  this.downImage = function () {
    return 'img/ma-F.svg';
  };
  this.leftImage = function () {
    return 'img/ma-L.svg';
  };
  this.rightImage = function () {
    return 'img/ma-R.svg';
  };

  this.showAnim = function () {
    return new Animation('char-appear', 1000);
  };
  this.hideAnim = function () {
    return new Animation('char-disappear', 1000);
  };
};

},{"spn":21}],65:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * RelativeBody is a trait class which works in relative scale with its parent rect.
 */

var RelativeBody = function () {
  function RelativeBody() {
    _classCallCheck(this, RelativeBody);
  }

  _createClass(RelativeBody, [{
    key: "onSetParentRect",

    /**
     * Handler when the parent rect is set.
     * This method should be called with its parent rect before initial rendering.
     * @param {Rect} rect The parent rect
     */
    value: function onSetParentRect(rect) {
      this.x = rect.left + rect.width() * this.relX;
      this.y = rect.top + rect.height() * this.relY;

      var size = Math.min(rect.width(), rect.height());
      this.posture.width = size * this.relW;
      this.posture.height = size * this.relH;
    }
  }]);

  return RelativeBody;
}();

module.exports = RelativeBody;

},{}],66:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sprite class changes its image according to its direction and state.
 *
 * This is a trait class. Use with traits syntax like `traits-decorator`.
 */

var Sprite = function () {
  function Sprite() {
    _classCallCheck(this, Sprite);
  }

  _createClass(Sprite, [{
    key: "setDirState",

    /**
     * Changes the direction and state.
     * @param {String} dir The direction
     * @param {String} state The state
     */
    value: function setDirState(dir, state) {
      this.dir = dir == null ? this.dir : dir;
      this.state = state == null ? this.state : state;

      this.updateElemByDirState(this.dir, this.state);
    }

    /**
     * Updates the element by the dir and state.
     */

  }, {
    key: "updateElemByDirState",
    value: function updateElemByDirState(dir, state) {
      this.dirStateImage.get(dir == null ? this.defaultDir() : dir, state == null ? this.defaultState() : state).apply(this.elem);
    }

    /**
     * Updates sprite related things.
     */

  }, {
    key: "updateSprite",
    value: function updateSprite() {
      this.updateElemByDirState();
    }

    /**
     * Keeps the direction and sets the given state.
     *
     * @param {string} state The state
     */

  }, {
    key: "setState",
    value: function setState(state) {
      this.setDirState(null, state);
    }

    /**
     * Sets the direction.
     * @param {string} dir The direction
     */

  }, {
    key: "setDir",
    value: function setDir(dir) {
      this.setDirState(dir, null);
    }
  }]);

  return Sprite;
}();

module.exports = Sprite;

},{}],67:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('traits-decorator');

var traits = _require.traits;

var _require2 = require('spn');

var DirStateImageMap = _require2.DirStateImageMap;
var Image = _require2.Image;

var Sprite = require('./sprite');

/**
 * The sprite class which has only one image.
 *
 * Trait.
 */
var StaticSprite = (_dec = traits(Sprite), _dec(_class = function () {
  function StaticSprite() {
    _classCallCheck(this, StaticSprite);
  }

  _createClass(StaticSprite, [{
    key: 'defaultDir',

    /**
     * Returns the default direction.
     */
    value: function defaultDir() {
      return 'down';
    }

    /**
     * Returns the default state.
     */

  }, {
    key: 'defaultState',
    value: function defaultState() {
      return 'default';
    }

    /**
     * Initialize the dir state image map.
     */

  }, {
    key: 'initDirStateImage',
    value: function initDirStateImage() {
      this.dirStateImage = new DirStateImageMap();
      this.dirStateImage.addImageByDirState(new Image(this.image()), 'down', 'default');
    }

    /**
     * Initializes sprite things.
     */

  }, {
    key: 'initSprite',
    value: function initSprite() {
      this.initDirStateImage();
    }
  }]);

  return StaticSprite;
}()) || _class);

module.exports = StaticSprite;

},{"./sprite":66,"spn":21,"traits-decorator":29}],68:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = require('./sprite');

var _require = require('traits-decorator');

var traits = _require.traits;

var _require2 = require('spn');

var wait = _require2.wait;
var Image = _require2.Image;
var DirStateImageMap = _require2.DirStateImageMap;

/**
 * The sprite class for stay-run creatures.
 *
 * Trait.
 */

var StayRunSprite = (_dec = traits(Sprite), _dec(_class = function () {
  function StayRunSprite() {
    _classCallCheck(this, StayRunSprite);
  }

  _createClass(StayRunSprite, [{
    key: 'defaultDir',

    /**
     * Returns the default direction.
     */
    value: function defaultDir() {
      return 'left';
    }
  }, {
    key: 'defaultState',
    value: function defaultState() {
      return 'stay';
    }
  }, {
    key: 'initSprite',
    value: function initSprite() {
      this.dirStateImage = new DirStateImageMap();

      this.dirStateImage.addImageByDirState(new Image(this.leftStayImage()), 'left', 'stay');
      this.dirStateImage.addImageByDirState(new Image(this.leftRunImage()), 'left', 'run');
      this.dirStateImage.addImageByDirState(new Image(this.leftStayImage(), true), 'right', 'stay');
      this.dirStateImage.addImageByDirState(new Image(this.leftRunImage(), true), 'right', 'run');
    }

    /**
     * Runs away to the given direction
     * @param {string} dir The direction to run away
     * @return {Promise}
     */

  }, {
    key: 'runAway',
    value: function runAway(dir) {
      var _this = this;

      this.setDirState(dir, 'run');

      var isRight = dir === 'right';

      this.elem.css('transition-property', 'left, opacity');

      this.setTransitionDuration(this.awayDur());

      var awayDistance = 170;

      this.moveToX(this.x - awayDistance + isRight * awayDistance * 2);

      return wait(this.awayDur()).then(function () {
        return _this.awayAnim().apply(_this.elem);
      }).then(function () {
        return _this.elem.remove();
      });
    }
  }, {
    key: 'runAwayRight',
    value: function runAwayRight() {
      return this.runAway('right');
    }
  }, {
    key: 'runAwayLeft',
    value: function runAwayLeft() {
      return this.runAway('left');
    }
  }]);

  return StayRunSprite;
}()) || _class);

module.exports = StayRunSprite;

},{"./sprite":66,"spn":21,"traits-decorator":29}],69:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FieldIndexGenerator class creates the list of indices of the field.
 *
 * The list is like a snake on the wall, inspired by the charactor arrangment of the mayan scripture.
 */

var FieldIndexGenerator = function () {

  /**
   * @constructor
   * @param {Number} [max] The max number of colums on each row
   */

  function FieldIndexGenerator(max) {
    _classCallCheck(this, FieldIndexGenerator);

    this.max = max || 3;
  }

  /**
   * Generates indices.
   *
   * @param {Number} need The necessary number
   * @param {Array} used The used (unavailable) indices
   * @return {Array}
   */

  _createClass(FieldIndexGenerator, [{
    key: "generate",
    value: function generate(need, used) {
      var results = [];
      var ip = new IndexPointer(this.max);

      used = used || [];
      used = used.map(function (x) {
        return x.toString();
      });

      while (results.length < need) {
        if (used.indexOf(ip.get().toString()) === -1) {
          results.push(ip.get());
        }

        ip.next();
      }

      return results;
    }
  }]);

  return FieldIndexGenerator;
}();

/**
 * IndexPointer represents the current position of generating sequence of indices.
 */

var IndexPointer = function () {

  /**
   * @constructor
   * @param {Number} max The max of number of columns
   */

  function IndexPointer(max) {
    _classCallCheck(this, IndexPointer);

    this.x = 0;
    this.y = 0;
    this.max = max;
    this.maxIndex = max - 1;
  }

  /**
   * Gets the current index as an array.
   *
   * @return {Array}
   */

  _createClass(IndexPointer, [{
    key: "get",
    value: function get() {
      return [this.x, this.y];
    }

    /**
     * The pointer goes to the next position.
     */

  }, {
    key: "next",
    value: function next() {
      if (this.x % 2 === 0) {
        if (this.y >= this.maxIndex) {
          this.x += 1;
        } else {
          this.y += 1;
        }
      } else {
        if (this.y <= 0) {
          this.x += 1;
        } else {
          this.y -= 1;
        }
      }

      return this.get();
    }
  }]);

  return IndexPointer;
}();

module.exports = FieldIndexGenerator;

},{}],70:[function(require,module,exports){
'use strict';

var CELLS = ['m', 'f', 'a', 'w', 'b'];
exports.CELLS = CELLS;

var emojis = CELLS;
exports.emojis = emojis;

/**
 * Renders the emoji simbols in the text to emoji tag.
 * @param {string} text The raw text
 * @param {string} cls The additional css class
 * @return {string}
 */
exports.renderEmoji = function (text, cls) {
  return text.replace(/:([_a-z]+):/g, function (_, emoji) {
    return emojiToTag(emoji, cls);
  });
};

/**
 * Parses the text and returns a list of cells in it.
 * @param {string} text The source text
 * @return {string[]}
 */
exports.extractCells = function (text) {
  var cells = [];

  text.replace(/:([_a-z]+):/g, function (_, cell) {
    return cells.push(cell);
  });

  return cells.filter(function (cell) {
    return CELLS.indexOf(cell) !== -1;
  });
};

/**
 * Returns the html expression of the emoji.
 * @param {string} emoji The id of emoji symbol
 * @return {string}
 */
function emojiToTag(emoji, cls) {
  if (emojis.indexOf(emoji) === -1) {
    return ':' + emoji + ':';
  }

  return '<i class="emoji emoji-' + emoji + ' ' + (cls || '') + '"></i>';
}

},{}],71:[function(require,module,exports){
'use strict';

var _require = require('dom-gen');

var img = _require.img;

/**
 * Load image and returns promise which resolves when the image loaded.
 */

exports.loadImage = function (path, cls, dom) {
  return new Promise(function (resolve) {
    var $img = img().attr('src', path).addClass(cls).appendTo(dom).on('load', function () {
      return resolve($img);
    });
  });
};

/**
 * Add a comma to separate each group of three digits in a text.
 *
 * @param {Number} number The number
 * @return {String}
 */
exports.commaNumber = function (number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

/**
 * Chains elements of the array as promise chain using the promise generating function.
 *
 * @param {Array} array The array
 * @param {Function} createPromise The function for creating promise
 */
exports.chainPromise = function (array, createPromise) {
  return array.reduce(function (promise, item) {
    return promise.then(function () {
      return createPromise(item);
    });
  }, Promise.resolve());
};

},{"dom-gen":1}]},{},[30]);
