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
},{"./if-num-else":17,"./reflow":25,"./wait":26}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./area":3,"./being":4,"./if-num-else":17,"./point":22,"./posture":23,"./reflow":25,"./wait":26}],6:[function(require,module,exports){
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
},{"../animation":2}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
'use strict';

exports.animation = require('./animation');
exports.ratio = require('./ratio');
exports.transition = require('./transition');
exports.width = require('./width');
exports.height = require('./height');
exports.margin = require('./margin');
},{"./animation":6,"./height":7,"./margin":9,"./ratio":10,"./transition":11,"./width":12}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
"use strict";

exports.UP = 0;
exports.TOP = 0;
exports.LEFT = 1;
exports.RIGHT = 2;
exports.BOTTOM = 3;
exports.DOWN = 3;
},{}],15:[function(require,module,exports){
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
},{"./body":5}],16:[function(require,module,exports){
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
},{"./if-num-else":17,"./rect":24}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"./animation":2,"./area":3,"./being":4,"./body":5,"./decorators":8,"./dir-state-image-map":13,"./dirs":14,"./grid":16,"./grid-walker":15,"./if-num-else":17,"./image":18,"./layout-factory":21,"./point":22,"./posture":23,"./rect":24,"./reflow":25,"./wait":26}],20:[function(require,module,exports){
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
},{"./rect":24}],21:[function(require,module,exports){
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
},{"./grid":16,"./rect":24}],22:[function(require,module,exports){
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
},{"./dirs":14}],23:[function(require,module,exports){
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
},{"./if-num-else":17,"./rect":24}],24:[function(require,module,exports){
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
},{"./area":3,"./grid":16,"./if-num-else":17,"./interval":20}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
'use strict';

require('../../src/floor/floor-scene');

},{"../../src/floor/floor-scene":62}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = require('./character');
var CharacterPositionFactory = require('./character-position-factory');
var LevelKeyFactory = require('./level-key-factory');
var LevelHistoryFactory = require('./level-history-factory');
var LevelLockFactory = require('./level-lock-factory');

/**
 * The factory of Character.
 */

var CharacterFactory = function () {
  function CharacterFactory() {
    _classCallCheck(this, CharacterFactory);
  }

  _createClass(CharacterFactory, [{
    key: 'createFromObject',

    /**
     * Creates a character from the object
     * @param {object} obj The object
     * @return {Character}
     */
    value: function createFromObject(obj) {
      return new Character(obj.id, obj.name, new CharacterPositionFactory().createFromObject(obj.position), new LevelKeyFactory().createFromArray(obj.keys), new LevelHistoryFactory().createCollectionFromArray([]), null, new LevelLockFactory().createCollectionFromObjectList([]));
    }
  }]);

  return CharacterFactory;
}();

module.exports = CharacterFactory;

},{"./character":34,"./character-position-factory":31,"./level-history-factory":36,"./level-key-factory":40,"./level-lock-factory":43}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var THE_FIRST_LEVEL = '701';

/**
 * Responsibility: The initialization of the character.
 *
 * This service is used when the character data doesn't exist yet.
 */

var CharacterInitService = function () {
  function CharacterInitService() {
    _classCallCheck(this, CharacterInitService);
  }

  _createClass(CharacterInitService, [{
    key: 'initById',

    /**
     * @param {string} id The id of the character (one of ma, ellen and emma)
     * @return {Character}
     */
    value: function initById(id) {
      var character = undefined;
      var CharacterFactory = require('./character-factory');
      var factory = new CharacterFactory();

      if (id === 'ma') {
        character = factory.createFromObject({ id: id, name: 'Ma' });
      } else if (id === 'ellen') {
        character = factory.createFromObject({ id: id, name: 'Ellen' });
      } else if (id === 'emma') {
        character = factory.createFromObject({ id: id, name: 'Emma' });
      } else {
        throw new Error('unknown character: ' + id);
      }

      // The first level is always unlocked.
      character.unlockById(THE_FIRST_LEVEL);

      return character;
    }

    /**
     * Gets the character data if exist, otherwise create it by the id.
     * @param {string} id The id
     * @return {Promise<Character>}
     */

  }, {
    key: 'getOrCreateById',
    value: function getOrCreateById(id) {
      var _this = this;

      var CharacterRepository = require('./character-repository');
      var repository = new CharacterRepository();

      return repository.getById(id).then(function (character) {
        if (character) {
          return character;
        }

        return _this.initById(id).saveAll();
      });
    }
  }]);

  return CharacterInitService;
}();

module.exports = CharacterInitService;

},{"./character-factory":29,"./character-repository":33}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterPosition = require('./character-position');

var START_FLOOR_ID = '7';
var START_FLOOR_OBJECT_ID = '701';

/**
 * CharacterPositionFactory is the factory class of CharacterPositions.
 */

var CharacterPositionFactory = function () {
  function CharacterPositionFactory() {
    _classCallCheck(this, CharacterPositionFactory);
  }

  _createClass(CharacterPositionFactory, [{
    key: 'createStartPosition',

    /**
     * Creates the start position.
     *
     * @return {CharacterPosition}
     */
    value: function createStartPosition() {
      return new CharacterPosition(START_FLOOR_ID, START_FLOOR_OBJECT_ID);
    }

    /**
     * Creates char position object from the object.
     * @param {Object} obj The object
     * @return {CharacterPosition}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      if (obj == null) {
        return this.createStartPosition();
      }

      return new CharacterPosition(obj.floorId, obj.floorObjectId);
    }
  }]);

  return CharacterPositionFactory;
}();

module.exports = CharacterPositionFactory;

},{"./character-position":32}],32:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The position of the character.
 */

var CharacterPosition =
/**
 * @constructor
 * @param {string} floorId The id of the floor
 * @param {string} floorObjectId The id of the floor object
 */
function CharacterPosition(floorId, floorObjectId) {
  _classCallCheck(this, CharacterPosition);

  /**
   * @property {String} floorId The id of the floor
   */
  this.floorId = floorId;

  /**
   * @property {String} floorObjectId The id of the floor object
   */
  this.floorObjectId = floorObjectId;
};

module.exports = CharacterPosition;

},{}],33:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterFactory = require('./character-factory');
var CharacterInitService = require('./character-init-service');

var STORAGE_KEY = 'character-';

/**
 * The repository of Character.
 *
 */

var CharacterRepository = function () {
  function CharacterRepository() {
    _classCallCheck(this, CharacterRepository);
  }

  _createClass(CharacterRepository, [{
    key: 'save',

    /**
     * Saves the character.
     *
     * @param {Character} character The Character
     * @return {Promise}
     */
    value: function save(character) {
      var obj = this.toObject(character);

      return infrastructure.storage.set(STORAGE_KEY + character.id, obj).then(function () {
        return character;
      });
    }

    /**
     * Gets a character by the id.
     *
     * @param {String} id The id
     * @return {Promise<Character>} A promise of a character
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      return infrastructure.storage.get(STORAGE_KEY + id, null).then(function (obj) {
        if (obj == null) {
          return null;
        }

        var factory = new CharacterFactory();
        var character = factory.createFromObject(obj);

        return character.reloadAll().then(function () {
          return character;
        });
      });
    }

    /**
     * @private
     * Converts the Character object into js object.
     *
     * @param {Character} character The Character
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(character) {
      return {
        id: character.id,
        name: character.name,
        keys: this.keysToArray(character.keys),
        position: this.positionToObject(character.position)
      };
    }

    /**
     * Converts the level keys to objects.
     * @param {LevelKey[]}
     * @return {object[]}
     */

  }, {
    key: 'keysToArray',
    value: function keysToArray(keys) {
      var _this = this;

      if (keys == null) {
        return [];
      }

      return keys.keys.map(function (key) {
        return _this.keyToObject(key);
      });
    }

    /**
     * Converts the level key to an object.
     * @param {LevelKey} key The level key
     * @return {object}
     */

  }, {
    key: 'keyToObject',
    value: function keyToObject(key) {
      if (key == null) {
        return null;
      }

      return {
        levelId: key.levelId
      };
    }

    /**
     * Converts the CharacterPosition object into js object.
     * @private
     * @param {CharacterPosition} position The position
     * @return {Object}
     */

  }, {
    key: 'positionToObject',
    value: function positionToObject(position) {
      if (position == null) {
        return null;
      }

      return {
        floorId: position.floorId,
        floorObjectId: position.floorObjectId
      };
    }
  }]);

  return CharacterRepository;
}();

module.exports = CharacterRepository;

},{"./character-factory":29,"./character-init-service":30}],34:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayingStateRepository = require('./playing-state-repository');
var LevelHistoryRepository = require('./level-history-repository');
var LevelLockRepository = require('./level-lock-repository');
var LevelKey = require('./level-key');

/**
 * Character is the domain model and the aggregate root of character aggregate.
 * It has CharacterPosition and LevelHistoryCollection as its components.
 *
 * [Entity]
 * [AggregateRoot]
 */

var Character = function () {
  /**
   * @constructor
   * @param {string} id The id of the character
   * @param {string} name The name of the character
   * @param {CharacterPosition} position The position of the character
   * @param {LevelKeyCollection} keys The keys of the levels
   * @param {LevelHistoryCollection} histories The histories of the current floor
   * @param {PlayingState} playingState The state of playing at the current level
   * @param {LevelLockCollection} locks The collection of the level locks
   */

  function Character(id, name, position, keys, histories, playingState, locks) {
    _classCallCheck(this, Character);

    /**
     * @property {String} id The id of the character
     */
    this.id = id;

    /**
     * @property {String} name The name of the character
     */
    this.name = name;

    /**
     * @property {CharacterPosition} position The position of the character
     */
    this.position = position;

    /**
     * @property {LevelKeyCollection} keys The asset keys
     */
    this.keys = keys;

    /**
     * @property {LevelHistoryCollection} histories The histories of the current floor
     */
    this.histories = histories;

    /**
     * @property {PlayingState} playingState The state of playing at the current level
     */
    this.playingState = playingState;

    /**
     * @property {LevelLockCollection} collection The collection of the locks
     */
    this.locks = locks;
  }

  /**
   * Sets the position of character.
   *
   * @param {CharacterPosition} position The position of the character
   */

  _createClass(Character, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this.position = position;
    }

    /**
     * Saves itself. This does not saves the histories, locks and keys because they belong to the different storages.
     * @return {Promise}
     */

  }, {
    key: 'save',
    value: function save() {
      var CharacterRepository = require('./character-repository');
      var repository = new CharacterRepository();

      return repository.save(this);
    }

    /**
     * Saves itself and child models.
     * @return {Promise}
     */

  }, {
    key: 'saveAll',
    value: function saveAll() {
      return Promise.all([this.save(), this.saveHistories(), this.savePlayingState(), this.saveLocks()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1);

        var character = _ref2[0];
        return character;
      });
    }

    /**
     * Reloads all the submodels it has. (for now histories, locks and playing-state)
     * @return {Promise}
     */

  }, {
    key: 'reloadAll',
    value: function reloadAll() {
      return Promise.all([this.reloadHistories(), this.reloadLocks(), this.reloadPlayingState()]);
    }

    /**
     * Reloads the levelHistories according to the current position.
     *
     * @return {Promise} resolves with updated character
     */

  }, {
    key: 'reloadHistories',
    value: function reloadHistories() {
      var _this = this;

      if (this.position == null) {
        return Promise.resolve(this);
      }

      return new LevelHistoryRepository(this.id).getByFloorId(this.position.floorId).then(function (histories) {
        _this.histories = histories;

        return _this;
      });
    }

    /**
     * Saves the LevelHistories.
     *
     * @return {Promise}
     */

  }, {
    key: 'saveHistories',
    value: function saveHistories() {
      var _this2 = this;

      return new LevelHistoryRepository(this.id).saveForFloorId(this.position.floorId, this.histories).then(function () {
        return _this2;
      });
    }

    /**
     * Reloads the level locks.
     */

  }, {
    key: 'reloadLocks',
    value: function reloadLocks() {
      var _this3 = this;

      if (this.position == null) {
        return Promise.resolve(this);
      }

      return new LevelLockRepository(this.id).getByFloorId(this.position.floorId).then(function (locks) {
        _this3.locks = locks;

        return _this3;
      });
    }

    /**
     * Saves the current level locks.
     */

  }, {
    key: 'saveLocks',
    value: function saveLocks() {
      var _this4 = this;

      console.log('save locks');
      return new LevelLockRepository(this.id).saveByFloorId(this.position.floorId, this.locks).then(function () {
        return _this4;
      });
    }

    /**
     * Reloads the playingState
     *
     * @return {Promise}
     */

  }, {
    key: 'reloadPlayingState',
    value: function reloadPlayingState() {
      var _this5 = this;

      return new PlayingStateRepository().getByCharIdLevelId(this.id, this.position.floorObjectId).then(function (playingState) {
        _this5.playingState = playingState;

        return _this5;
      });
    }

    /**
     * Saves the playing state.
     *
     * @return {Promise}
     */

  }, {
    key: 'savePlayingState',
    value: function savePlayingState() {
      var _this6 = this;

      return new PlayingStateRepository().save(this.playingState).then(function () {
        return _this6;
      });
    }

    /**
     * Clears the playing state.
     *
     * @return {Promise}
     */

  }, {
    key: 'clearPlayingState',
    value: function clearPlayingState() {
      return new PlayingStateRepository().clearByCharId(this.id);
    }

    /**
     * Gets the floow object id.
     * @return {string}
     */

  }, {
    key: 'getFloorObjectId',
    value: function getFloorObjectId() {
      return this.position.floorObjectId;
    }

    /**
     * Adds the level key of the given id.
     * @param {string} levelId The level id
     */

  }, {
    key: 'addKeyOf',
    value: function addKeyOf(levelId) {
      this.keys.add(new LevelKey(levelId));
    }

    /**
     * Removes the key of the given id.
     * @param {string} levelId The level id
     */

  }, {
    key: 'removeKeyOf',
    value: function removeKeyOf(levelId) {
      this.keys.deleteByLevelId(levelId);
    }

    /**
     * @return {boolean}
     */

  }, {
    key: 'hasAnyKey',
    value: function hasAnyKey() {
      return this.keys.hasAny();
    }

    /**
     * Unlocks the asset of the id.
     * @param {string} id The asset id
     */

  }, {
    key: 'unlockById',
    value: function unlockById(id) {
      this.locks.unlock(id);
    }
  }]);

  return Character;
}();

module.exports = Character;

},{"./character-repository":33,"./level-history-repository":37,"./level-key":41,"./level-lock-repository":44,"./playing-state-repository":46}],35:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of LevelHistory.
 */

var LevelHistoryCollection = function () {
  /**
   * @param {Array} list The array of the LevelHistories
   */

  function LevelHistoryCollection(list) {
    var _this = this;

    _classCallCheck(this, LevelHistoryCollection);

    this.list = list || [];

    this.dict = {};

    this.list.forEach(function (history, i) {
      _this.dict[history.levelId] = history;
    });
  }

  /**
   * Gets a LevelHistory by the id.
   * @param {string} levelId The level id
   * @return {LevelHistory}
   */

  _createClass(LevelHistoryCollection, [{
    key: "getById",
    value: function getById(levelId) {
      return this.dict[levelId];
    }

    /**
     * Returns the length of the collection.
     */

  }, {
    key: "length",
    value: function length() {
      return this.list.length;
    }
  }]);

  return LevelHistoryCollection;
}();

module.exports = LevelHistoryCollection;

},{}],36:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelHistoryCollection = require('./level-history-collection');
var LevelHistory = require('./level-history');

/**
 * The factory class for LevelHistory.
 */

var LevelHistoryFactory = function () {
  function LevelHistoryFactory() {
    _classCallCheck(this, LevelHistoryFactory);
  }

  _createClass(LevelHistoryFactory, [{
    key: 'createCollectionFromArray',

    /**
     * Creates a LevelHistoryCollection from the array.
     * @param {Array} array The array of the LevelHistories
     * @return {LevelHistoryCollection}
     */
    value: function createCollectionFromArray(array) {
      var _this = this;

      if (!(array instanceof Array)) {
        array = [];
      }

      return new LevelHistoryCollection(array.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }

    /**
     * Creates a LevelHistory from the object.
     * @param {Object} obj The object
     * @return {LevelHistory}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      return new LevelHistory(obj.levelId, obj.score, obj.cleared, obj.clearedAt);
    }
  }]);

  return LevelHistoryFactory;
}();

module.exports = LevelHistoryFactory;

},{"./level-history":38,"./level-history-collection":35}],37:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelHistoryFactory = require('./level-history-factory');

/**
 * LevelHistoryRepository is the repository class of LevelHistory.
 *
 * This repository saves and restores the LevelHistorys using infrastructure.storage persistence interface.
 *
 * The key of the storage is as follows:
 *
 * level-history-[charId]-[floorId]
 *
 * e.g. level-history-ma-7
 */

var LevelHistoryRepository = function () {
  /**
   * @param {string} charId The character id
   */

  function LevelHistoryRepository(charId) {
    _classCallCheck(this, LevelHistoryRepository);

    this.charId = charId;
    this.factory = new LevelHistoryFactory();
  }

  /**
   * Gets the level histories (LevelHistoryCollection) by the floor id.
   * @param {string} floorId The floor id
   * @return {Promise}
   */

  _createClass(LevelHistoryRepository, [{
    key: 'getByFloorId',
    value: function getByFloorId(floorId) {
      var _this = this;

      return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (array) {
        return _this.factory.createCollectionFromArray(array);
      });
    }

    /**
     * Saves the level histories for the floor id.
     * @param {string} floorId The floor id
     * @param {LevelHistoryCollection} histories The history collection
     * @return {Promise}
     */

  }, {
    key: 'saveForFloorId',
    value: function saveForFloorId(floorId, histories) {
      return infrastructure.storage.set(this.createStorageKey(floorId), this.collectionToArray(histories));
    }

    /**
     * Converts the collection to an array.
     * @param {LevelHistoryCollection}
     * @return {object[]}
     */

  }, {
    key: 'collectionToArray',
    value: function collectionToArray(collection) {
      var _this2 = this;

      return collection.list.map(function (history) {
        return _this2.toObject(history);
      });
    }

    /**
     * Converts the history to an object.
     * @param {LevelHistory} levelHistory
     * @return {object}
     */

  }, {
    key: 'toObject',
    value: function toObject(history) {
      return {
        levelId: history.levelId,
        score: history.score,
        cleared: history.cleared,
        clearedAt: history.clearedAt
      };
    }

    /**
     * Creates storage key name for the floor.
     * @private
     * @param {string} floorId The floor id
     * @return {Promise}
     */

  }, {
    key: 'createStorageKey',
    value: function createStorageKey(floorId) {
      return 'level-history-' + this.charId + '-' + floorId;
    }
  }]);

  return LevelHistoryRepository;
}();

module.exports = LevelHistoryRepository;

},{"./level-history-factory":36}],38:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LevelHistory is model class which represents the history of the level clearance.
 */

var LevelHistory =
/**
 * @constructor
 * @param {string} levelId The id of the level
 * @param {number} score The score
 * @param {boolean} cleared If cleared or not
 * @param {Date} clearedAt The datetime of the clear
 */
function LevelHistory(levelId, score, cleared, clearedAt) {
  _classCallCheck(this, LevelHistory);

  /**
   * @property {String} levelId The id of the level
   */
  this.levelId = levelId;

  /**
   * @property {Number} score The score
   */
  this.score = score;

  /**
   * @property {Boolean} cleared If cleared or not
   */
  this.cleared = cleared;

  /**
   * @property {Date} clearedAt The datetime of the clear
   */
  this.clearedAt = clearedAt;
};

module.exports = LevelHistory;

},{}],39:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of the level key.
 */

var LevelKeyCollection = function () {
  /**
   * @param {LevelKey[]} keys The keys
   */

  function LevelKeyCollection() {
    var _this = this;

    var keys = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    _classCallCheck(this, LevelKeyCollection);

    this.keys = [];
    this.dict = [];

    keys.forEach(function (key) {
      return _this.add(key);
    });
  }

  /**
   * Adds the key. If the key of the same levelId already exists, does nothing.
   * @param {LevelKey} key The key
   */

  _createClass(LevelKeyCollection, [{
    key: "add",
    value: function add(key) {
      if (this.has(key)) {
        return;
      }

      this.keys.push(key);
      this.dict[key.levelId] = key;
    }

    /**
     * Returns true iff it has the key.
     * @param {LevelKey} key The key
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(key) {
      return this.dict[key.levelId] != null;
    }

    /**
     * @return {boolean}
     */

  }, {
    key: "hasAny",
    value: function hasAny() {
      return this.keys.length > 0;
    }

    /**
     * Reduces the level keys by the given 2-arity function starting with the given value.
     * @param {Function} func The reducer
     * @param {any} [init] The initial value
     */

  }, {
    key: "reduce",
    value: function reduce(func, init) {
      return this.keys.slice(0).reduce(func, init);
    }

    /**
     * Deletes the key by the given level id.
     * @param {string} levelId The level id
     */

  }, {
    key: "deleteByLevelId",
    value: function deleteByLevelId(levelId) {
      if (!this.dict[levelId]) {
        return;
      }

      this.keys = this.keys.filter(function (key) {
        return key.levelId !== levelId;
      });
      delete this.dict[levelId];
    }
  }]);

  return LevelKeyCollection;
}();

module.exports = LevelKeyCollection;

},{}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelKey = require('./level-key');
var LevelKeyCollection = require('./level-key-collection');

/**
 * The factory class of LevelKey.
 */

var LevelKeyFactory = function () {
  function LevelKeyFactory() {
    _classCallCheck(this, LevelKeyFactory);
  }

  _createClass(LevelKeyFactory, [{
    key: 'createFromArray',

    /**
     * @param {object[]} array The array
     * @return {LevelKey[]}
     */
    value: function createFromArray(array) {
      var _this = this;

      if (array == null) {
        return new LevelKeyCollection();
      }

      return new LevelKeyCollection(array.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }

    /**
     * @param {object} obj The object
     * @return {LevelKey}
     */

  }, {
    key: 'createFromObject',
    value: function createFromObject(obj) {
      if (obj == null) {
        return null;
      }

      return new LevelKey(obj.levelId);
    }
  }]);

  return LevelKeyFactory;
}();

module.exports = LevelKeyFactory;

},{"./level-key":41,"./level-key-collection":39}],41:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LevelKey is domain model which unlocks the corresponding level.
 */

var LevelKey =
/**
 * @param {string} levelId The id of the level
 */
function LevelKey(levelId) {
  _classCallCheck(this, LevelKey);

  this.levelId = levelId;
};

module.exports = LevelKey;

},{}],42:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The collection class of LevelLocks.
 */

var LevelLockCollection = function () {
  /**
   * @param {Array} locks
   */

  function LevelLockCollection(locks) {
    _classCallCheck(this, LevelLockCollection);

    this.locks = locks || [];

    var LevelLockFactory = require('./level-lock-factory');
    this.factory = new LevelLockFactory();
  }

  /**
   * Finds the level of the given level id, or returns null when the level not found.
   * @private
   * @param {String} levelId The id of the level
   * @return {LevelLock}
   */

  _createClass(LevelLockCollection, [{
    key: 'find',
    value: function find(levelId) {
      var locks = this.locks.filter(function (lock) {
        return lock.levelId === levelId;
      });

      if (locks.length === 0) {
        return null;
      }

      return locks[0];
    }

    /**
     * Unlocks the level of the given id.
     * @param {String} levelId The id of the level
     */

  }, {
    key: 'unlock',
    value: function unlock(levelId) {
      var lock = this.find(levelId);

      if (lock != null) {
        lock.unlock();

        return;
      }

      // Create a new lock object if it doesn't exist
      lock = this.factory.createFromObject({
        levelId: levelId,
        locked: false
      });

      this.locks.push(lock);
    }

    /**
     * Checks if the lock of the given level id is locked.
     * @param {String} levelId The id of the level
     * @return {Boolean}
     */

  }, {
    key: 'isLocked',
    value: function isLocked(levelId) {
      var lock = this.find(levelId);

      if (!lock) {
        // If lock object doesn't exist, then it means the level is locked.
        return true;
      }

      return lock.isLocked();
    }
  }]);

  return LevelLockCollection;
}();

module.exports = LevelLockCollection;

},{"./level-lock-factory":43}],43:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelLock = require('./level-lock');
var LevelLockCollection = require('./level-lock-collection');

/**
 * The factory class of LevelLocks.
 */

var LevelLockFactory = function () {
  function LevelLockFactory() {
    _classCallCheck(this, LevelLockFactory);
  }

  _createClass(LevelLockFactory, [{
    key: 'createFromObject',

    /**
     * Creates a LevelLock from the object.
     *
     * @param {Object} obj The object
     * @return {LevelLock}
     */
    value: function createFromObject(obj) {
      if (obj == null) {
        return null;
      }

      return new LevelLock(obj.levelId, obj.locked);
    }

    /**
     * Creates a LevelLockCollection from the list of the object.
     * @param {Array} objList The list of objects
     * @return {Array}
     */

  }, {
    key: 'createCollectionFromObjectList',
    value: function createCollectionFromObjectList(objList) {
      var _this = this;

      objList = objList || [];

      return new LevelLockCollection(objList.map(function (obj) {
        return _this.createFromObject(obj);
      }));
    }
  }]);

  return LevelLockFactory;
}();

module.exports = LevelLockFactory;

},{"./level-lock":45,"./level-lock-collection":42}],44:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LevelLockFactory = require('./level-lock-factory');

/**
 * The repository class of the LevelLock.
 *
 * This repository saves and restores the LevelLocks in JSON format using the infrastructure.storage persistent interface.
 *
 * The storage key of the collection of the level locks is as follows:
 *
 * level-lock-[charId]-[floorId]
 *
 * e.g. if charId is 'ma' and floorId is '7', then the storage key is 'level-lock-ma-7'
 */

var LevelLockRepository = function () {
  /**
   * @param {string} charId The character id
   */

  function LevelLockRepository(charId) {
    _classCallCheck(this, LevelLockRepository);

    this.charId = charId;
  }

  /**
   * Gets the collection of the level locks by the floor id and char id.
   * @param {string} floorId The floor id
   * @param {string} charId The floor id
   * @return {Promise} which resolves with the collection of the locks of the given floor id
   */

  _createClass(LevelLockRepository, [{
    key: 'getByFloorId',
    value: function getByFloorId(floorId) {
      var factory = new LevelLockFactory();
      return infrastructure.storage.get(this.createStorageKey(floorId), []).then(function (objList) {
        return factory.createCollectionFromObjectList(objList);
      });
    }

    /**
     * Saves the collection of the locks by the floor id and char id.
     * @param {String} floorId The floor id
     * @param {LevelLockCollection} collection The level lock collection
     */

  }, {
    key: 'saveByFloorId',
    value: function saveByFloorId(floorId, collection) {
      return infrastructure.storage.set(this.createStorageKey(floorId), this.toObjectList(collection));
    }

    /**
     * Converts the collection of the locks to an object list.
     * @private
     * @param {LevelLockCollection} collection The level lock collection
     * @return {Array} the array of the objects
     */

  }, {
    key: 'toObjectList',
    value: function toObjectList(collection) {
      var _this = this;

      return collection.locks.map(function (lock) {
        return _this.toObject(lock);
      });
    }

    /**
     * Converts the lock to an object.
     * @private
     * @param {LevelLock} lock The lock
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(lock) {
      return {
        levelId: lock.levelId,
        locked: lock.locked
      };
    }

    /**
     * Creates the storage key of the given floor id and char id.
     *
     * @private
     * @param {String} floorId The floor id
     * @param {String} charId The char id
     * @return {String}
     */

  }, {
    key: 'createStorageKey',
    value: function createStorageKey(floorId) {
      return 'level-lock-' + this.charId + '-' + floorId;
    }
  }]);

  return LevelLockRepository;
}();

module.exports = LevelLockRepository;

},{"./level-lock-factory":43}],45:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The level lock model
 */

var LevelLock = function () {
  /**
   * @param {string} levelId The level id
   * @param {boolean} locked True iff the level is locked
   */

  function LevelLock(levelId, locked) {
    _classCallCheck(this, LevelLock);

    this.levelId = levelId;
    this.locked = locked;
  }

  /**
   * Returns if the level is locked.
   * @return {boolean}
   */

  _createClass(LevelLock, [{
    key: "isLocked",
    value: function isLocked() {
      return this.locked;
    }

    /**
     * Unlocks the level.
     */

  }, {
    key: "unlock",
    value: function unlock() {
      this.locked = false;
    }
  }]);

  return LevelLock;
}();

module.exports = LevelLock;

},{}],46:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayingState = require('./playing-state');

var PLAYING_DATA_KEY = 'playing-state-';

/**
 * PlayingStateRepository is the repository class for PlayingState model.
 */

var PlayingStateRepository = function () {
  function PlayingStateRepository() {
    _classCallCheck(this, PlayingStateRepository);
  }

  _createClass(PlayingStateRepository, [{
    key: 'getByCharIdLevelId',

    /**
     * Gets a playing state by the character id.
     *
     * @param {String} chadId The character id
     * @param {String} levelId The level id
     * @return {Promise}
     */
    value: function getByCharIdLevelId(charId, levelId) {
      return infrastructure.storage.get(PLAYING_DATA_KEY + charId, null).then(function (data) {
        if (data == null) {
          return new PlayingState(charId, levelId, [[]]);
        }

        if (data.levelId !== levelId) {
          return new PlayingState(charId, levelId, [[]]);
        }

        return new PlayingState(data.charId, data.levelId, data.rounds);
      });
    }

    /**
     * Saves the playingState
     * @return {Promise}
     */

  }, {
    key: 'save',
    value: function save(playingState) {
      if (playingState == null) {
        return Promise.resolve(null);
      }

      return infrastructure.storage.set(PLAYING_DATA_KEY + playingState.charId, this.toObject(playingState)).then(function () {
        return playingState;
      });
    }

    /**
     * Clears the data by the character id
     * @param {String} id The character id
     * @return {Promise}
     */

  }, {
    key: 'clearByCharId',
    value: function clearByCharId(id) {
      return infrastructure.storage.set(PLAYING_DATA_KEY + id, null);
    }

    /**
     * Converts to the object
     * @private
     * @param {PlayingState} playingState The playing state
     * @return {Object}
     */

  }, {
    key: 'toObject',
    value: function toObject(playingState) {
      return {
        charId: playingState.charId,
        levelId: playingState.levelId,
        rounds: playingState.rounds
      };
    }
  }]);

  return PlayingStateRepository;
}();

module.exports = PlayingStateRepository;

},{"./playing-state":47}],47:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PlayingState model represents the current playing state of the level.
 *
 * [Entity]
 */

var PlayingState = function () {
  /**
   * @constructor
   * @param {String} charId The character id
   * @param {String} levelId The level id
   * @param {Array} [rounds] The directions
   */

  function PlayingState(charId, levelId, rounds) {
    _classCallCheck(this, PlayingState);

    this.charId = charId;
    this.levelId = levelId;
    this.rounds = rounds || [[]];
  }

  /**
   * Moves to the next round.
   */

  _createClass(PlayingState, [{
    key: "bump",
    value: function bump() {
      this.rounds.unshift([]);
    }

    /**
     * Releases the round data and init the obj state.
     * @return {Array} The array of round data
     */

  }, {
    key: "release",
    value: function release() {
      var rounds = this.rounds.splice(0).reverse();

      this.bump();

      return rounds;
    }

    /**
     * Adds a direction.
     * @param {String} dir The direction
     */

  }, {
    key: "add",
    value: function add(dir) {
      this.rounds[0].push(dir);
    }
  }]);

  return PlayingState;
}();

module.exports = PlayingState;

},{}],48:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = require('./user');
var UserStatistics = require('./user-statistics');

var DEFAULT_CHAR_ID = 'ma';

/**
 * Factory class of User
 */

var UserFactory = function () {
  function UserFactory() {
    _classCallCheck(this, UserFactory);
  }

  _createClass(UserFactory, [{
    key: 'createFromObject',
    value: function createFromObject() {
      var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (obj.charId == null) {
        obj.charId = DEFAULT_CHAR_ID;
      }

      var stat = obj.stat || {};

      return new User(obj.charId, new UserStatistics(stat));
    }
  }]);

  return UserFactory;
}();

module.exports = UserFactory;

},{"./user":51,"./user-statistics":50}],49:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserFactory = require('./user-factory');

var _infrastructure = infrastructure;
var storage = _infrastructure.storage;

var KEY = 'LD-user-key';

/**
 * The repository class for the user model.
 */

var UserRepository = function () {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
  }

  _createClass(UserRepository, [{
    key: 'save',

    /**
     * Saves the user.
     */
    value: function save(user) {
      return storage.set(KEY, user).then(function () {
        return user;
      });
    }

    /**
     * Gets the user.
     */

  }, {
    key: 'get',
    value: function get() {
      return storage.get(KEY, {}).then(function (data) {
        return new UserFactory().createFromObject(data);
      });
    }
  }]);

  return UserRepository;
}();

module.exports = UserRepository;

},{"./user-factory":48}],50:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UserStatistics is the collection class of user statistics info.
 */

var UserStatistics =
/**
 * @param {object} opts The options
 * @param {number} [opts.launchTimes] The number of the launches of the app
 */
function UserStatistics(opts) {
  _classCallCheck(this, UserStatistics);

  /**
   * @property {number} launchTimes The number of the launches of the app
   */
  this.launchTimes = opts.launchTimes;
};

module.exports = UserStatistics;

},{}],51:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of user.
 */

var User =
/**
 * @param {string} charId The id of the character currently chosen
 * @param {UserStatistics} stat The statisctics of the user activity
 */
function User(charId, stat) {
  _classCallCheck(this, User);

  /**
   * @property {String} charId The id of the character currently chosen
   */
  this.charId = charId;

  /**
   * @property {UserStatistics} stat The statisctics of the user activity
   */
  this.stat = stat;
};

module.exports = User;

},{}],52:[function(require,module,exports){
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

var _require = require('spn');

var wait = _require.wait;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var wire = _$$cc.wire;

/**
 * Camera handles the screen position.
 */

var Camera = (_dec = wire('floor-asset-collection'), _dec2 = on('camera-focus'), _dec3 = on('camera-move'), component(_class = (_class2 = function () {
  function Camera() {
    _classCallCheck(this, Camera);
  }

  _createClass(Camera, [{
    key: 'getWindowWidth',

    /**
     * Gets the window width.
     * @return {number}
     */
    value: function getWindowWidth() {
      return $(window).width();
    }

    /**
     * @return {FloorAssetCollection}
     */

  }, {
    key: 'setUp',

    /**
     * Sets up the initial position.
     */
    value: function setUp() {
      this.scrollSet(this.floorAssets.findById(this.floorAssets.walker.assetId).centerX());
    }

    /**
     * Moves the camera to the given position if the position isn't visible.
     * @param {object} e The event object
     * @param {number} x The horizontal position
     */

  }, {
    key: 'focusToX',
    value: function focusToX(e, x) {
      if (!this.visible(x)) {
        this.scrollSet(x);
      }
    }

    /**
     * Sets the horizontal scroll position.
     */

  }, {
    key: 'scrollSet',
    value: function scrollSet(x) {
      this.elem.scrollLeft(x - this.getWindowWidth() / 2);
    }

    /**
     * Scrolls the camera focus to the given x in given duration.
     * @param {Event} e The event object (unused)
     * @param {Number} x The x coordinate
     * @param {Number} dur The duration
     * @return {Promise}
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo(e, x, dur) {
      this.elem.animate({ scrollLeft: x - this.getWindowWidth() / 2 }, dur);

      return wait(dur);
    }

    /**
     * Check if the character is visible on the screen.
     * @param {Number} x The focus position
     * @returns {Boolean}
     */

  }, {
    key: 'visible',
    value: function visible(x) {
      return x > this.elem.scrollLeft() && x < this.elem.scrollLeft() + this.getWindowWidth();
    }
  }, {
    key: 'floorAssets',
    get: function get() {}
  }]);

  return Camera;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'floorAssets', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'floorAssets'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'focusToX', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'focusToX'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'scrollTo', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'scrollTo'), _class2.prototype)), _class2)) || _class);

module.exports = Camera;

},{"spn":19}],53:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class;

var _templateObject = _taggedTemplateLiteral(['♛ Best ♛'], ['♛ Best ♛']),
    _templateObject2 = _taggedTemplateLiteral(['▶'], ['▶']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var wait = _require.wait;
var _require$animation = _require.animation;
var show = _require$animation.show;
var hide = _require$animation.hide;

var domGen = require('dom-gen');
var div = domGen.div;
var hr = domGen.hr;
var br = domGen.br;
var p = domGen.p;
var small = domGen.small;

var FloorAsset = require('./floor-asset');

var button = domGen('button');

var component = $.cc.component;

var DOOR_APPEAR_DUR = 400;

/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
var Door = (_dec = show('door-appear', DOOR_APPEAR_DUR), _dec2 = hide('door-disappear', DOOR_APPEAR_DUR), component(_class = _dec(_class = _dec2(_class = function (_FloorAsset) {
  _inherits(Door, _FloorAsset);

  /**
   * @constructor
   */

  function Door(elem) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Door).call(this, elem));

    _this.level = elem.attr('level');
    _this.star = 0;
    _this.score = 0;

    _this.doorActionDur = 400;

    _this.locked = true;
    return _this;
  }

  /**
   * Constructs the contents of the door. (Maybe not a good thing to do here)
   *
   * @override
   */

  _createClass(Door, [{
    key: 'willShow',
    value: function willShow() {
      _get(Object.getPrototypeOf(Door.prototype), 'willShow', this).call(this);

      this.elem.css('opcaity', 0).append(div({ addClass: 'door-body' }, div({ addClass: 'door-front' }, this.id), div({ addClass: 'doorknob' }, '●')), div({
        addClass: 'door-info multiflip',
        attr: { m: 3, n: 5, bgcolor: '#393F44' },
        css: {
          width: '150px',
          height: '150px',
          top: '-200px',
          left: '-40px'
        }
      }, div({ addClass: 'door-info-content' }, p(this.id), hr(), p(small(_templateObject), br(), this.score), hr(), button(_templateObject2).click(function (event) {
        event.preventDefault();
        $(this).trigger('go-to-level');
      }))).cc());

      this.doorBody = this.elem.find('.door-body');
      this.informationPanel = this.elem.find('.door-info').cc.get('multiflip');

      if (!this.locked) {
        this.enableDoorKnock();
      } else {
        return this.spawnFrog();
      }
    }

    /**
     * Opens the door.
     */

  }, {
    key: 'open',
    value: function open() {
      this.informationPanel.show();

      this.doorBody.addClass('open');

      this.removeFrog();

      this.disableDoorKnock();

      return wait(this.doorActionDur);
    }

    /**
     * Closes the door.
     */

  }, {
    key: 'close',
    value: function close() {
      this.informationPanel.hide();

      this.doorBody.removeClass('open');

      this.enableDoorKnock();

      return wait(this.doorActionDur);
    }

    /**
     * Enables the door knock.
     */

  }, {
    key: 'enableDoorKnock',
    value: function enableDoorKnock() {
      var _this2 = this;

      this.doorBody.one('click', function () {
        return _this2.doorKnock();
      });
    }

    /**
     * Disables the door knock.
     */

  }, {
    key: 'disableDoorKnock',
    value: function disableDoorKnock() {
      this.doorBody.off('click');
    }
  }]);

  return Door;
}(FloorAsset)) || _class) || _class) || _class);

module.exports = Door;

},{"./floor-asset":55,"dom-gen":1,"spn":19}],54:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2;

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

var _require = require('spn');

var wait = _require.wait;
var Being = _require.Being;

var Floorboard = require('./floorboard');

var _require2 = require('dom-gen');

var img = _require2.img;
var _$$cc = $.cc;
var component = _$$cc.component;
var wire = _$$cc.wire;

/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * Collective Component
 */

var FloorAssetCollection = (_dec = wire('floor-walker'), component(_class = (_class2 = function (_Being) {
  _inherits(FloorAssetCollection, _Being);

  function FloorAssetCollection() {
    _classCallCheck(this, FloorAssetCollection);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FloorAssetCollection).apply(this, arguments));
  }

  _createClass(FloorAssetCollection, [{
    key: 'init',
    value: function init(character) {
      var _this2 = this;

      this.elem.append(this.floorWalker(character));

      return this.loadFloorData(character).then(function (data) {
        return _this2.setUpComponents(data);
      }).then(function () {
        return _this2.walker.character.reloadLocks();
      }).then(function () {
        return _this2.checkLock();
      });
    }

    /**
     * Loads the floor data.
     */

  }, {
    key: 'loadFloorData',
    value: function loadFloorData(character) {
      return Promise.resolve($.get(this.getFloorDataURL(character)));
    }

    /**
     * Gets the floor data url.
     * @return {string}
     */

  }, {
    key: 'getFloorDataURL',
    value: function getFloorDataURL(character) {
      return global.BASEPATH + '/data/floor/' + character.position.floorId + '.html';
    }

    /**
     * Loads assets from the given string html data.
     * @param {String} data The data
     */

  }, {
    key: 'setUpComponents',
    value: function setUpComponents(data) {
      // prepend loaded (string) data to the elem
      $(data).prependTo(this.elem);

      // set y coordinate to doors and staircases
      this.elem.find('.door, .staircase').attr('y', Floorboard.groundLevel());

      // init floor assets
      $.cc.init('door staircase', this.elem[0]);

      // collect staircases
      this.staircases = this.elem.find('.staircase').map(function () {
        return $(this).cc.get('staircase');
      }).toArray();

      // collect doors
      this.doors = this.elem.find('.door').map(function () {
        return $(this).cc.get('door');
      }).toArray();

      this.items = [].concat(this.staircases, this.doors);

      // set floor width
      this.elem.width(this.elem.find('.floor-data').data('floor-width'));

      var character = this.walker.character;

      this.updateAssetsByLocksAndHistories(character.locks, character.histories);
    }

    /**
     * Update the floor assets by the level locks and level histories.
     * @param {LevelLockCollection} locks The level locks
     * @param {LevelHistoryCollection} histories The level histories
     */

  }, {
    key: 'updateAssetsByLocksAndHistories',
    value: function updateAssetsByLocksAndHistories(locks, histories) {
      this.items.forEach(function (asset) {
        asset.locked = locks.isLocked(asset.id);

        var history = histories.getById(asset.id);

        if (history) {
          asset.score = history.score;
        }
      });
    }

    /**
     * Checks if the current asset is unlocked and if not, then unlock it.
     * The purpose of this method is to unlock automatically the first asset where the character appear in the floor.
     * @param {string} assetId The id of the asset
     * @return {Promise}
     */

  }, {
    key: 'checkLock',
    value: function checkLock() {
      var assetId = this.walker.assetId;
      if (this.findById(assetId).locked) {
        return this.unlockById(assetId);
      }

      return Promise.resolve();
    }

    /**
     * Shows the floor assets.
     *
     * @override
     */

  }, {
    key: 'willShow',
    value: function willShow() {
      this.floorboard.show();

      return this.foldByFunc(function (item) {
        item.show();

        return wait(100);
      });
    }

    /**
     * Hides the floor assets.
     *
     * @override
     */

  }, {
    key: 'willHide',
    value: function willHide() {
      var _this3 = this;

      return this.foldByFunc(function (item) {
        item.disappear();

        return wait(100);
      }).then(function () {
        return _this3.floorboard.hide();
      });
    }

    /**
     * Folds the items by the given function. This is the private utility method.
     *
     * @private
     * @param {Function} func The folding function of each item
     */

  }, {
    key: 'foldByFunc',
    value: function foldByFunc(func) {
      return this.items.reduce(function (p, item) {
        return p.then(function () {
          return func(item);
        });
      }, Promise.resolve());
    }

    /**
     * Find the floor asset of the given id.
     *
     * @param {String} id The id of the wall object
     * @returns {domain.map.Door}
     */

  }, {
    key: 'findById',
    value: function findById(id) {
      return this.items.filter(function (item) {
        return item.id === id;
      })[0];
    }

    /**
     * Initializes the floor walker.
     * @param {Character} character
     * @return {jQuery} dom selection
     */

  }, {
    key: 'floorWalker',
    value: function floorWalker(character) {
      return img({
        addClass: 'sub-door-knock sub-character-goto',
        data: { character: character },
        cc: 'floor-walker'
      });
    }

    /**
     * Unlocks the asset by the given id.
     * @param {string} id The asset id
     * @return {Promise}
     * @throws {Error} when the asset is not found
     */

  }, {
    key: 'unlockById',
    value: function unlockById(id) {
      var asset = this.findById(id);

      if (!asset) {
        throw new Error('The asset not found: assetId=' + id);
      }

      asset.unlock();

      this.walker.unlockById(id);
      this.walker.removeKeyOf(id);

      return this.walker.saveAll();
    }
  }, {
    key: 'walker',
    get: function get() {}

    /**
     * @return {Floorboard}
     */

  }, {
    key: 'floorboard',
    get: function get() {}
  }]);

  return FloorAssetCollection;
}(Being), (_applyDecoratedDescriptor(_class2.prototype, 'walker', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'walker'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'floorboard', [wire], Object.getOwnPropertyDescriptor(_class2.prototype, 'floorboard'), _class2.prototype)), _class2)) || _class);

module.exports = FloorAssetCollection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./floorboard":57,"dom-gen":1,"spn":19}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var Grid = _require.Grid;
var Body = _require.Body;
var width = _require.width;
var height = _require.height;
var ratio = _require.ratio;

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */

var FloorAsset = (_dec = width(80), _dec2 = height(100), _dec3 = ratio.x(0.5), _dec4 = ratio.y(1), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function (_Body) {
  _inherits(FloorAsset, _Body);

  function FloorAsset(elem) {
    _classCallCheck(this, FloorAsset);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloorAsset).call(this));

    _this.x = +elem.attr('x');
    _this.y = +elem.attr('y');

    _this.id = elem.attr('id');
    return _this;
  }

  /**
   * Knocks the door (figuratively).
   */

  _createClass(FloorAsset, [{
    key: 'doorKnock',
    value: function doorKnock() {
      this.elem.trigger('door-knock', [this]);
    }

    /**
     * @abstract
     */

  }, {
    key: 'open',
    value: function open() {
      return Promise.resolve();
    }

    /**
     * @abstract
     */

  }, {
    key: 'close',
    value: function close() {
      return Promise.resolve();
    }

    /**
     * The handler when it gets the walker.
     *
     * @abstract
     */

  }, {
    key: 'onGetWalker',
    value: function onGetWalker() {
      return Promise.resolve();
    }

    /**
     * Spawn the frog to the front of the floor asset.
     */

  }, {
    key: 'spawnFrog',
    value: function spawnFrog() {
      var frog = $('<img />').css({ zIndex: 2 }).appendTo(this.elem).cc.init('frog');

      frog.setGrid(new Grid({ x: 35, y: 130, unitWidth: 100, unitHeight: 100 }));

      frog.show();
    }

    /**
     * Removes the frog in front of the floor asset.
     */

  }, {
    key: 'removeFrog',
    value: function removeFrog() {
      var frogDom = this.elem.find('.frog');

      if (frogDom.length === 0) {
        return;
      }

      var frog = frogDom.cc.get('frog');

      if (frog == null) {
        return;
      }

      frog.runAwayRight();
    }

    /**
     * Unlocks the door.
     */

  }, {
    key: 'unlock',
    value: function unlock() {
      this.locked = false;

      this.enableDoorKnock();

      this.removeFrog();
    }
  }]);

  return FloorAsset;
}(Body)) || _class) || _class) || _class) || _class);

module.exports = FloorAsset;

},{"spn":19}],56:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

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

var sprite = require('../../ui/sprite');

var _require = require('spn');

var Body = _require.Body;
var DIRS = _require.DIRS;
var ratio = _require.ratio;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var emit = _$$cc.emit;

/**
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * This works as the facade of Character model.
 */

var FloorWalker = (_dec = sprite.character, _dec2 = ratio.x(0.5), _dec3 = ratio.y(1), _dec4 = on('door-knock'), _dec5 = on('character-goto'), _dec6 = emit('camera-focus').last, _dec(_class = _dec2(_class = _dec3(_class = component(_class = (_class2 = function (_Body) {
  _inherits(FloorWalker, _Body);

  _createClass(FloorWalker, [{
    key: 'assetId',

    /**
     * @return {string}
     */
    get: function get() {
      return this.getPosition().floorObjectId;
    }
  }]);

  function FloorWalker(elem) {
    _classCallCheck(this, FloorWalker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloorWalker).call(this));

    _this.initSprite(elem);
    return _this;
  }

  _createClass(FloorWalker, [{
    key: 'willShow',
    value: function willShow() {
      this.updateSprite();

      return _get(Object.getPrototypeOf(FloorWalker.prototype), 'willShow', this).call(this);
    }

    /**
     * Makes the character appear in the scene
     *
     * @param {FloorAsset} floorAsset The wall object
     * @return {Promise}
     */

  }, {
    key: 'appearAt',
    value: function appearAt(floorAsset) {
      var _this2 = this;

      this.current = floorAsset;

      this.setAt(floorAsset.getPoint());

      return floorAsset.open().then(function () {
        _this2.turn(DIRS.DOWN);

        return _this2.show();
      });
    }

    /**
     * @param {Eevent} e The event
     * @param {FloorAsset} floorAsset The floor asset
     */

  }, {
    key: 'doorKnock',
    value: function doorKnock(e, floorAsset) {
      this.moveToFloorAsset(floorAsset);
    }

    /**
     * Character goes to another floor.
     * @param {Event} e The event object
     */

  }, {
    key: 'characterGoto',
    value: function characterGoto(e) {
      var _this3 = this;

      this.character.position.floorId = e.goto.floorId;
      this.character.position.floorObjectId = e.goto.floorObjectId;

      // Reloads the submodels here because the floor could change
      this.character.reloadAll().then(function () {
        return _this3.saveAll();
      }).then(function () {
        return _this3.elem.trigger('scene-reload');
      });
    }

    /**
     * Gets the character's position.
     *
     * @return {CharacterPosition}
     */

  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.character.position;
    }

    /**
     * Sets the floor object id.
     *
     * @param {String} floorObjectId The floor object id
     */

  }, {
    key: 'setFloorObjectId',
    value: function setFloorObjectId(floorObjectId) {
      this.character.position.floorObjectId = floorObjectId;

      return this.saveAll();
    }

    /**
     * Saves the character data.
     */

  }, {
    key: 'saveCharacter',
    value: function saveCharacter() {
      return this.saveAll();
    }

    /**
     * Makes the camera focus at me.
     */

  }, {
    key: 'focusMe',
    value: function focusMe() {
      return this.getPoint().x;
    }

    /**
     * Moves the character sprite to wall object
     *
     * @param {FloorAsset} floorAsset The wall object to go to
     * @return {Promise}
     */

  }, {
    key: 'moveToFloorAsset',
    value: function moveToFloorAsset(floorAsset) {
      var _this4 = this;

      var goOutDur = 220;
      var moveOnCorridor = 300;
      var goIntoDur = goOutDur;
      var goOutDistance = 80;

      this.focusMe();

      this.current.close();

      this.setTo(this.current.getPoint().down(goOutDistance));

      return this.engage(goOutDur).then(function () {
        // Notifies the character starts moving to the floorAsset.x.
        // The camera take this info and move following the hero.
        _this4.elem.trigger('camera-move', [floorAsset.x, moveOnCorridor]);

        floorAsset.open();

        _this4.setTo(floorAsset.getPoint().down(goOutDistance));

        return _this4.engage(moveOnCorridor);
      }).then(function () {
        _this4.setTo(floorAsset.getPoint());

        return _this4.engage(goIntoDur);
      }).then(function () {
        _this4.current = floorAsset;

        _this4.setFloorObjectId(floorAsset.id);

        floorAsset.onGetWalker(_this4);

        _this4.turn(DIRS.DOWN);
      });
    }

    /**
     * Gets the character into the door.
     * @return {Promise}
     */

  }, {
    key: 'getIntoDoor',
    value: function getIntoDoor() {
      var _this5 = this;

      this.turn(DIRS.UP);

      return this.disappear().then(function () {
        return _this5.current.close();
      });
    }

    /**
     * @param {string} assetId
     */

  }, {
    key: 'unlockById',
    value: function unlockById(assetId) {
      this.character.unlockById(assetId);
    }

    /**
     * @param {string} assetId
     */

  }, {
    key: 'removeKeyOf',
    value: function removeKeyOf(assetId) {
      this.character.removeKeyOf(assetId);
    }

    /**
     * Saves everything in character model. (Character itself, LevelHistories, LevelKeys)
     * @return {Promise}
     */

  }, {
    key: 'saveAll',
    value: function saveAll() {
      return this.character.saveAll();
    }
  }]);

  return FloorWalker;
}(Body), (_applyDecoratedDescriptor(_class2.prototype, 'doorKnock', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'doorKnock'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'characterGoto', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'characterGoto'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'focusMe', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'focusMe'), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);

module.exports = FloorWalker;

},{"../../ui/sprite":66,"spn":19}],57:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var wait = _require.wait;
var Being = _require.Being;
var component = $.cc.component;

var FLOORBOARD_MOVE_DUR = 400;
var HEIGHT_RATE = 0.35;

/**
 * Floor class handles the behaviour of floor of the Map view
 */

var Floorboard = component(_class = function (_Being) {
  _inherits(Floorboard, _Being);

  function Floorboard() {
    _classCallCheck(this, Floorboard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Floorboard).apply(this, arguments));
  }

  _createClass(Floorboard, [{
    key: 'willShow',
    value: function willShow() {
      this.elem.css('height', this.constructor.groundHeight());
      this.elem.css('top', this.constructor.groundLevel());
      this.elem.css('transform', 'scale(1)');

      return wait(FLOORBOARD_MOVE_DUR);
    }
  }, {
    key: 'willHide',
    value: function willHide() {
      this.elem.css('transform', 'scale(1, 0)');

      return wait(FLOORBOARD_MOVE_DUR);
    }
  }], [{
    key: 'groundLevel',

    /**
     * Returns the y coordinate of the ground line.
     *
     * @return {Number}
     */
    value: function groundLevel() {
      return $(window).height() * (1 - HEIGHT_RATE);
    }

    /**
     * Returns the visual height of the ground on the screen.
     *
     * @return {Number}
     */

  }, {
    key: 'groundHeight',
    value: function groundHeight() {
      return $(window).height() * HEIGHT_RATE;
    }
  }, {
    key: 'HEIGHT_RATE',
    get: function get() {
      return 0.35;
    }
  }]);

  return Floorboard;
}(Being)) || _class;

module.exports = Floorboard;

},{"spn":19}],58:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

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

var sprite = require('../../ui/sprite');

var _require = require('spn');

var Animation = _require.Animation;
var GridWalker = _require.GridWalker;
var width = _require.width;
var height = _require.height;
var ratio = _require.ratio;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */

var FrogSprite = (_dec = sprite.stayRun, _dec2 = width(100), _dec3 = height(50), _dec4 = ratio.x(0.5).y(1), _dec5 = component('frog'), _dec6 = on('click'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = function (_GridWalker) {
  _inherits(FrogSprite, _GridWalker);

  function FrogSprite(elem) {
    _classCallCheck(this, FrogSprite);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FrogSprite).call(this, elem));

    _this.initSprite();
    return _this;
  }

  _createClass(FrogSprite, [{
    key: 'willShow',
    value: function willShow() {
      this.updateSprite();

      return _get(Object.getPrototypeOf(FrogSprite.prototype), 'willShow', this).call(this);
    }
  }, {
    key: 'leftStayImage',
    value: function leftStayImage() {
      return 'img/frog-stay.out.svg';
    }
  }, {
    key: 'leftRunImage',
    value: function leftRunImage() {
      return 'img/frog-run.out.svg';
    }
  }, {
    key: 'awayDur',
    value: function awayDur() {
      return 400;
    }
  }, {
    key: 'awayAnim',
    value: function awayAnim() {
      return new Animation('foo', 400);
    }
  }, {
    key: 'jump',
    value: function jump() {
      this.elem.anim('jump', 300);
    }
  }]);

  return FrogSprite;
}(GridWalker), (_applyDecoratedDescriptor(_class2.prototype, 'jump', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'jump'), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class);

module.exports = FrogSprite;

},{"../../ui/sprite":66,"spn":19}],59:[function(require,module,exports){
'use strict';

require('./camera');
require('./door');
require('./floor-asset-collection');
require('./floor-walker');
require('./floorboard');
require('./frog-sprite');
require('./level-key');
require('./staircase');

},{"./camera":52,"./door":53,"./floor-asset-collection":54,"./floor-walker":56,"./floorboard":57,"./frog-sprite":58,"./level-key":60,"./staircase":61}],60:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sprite = require('../../ui/sprite');

var _require = require('spn');

var ratio = _require.ratio;
var width = _require.width;
var height = _require.height;
var Body = _require.Body;
var animation = _require.animation;
var component = $.cc.component;
var LevelKey = (_dec = sprite.static, _dec2 = ratio.x(0.5).y(1), _dec3 = width(50), _dec4 = height(50), _dec5 = animation.show('char-appear', 1000).hide('char-disappear', 1000), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = component(_class = function (_Body) {
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

    /**
     * Jumps with the given duration.
     */

  }, {
    key: 'jump',
    value: function jump() {
      var duration = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];

      return this.elem.anim('jump', duration);
    }
  }]);

  return LevelKey;
}(Body)) || _class) || _class) || _class) || _class) || _class) || _class);

module.exports = LevelKey;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../ui/sprite":66,"spn":19}],61:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var _require$animation = _require.animation;
var show = _require$animation.show;
var hide = _require$animation.hide;

var FloorAsset = require('./floor-asset');

var component = $.cc.component;

var STAIRCASE_ANIMATION_DUR = 400;

/**
 * Staircase class represents the staircases in the map view.
 */
var Staircase = (_dec = show('door-appear', STAIRCASE_ANIMATION_DUR), _dec2 = hide('door-disappear', STAIRCASE_ANIMATION_DUR), component(_class = _dec(_class = _dec2(_class = function (_FloorAsset) {
  _inherits(Staircase, _FloorAsset);

  function Staircase(elem) {
    _classCallCheck(this, Staircase);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Staircase).call(this, elem));

    _this.goto = elem.data('goto'); // must be parsed position object, not string

    _this.locked = true;
    return _this;
  }

  /**
   * Sets up the dom.
   */

  _createClass(Staircase, [{
    key: 'willShow',
    value: function willShow() {
      _get(Object.getPrototypeOf(Staircase.prototype), 'willShow', this).call(this);

      if (this.locked) {
        this.spawnFrog();
      } else {
        this.enableDoorKnock();
      }
    }

    /**
     * Enables the knock interaction.
     */

  }, {
    key: 'enableDoorKnock',
    value: function enableDoorKnock() {
      var _this2 = this;

      this.elem.one('click', function () {
        return _this2.doorKnock();
      });
    }

    /**
     * Disables the knock interaction.
     */

  }, {
    key: 'disableDoorKnock',
    value: function disableDoorKnock() {
      this.elem.off('click');
    }

    /**
     * Triggers the reload event.
     */

  }, {
    key: 'onGetWalker',
    value: function onGetWalker() {
      this.elem.trigger($.Event('character-goto', { goto: this.goto }));
    }
  }]);

  return Staircase;
}(FloorAsset)) || _class) || _class) || _class);

module.exports = Staircase;

},{"./floor-asset":55,"spn":19}],62:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

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

var scene = require('../ui/scene');
var UserRepository = require('../domain/user-repository');
var CharacterInitService = require('../domain/character-init-service');

var _require = require('dom-gen');

var img = _require.img;

require('./component');

var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var wire = _$$cc.wire;

/**
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 * - take care of menuButton, bg, floorAssets and camera
 */

var FloorScene = (_dec = scene.primary, _dec2 = wire('floor-asset-collection'), _dec3 = on('go-to-level'), _dec4 = on('scene-reload'), _dec(_class = component(_class = (_class2 = function () {
  function FloorScene() {
    _classCallCheck(this, FloorScene);
  }

  _createClass(FloorScene, [{
    key: 'load',

    /**
     * Loads the data for the scene.
     */
    value: function load() {
      var _this = this;

      return new UserRepository().get().then(function (user) {
        return new CharacterInitService().getOrCreateById(user.charId);
      }).then(function (character) {
        _this.character = character;
      });
    }

    /**
     * Sets up the components.
     */

  }, {
    key: 'setUp',
    value: function setUp() {
      var _this2 = this;

      return this.floorAssets.init(this.character).then(function () {
        return _this2.camera.setUp();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      return this.sequenceInitial().then(function () {
        return _this3.sequenceUnlockingAll();
      }).then(function () {
        return _this3.floorAssets.walker.focusMe();
      });
    }

    /**
     * Plays the initial sequence.
     */

  }, {
    key: 'sequenceInitial',
    value: function sequenceInitial() {
      var _this4 = this;

      this.menuButton.show();

      this.bg.turnWhite();

      return this.floorAssets.show().then(function () {
        var floorAsset = _this4.floorAssets.findById(_this4.floorAssets.walker.assetId);

        return _this4.floorAssets.walker.appearAt(floorAsset);
      });
    }

    /**
     * The sequence of unlocking all assets which the character has the keys of.
     */

  }, {
    key: 'sequenceUnlockingAll',
    value: function sequenceUnlockingAll() {
      var _this5 = this;

      if (this.character.hasAnyKey()) {
        return this.character.keys.reduce(function (promise, key) {
          return promise.then(function () {
            return _this5.sequenceUnlocking(key);
          });
        }, Promise.resolve());
      }
    }

    /**
     * The sequence of unlocking levels or next floors.
     * @param {LevelKey} levelKey The domain model of level key
     * @return {Promise}
     */

  }, {
    key: 'sequenceUnlocking',
    value: function sequenceUnlocking(levelKey) {
      var _this6 = this;

      var asset = undefined;
      var id = levelKey.levelId;
      var key = this.levelKey(levelKey);
      this.floorAssets.elem.append(key.elem);

      key.setAt(this.floorAssets.walker.getPoint());

      this.elem.trigger('camera-focus', [key.getPoint().x]);

      return key.show().then(function () {
        asset = _this6.floorAssets.findById(id);

        key.setAt(asset.getPoint());

        var keyGivingDur = 800;

        _this6.elem.trigger('camera-move', [key.getPoint().x, keyGivingDur]);

        return key.engage(keyGivingDur);
      }).then(function () {
        return key.jump();
      }).then(function () {
        return _this6.floorAssets.unlockById(id);
      }).then(function () {
        return key.disappear();
      });
    }
  }, {
    key: 'fadeOut',
    value: function fadeOut() {
      var _this7 = this;

      this.menuButton.hide();

      return this.floorAssets.hide().then(function () {
        return _this7.bg.turnBlack();
      });
    }
  }, {
    key: 'walkerFadeIntoDoor',
    value: function walkerFadeIntoDoor() {
      var _this8 = this;

      return this.floorAssets.walker.getIntoDoor().then(function () {
        return _this8.fadeOut();
      });
    }

    /**
     * Go to the specified level.
     *
     * @param {String} level The level
     */

  }, {
    key: 'goToLevel',
    value: function goToLevel() {
      return this.walkerFadeIntoDoor().then(function () {
        location.href = 'level.html';
      });
    }

    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */

  }, {
    key: 'sceneReload',
    value: function sceneReload() {
      return this.walkerFadeIntoDoor().then(function () {
        return location.reload();
      });
    }

    /**
     * Creates a level key.
     * @param {LevelKey} levelKey
     */

  }, {
    key: 'levelKey',
    value: function levelKey(_levelKey) {
      return img().cc.init('level-key');
    }
  }, {
    key: 'floorAssets',
    get: function get() {}

    /**
     * Gets the camera.
     * @return {Camera}
     */

  }, {
    key: 'camera',
    get: function get() {}
  }]);

  return FloorScene;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'floorAssets', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'floorAssets'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'camera', [wire], Object.getOwnPropertyDescriptor(_class2.prototype, 'camera'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'goToLevel', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'goToLevel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'sceneReload', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'sceneReload'), _class2.prototype)), _class2)) || _class) || _class);

module.exports = FloorScene;

},{"../domain/character-init-service":30,"../domain/user-repository":49,"../ui/scene":64,"./component":59,"dom-gen":1}],63:[function(require,module,exports){
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

},{"spn":19}],64:[function(require,module,exports){
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

},{"./common/background-service":63}],65:[function(require,module,exports){
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

},{"./ma":67,"./sprite":69,"spn":19,"traits-decorator":27}],66:[function(require,module,exports){
'use strict';

var _require = require('traits-decorator');

var traits = _require.traits;

module.exports = traits(require('./sprite'));
module.exports.static = traits(require('./static-sprite'));
module.exports.stayRun = traits(require('./stay-run-sprite'));
module.exports.character = traits(require('./char-sprite'));
module.exports.relativeBody = traits(require('./relative-body'));

},{"./char-sprite":65,"./relative-body":68,"./sprite":69,"./static-sprite":70,"./stay-run-sprite":71,"traits-decorator":27}],67:[function(require,module,exports){
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

},{"spn":19}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{"./sprite":69,"spn":19,"traits-decorator":27}],71:[function(require,module,exports){
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

},{"./sprite":69,"spn":19,"traits-decorator":27}]},{},[28]);
