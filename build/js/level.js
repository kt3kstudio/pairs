(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * arrowkeys v0.2.1
 *
 * author: Yosiya Hinosawa
 * license: MIT License
 */

(function (window, $) {
    'use strict';

    $.fn.arrowkeys = function () {
        var that = this;

        this._arrowkeysHandler = function (event) {
            switch (event.keyCode) {
                case 37:
                    event.preventDefault();
                    that.trigger('leftkey');
                    break;
                case 38:
                    event.preventDefault();
                    that.trigger('upkey');
                    break;
                case 39:
                    event.preventDefault();
                    that.trigger('rightkey');
                    break;
                case 40:
                    event.preventDefault();
                    that.trigger('downkey');
                    break;
            }
        };

        this.on('keydown', this._arrowkeysHandler);

        return this;
    };

    $.fn.arrowkeysUnbind = function () {
        this.off('keydown', this._arrowkeysHandler);

        delete this._arrowkeysHandler;

        return this;
    };

}(window, window.$));

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = domGen;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var div = exports.div = domGen('div');
var span = exports.span = domGen('span');
var img = exports.img = domGen('img');
var p = exports.p = domGen('p');

var h1 = exports.h1 = domGen('h1');
var h2 = exports.h2 = domGen('h2');
var h3 = exports.h3 = domGen('h3');
var h4 = exports.h4 = domGen('h4');
var h5 = exports.h5 = domGen('h5');
var h6 = exports.h6 = domGen('h6');

var form = exports.form = domGen('form');
var input = exports.input = domGen('input');
var label = exports.label = domGen('label');
var textarea = exports.textarea = domGen('textarea');
var select = exports.select = domGen('select');
var option = exports.option = domGen('option');

var hr = exports.hr = domGen('hr');
var br = exports.br = domGen('br');

var ul = exports.ul = domGen('ul');
var ol = exports.ol = domGen('ol');
var li = exports.li = domGen('li');

var small = exports.small = domGen('small');
var big = exports.big = domGen('big');
var strong = exports.strong = domGen('strong');
var i = exports.i = domGen('i');
var b = exports.b = domGen('b');
var s = exports.s = domGen('s');
var address = exports.address = domGen('address');
var sub = exports.sub = domGen('sub');
var sup = exports.sup = domGen('sup');

var table = exports.table = domGen('table');
var tr = exports.tr = domGen('tr');
var th = exports.th = domGen('th');
var td = exports.td = domGen('td');

var dl = exports.dl = domGen('dl');
var dt = exports.dt = domGen('dt');
var dd = exports.dd = domGen('dd');

var main = exports.main = domGen('main');
var header = exports.header = domGen('header');
var nav = exports.nav = domGen('nav');
var aside = exports.aside = domGen('aside');
var article = exports.article = domGen('article');
var footer = exports.footer = domGen('footer');


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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _reflow = require('./reflow');

var _reflow2 = _interopRequireDefault(_reflow);

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      (0, _reflow2.default)(elem);

      elem.css(ANIMATION_PROP_NAME, this.name + ' ' + (0, _ifNumElse2.default)(dur, this.duration) + 'ms');

      return (0, _wait2.default)(this.duration);
    }
  }]);

  return Animation;
}();

exports.default = Animation;
},{"./if-num-else":12,"./reflow":19,"./wait":22}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */

var Being = function (_$$cc$Actor) {
  _inherits(Being, _$$cc$Actor);

  function Being() {
    _classCallCheck(this, Being);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Being).apply(this, arguments));
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
      var _this2 = this;

      return Promise.resolve(this.willShow()).then(function () {

        var anim = _this2.showAnim();

        return anim != null && anim.apply(_this2.elem, dur);
      }).then(function () {
        return _this2.didShow();
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
      var _this3 = this;

      return Promise.resolve(this.willHide()).then(function () {

        var anim = _this3.hideAnim();

        return anim != null && anim.apply(_this3.elem, dur);
      }).then(function () {
        return _this3.didHide();
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
      var _this4 = this;

      return this.hide(dur).then(function () {
        return _this4.elem.remove();
      });
    }
  }]);

  return Being;
}($.cc.Actor);

exports.default = Being;
},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _being = require('./being');

var _being2 = _interopRequireDefault(_being);

var _posture = require('./posture');

var _posture2 = _interopRequireDefault(_posture);

var _reflow = require('./reflow');

var _reflow2 = _interopRequireDefault(_reflow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */

var Body = function (_Being) {
  _inherits(Body, _Being);

  /**
   * @param {jQuery} elem The element
   */

  function Body(elem) {
    _classCallCheck(this, Body);

    /**
     * @property {Number} x sprite's x coordinate value
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Body).call(this, elem));

    _this.x = 0;

    /**
     * @property {Number} y sprite's y coordinate value
     */
    _this.y = 0;

    /**
     * @property {Posture} posture The posture of the rectangle
     */
    _this.posture = new _posture2.default({
      width: _this.width(),
      height: _this.height(),
      ratioX: _this.ratioX(),
      ratioY: _this.ratioY(),
      marginX: _this.marginX(),
      marginY: _this.marginY()
    });

    _this.elem.css('position', 'absolute'); // Set `position: absolute`, this class doesn't work without this.

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

      this.updateElem();
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

      this.elem.css('top', this.posture.topLimit(this.y));
      this.elem.css('left', this.posture.leftLimit(this.x));
    }

    /**
     * Updates the elem's width and height.
     * @private
     */

  }, {
    key: 'updateRect',
    value: function updateRect() {

      this.elem.width(this.posture.actualWidth());
      this.elem.height(this.posture.actualHeight());
    }

    /**
     * Updates the actual elem dom according to the current posture.
     * Returns a promise which resolves with the transitionDuration milliseconds.
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

      return (0, _wait2.default)(this.transitionDuration);
    }

    /**
     * Moves the elem to the given y position.
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
     * @param {Number} dur The transition duration
     */

  }, {
    key: 'setTransitionDuration',
    value: function setTransitionDuration(dur) {

      this.transitionDuration = dur;

      this.elem.css('transition-duration', dur + 'ms');

      (0, _reflow2.default)(this.elem);
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
  }]);

  return Body;
}(_being2.default);

exports.default = Body;
},{"./being":5,"./posture":17,"./reflow":19,"./wait":22}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CharSprite = function (_Sprite) {
  _inherits(CharSprite, _Sprite);

  function CharSprite() {
    _classCallCheck(this, CharSprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CharSprite).apply(this, arguments));
  }

  return CharSprite;
}(_sprite2.default);

exports.default = CharSprite;
},{"./sprite":20}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = DirStateImageMap;
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UP = exports.UP = 0;
var TOP = exports.TOP = 0;
var LEFT = exports.LEFT = 1;
var RIGHT = exports.RIGHT = 2;
var BOTTOM = exports.BOTTOM = 3;
var DOWN = exports.DOWN = 3;
},{}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    function GridWalker(elem) {
        _classCallCheck(this, GridWalker);

        /**
         * @property {number} m The horizontal grid position
         */

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GridWalker).call(this, elem));

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
}(_body2.default);

exports.default = GridWalker;
},{"./body":6}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        this.unitWidth = (0, _ifNumElse2.default)(unitWidth, 0);
        this.unitHeight = (0, _ifNumElse2.default)(unitHeight, 0);
        this.cellWidth = (0, _ifNumElse2.default)(cellWidth, this.unitWidth);
        this.cellHeight = (0, _ifNumElse2.default)(cellHeight, this.unitHeight);
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
                x: (0, _ifNumElse2.default)(x, this.x),
                y: (0, _ifNumElse2.default)(y, this.y),
                unitWidth: (0, _ifNumElse2.default)(unitWidth, this.unitWidth),
                unitHeight: (0, _ifNumElse2.default)(unitHeight, this.unitHeight),
                cellWidth: (0, _ifNumElse2.default)(cellWidth, this.cellWidth),
                cellHeight: (0, _ifNumElse2.default)(cellHeight, this.cellHeight)
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

            return new _rect2.default({

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

exports.default = Grid;
},{"./if-num-else":12,"./rect":18}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Shorthand for `typeof num === 'number' ? num : defaultValue`.
 *
 * @param {object} num The number or anthing
 * @param {number} defaultValue The default value
 * @return {number}
 */

exports.default = function (num, defaultValue) {
  return typeof num === 'number' ? num : defaultValue;
};
},{}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Image;
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRS = exports.StaticSprite = exports.CharSprite = exports.Sprite = exports.DirStateImageMap = exports.Image = exports.Animation = exports.GridWalker = exports.Grid = exports.Rect = exports.LayoutFactory = exports.Posture = exports.Body = exports.Being = exports.ifNumElse = exports.reflow = exports.wait = undefined;

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _reflow = require('./reflow');

var _reflow2 = _interopRequireDefault(_reflow);

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

var _being = require('./being');

var _being2 = _interopRequireDefault(_being);

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

var _posture = require('./posture');

var _posture2 = _interopRequireDefault(_posture);

var _layoutFactory = require('./layout-factory');

var _layoutFactory2 = _interopRequireDefault(_layoutFactory);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

var _gridWalker = require('./grid-walker');

var _gridWalker2 = _interopRequireDefault(_gridWalker);

var _animation = require('./animation');

var _animation2 = _interopRequireDefault(_animation);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _dirStateImageMap = require('./dir-state-image-map');

var _dirStateImageMap2 = _interopRequireDefault(_dirStateImageMap);

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _charSprite = require('./char-sprite');

var _charSprite2 = _interopRequireDefault(_charSprite);

var _staticSprite = require('./static-sprite');

var _staticSprite2 = _interopRequireDefault(_staticSprite);

var _dirs = require('./dirs');

var DIRS = _interopRequireWildcard(_dirs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.wait = _wait2.default;
exports.reflow = _reflow2.default;
exports.ifNumElse = _ifNumElse2.default;
exports.Being = _being2.default;
exports.Body = _body2.default;
exports.Posture = _posture2.default;
exports.LayoutFactory = _layoutFactory2.default;
exports.Rect = _rect2.default;
exports.Grid = _grid2.default;
exports.GridWalker = _gridWalker2.default;
exports.Animation = _animation2.default;
exports.Image = _image2.default;
exports.DirStateImageMap = _dirStateImageMap2.default;
exports.Sprite = _sprite2.default;
exports.CharSprite = _charSprite2.default;
exports.StaticSprite = _staticSprite2.default;
exports.DIRS = DIRS;
},{"./animation":4,"./being":5,"./body":6,"./char-sprite":7,"./dir-state-image-map":8,"./dirs":9,"./grid":11,"./grid-walker":10,"./if-num-else":12,"./image":13,"./layout-factory":16,"./posture":17,"./rect":18,"./reflow":19,"./sprite":20,"./static-sprite":21,"./wait":22}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

            return _rect2.default.ofIntervals(this, interval);
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

exports.default = Interval;
},{"./rect":18}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      return new _grid2.default(options);
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

      return new _rect2.default(options);
    }
  }]);

  return LayoutFactory;
}();

exports.default = LayoutFactory;
},{"./grid":11,"./rect":18}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        this.width = (0, _ifNumElse2.default)(width, 100);
        this.height = (0, _ifNumElse2.default)(height, 100);

        this.ratioX = (0, _ifNumElse2.default)(ratioX, 0);
        this.ratioY = (0, _ifNumElse2.default)(ratioY, 0);

        this.marginX = (0, _ifNumElse2.default)(marginX, 0);
        this.marginY = (0, _ifNumElse2.default)(marginY, 0);

        this.marginTop = marginTop;
        this.marginRight = marginRight;
        this.marginBottom = marginBottom;
        this.marginLeft = marginLeft;
    }

    /**
     * The actual height of the rect.
     *
     * @return {Number}
     */


    _createClass(Posture, [{
        key: 'actualHeight',
        value: function actualHeight() {

            return this.height - this.getMarginTop() - this.getMarginBottom();
        }

        /**
         * The actual width of the rect.
         *
         * @return {Number}
         */

    }, {
        key: 'actualWidth',
        value: function actualWidth() {

            return this.width - this.getMarginLeft() - this.getMarginRight();
        }

        /**
         * Returns the top margin.
         *
         * @return {Number}
         */

    }, {
        key: 'getMarginTop',
        value: function getMarginTop() {

            return (0, _ifNumElse2.default)(this.marginTop, this.marginY);
        }

        /**
         * Returns the right margin.
         *
         * @return {Number}
         */

    }, {
        key: 'getMarginRight',
        value: function getMarginRight() {

            return (0, _ifNumElse2.default)(this.marginRight, this.marginX);
        }

        /**
         * Returns the bottom margin.
         *
         * @return {Number}
         */

    }, {
        key: 'getMarginBottom',
        value: function getMarginBottom() {

            return (0, _ifNumElse2.default)(this.marginBottom, this.marginY);
        }

        /**
         * Returns the left margin.
         *
         * @return {Number}
         */

    }, {
        key: 'getMarginLeft',
        value: function getMarginLeft() {

            return (0, _ifNumElse2.default)(this.marginLeft, this.marginX);
        }

        /**
         * The top limit of the rect.
         *
         * @param {Number} y The primary vertical position
         * @return {Number}
         */

    }, {
        key: 'topLimit',
        value: function topLimit(y) {

            return y - this.height * this.ratioY + this.getMarginTop();
        }

        /**
         * The bottom limit of the rect.
         *
         * @param {Number} y The primary vertical position
         * @return {Number}
         */

    }, {
        key: 'bottomLimit',
        value: function bottomLimit(y) {

            return this.topLimit(y) + this.actualHeight();
        }

        /**
         * The left limit of the rect.
         *
         * @param {Number} x The primary horizontal position
         * @return {Number}
         */

    }, {
        key: 'leftLimit',
        value: function leftLimit(x) {

            return x - this.width * this.ratioX + this.getMarginLeft();
        }

        /**
         * The right limit of the rect.
         *
         * @param {Number} x The primary horizontal position
         * @return {Number}
         */

    }, {
        key: 'rightLimit',
        value: function rightLimit(x) {

            return this.leftLimit(x) + this.actualWidth();
        }

        /**
         * The horizontal center of the rect.
         *
         * @param {Number} x The primary horizontal position
         * @return {Number}
         */

    }, {
        key: 'centerX',
        value: function centerX(x) {

            return (this.leftLimit(x) + this.rightLimit(x)) / 2;
        }

        /**
         * The vertical center of the rect.
         *
         * @param {Number} y The primary vertical position
         * @return {Number}
         */

    }, {
        key: 'centerY',
        value: function centerY(y) {

            return (this.topLimit(y) + this.bottomLimit(y)) / 2;
        }

        /**
         * Gets the horizontal position when it is placed in the given rect.
         *
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
         *
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
         *
         * @param {Rect} rect
         */

    }, {
        key: 'fitToRect',
        value: function fitToRect(rect) {

            this.width = rect.width();
            this.height = rect.height();
        }

        /**
         * Scales the rectangle to fit as an inner tangent of the rectangle of the given width and height.
         *
         * @param {Number} width The width of the target outer rectangle
         * @param {Number} height The height of the target outer rectangle
         */

    }, {
        key: 'fitInto',
        value: function fitInto(width, height) {

            var tangent = new _rect2.default({
                top: 0,
                left: 0,
                right: this.width,
                bottom: this.height
            }).similarInnerTangent(new _rect2.default({
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

exports.default = Posture;
},{"./if-num-else":12,"./rect":18}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

var _interval = require('./interval');

var _interval2 = _interopRequireDefault(_interval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        this.horizontal = new _interval2.default(right, left);
        this.vertical = new _interval2.default(bottom, top);
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

            return new _grid2.default({
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


            return this.horizontal.margin((0, _ifNumElse2.default)(right, 0), (0, _ifNumElse2.default)(left, 0)).by(this.vertical.margin((0, _ifNumElse2.default)(bottom, 0), (0, _ifNumElse2.default)(top, 0)));
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
         * Returns a dual grid
         *
         * @return {Grid}
         */
        value: function dual() {

            return this.toGrid();
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

            return _interval2.default.ofSize(width).by(_interval2.default.ofSize(height));
        }
    }]);

    return Rect;
}();

exports.default = Rect;
},{"./grid":11,"./if-num-else":12,"./interval":15}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reflow;
/**
 * Reflows the given element
 *
 * @param {jQuery|HTMLElement} elem The element
 */
function reflow(elem) {

  var offsetHeight = $(elem).get(0).offsetHeight;

  offsetHeight = offsetHeight + 1;

  return elem;
}
},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gridWalker = require('./grid-walker');

var _gridWalker2 = _interopRequireDefault(_gridWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = function (_GridWalker) {
  _inherits(Sprite, _GridWalker);

  function Sprite() {
    _classCallCheck(this, Sprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).apply(this, arguments));
  }

  return Sprite;
}(_gridWalker2.default);

exports.default = Sprite;
},{"./grid-walker":10}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticSprite = function (_Sprite) {
  _inherits(StaticSprite, _Sprite);

  function StaticSprite() {
    _classCallCheck(this, StaticSprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StaticSprite).apply(this, arguments));
  }

  return StaticSprite;
}(_sprite2.default);

exports.default = StaticSprite;
},{"./sprite":20}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wait;
/**
 * Returns a promise which resolves in the given milliseconds.
 *
 * @param {number} n The time in milliseconds
 * @param {object} result The value to resolve
 * @return {Promise}
 */
function wait(n, result) {

  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(result);
    }, n);
  });
}
},{}],23:[function(require,module,exports){
/**
 * swipe-cross.js 0.0.0
 * author: Yoshiya Hinosawa (@kt3k)
 * license: MIT lisence
 */

window.SwipeEvent.SwipeCross = (function (window, $) {
    'use strict';

    var SWIPE = {
        THRESHOLD: 3
    };

    var DIRECTION = {
        UP: 0,
        DOWN: 1,
        RIGHT: 2,
        LEFT: 3
    };

    var EVENT = {
        SWIPE: {
            UP: 'swipeup',
            RIGHT: 'swiperight',
            DOWN: 'swipedown',
            LEFT: 'swipeleft'
        }
    };

    var SwipeCross = function (options) {
        options = options || {};

        this.elm = options.elm;

        this.bindEvents();
    };

    var crossSwipePrototype = SwipeCross.prototype;

    crossSwipePrototype.createHandlers = function () {

        var self = this;

        this.handler = function (event) {
            event.preventDefault();

            var stroke = new SwipeStroke(event.detail.startX, event.detail.startY, event.detail.endX, event.detail.endY);

            if (stroke.distance() <= SWIPE.THRESHOLD) {
                return;
            }

            var direction = stroke.direction();

            if (direction === DIRECTION.UP) {
                self.dispatchEvent(EVENT.SWIPE.UP);
            } else if (direction === DIRECTION.LEFT) {
                self.dispatchEvent(EVENT.SWIPE.LEFT);
            } else if (direction === DIRECTION.RIGHT) {
                self.dispatchEvent(EVENT.SWIPE.RIGHT);
            } else {
                self.dispatchEvent(EVENT.SWIPE.DOWN);
            }
        };
    };

    crossSwipePrototype.bindEvents = function () {
        this.createHandlers();

        this.elm.addEventListener('swipeend', this.handler, false);
    };

    crossSwipePrototype.unbindEvents = function () {
        this.elm.removeEventListener('swipeend', this.handler, false);
    };

    crossSwipePrototype.dispatchEvent = function (eventName) {
        this.elm.dispatchEvent(new CustomEvent(eventName, {}));
    };

    /**
     * @class
     */
    var SwipeStroke = function (startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    };

    var prototype = SwipeStroke.prototype;

    /**
     * Calculate uniform distance between the initial position and the last position.
     * @private
     */
    prototype.distance = function () {

        var x = this.endX - this.startX;
        var y = this.endY - this.startY;

        return Math.max(Math.abs(x), Math.abs(y));

    };

    /**
     * Returns swipe angle in degree (0 < angle < 360).
     * @private
     */
    prototype.angle = function () {

        var rad = Math.atan2(
            this.endY - this.startY,
            this.endX - this.startX
        );

        return (Math.floor(rad * 180 / Math.PI) + 360) % 360;

    };

    /**
     *
     */
    prototype.direction = function () {

        var angle = this.angle();

        if (angle < 45 || angle >= 315) {
            return DIRECTION.RIGHT;
        } else if (angle >= 45 && angle < 135) {
            return DIRECTION.DOWN;
        } else if (angle >= 135 && angle < 225) {
            return DIRECTION.LEFT;
        } else {
            return DIRECTION.UP;
        }
    };

    if ($ != null && $.fn != null) {

        $.fn.swipeCross = function () {

            if (this._swipeEvent == null) {
                this._swipeEvent = new window.SwipeEvent({elm: this[0]});
            }

            this._swipeCross = new SwipeCross({elm: this[0]});

            return this;
        };

        $.fn.swipeCrossUnbind = function () {

            if (this._swipeEvent != null) {

                this._swipeEvent.unbindEvents();

                this._swipeEvent = null;
            }

            if (this._swipeCross != null) {

                this._swipeCross.unbindEvents();

            }

            this._swipeCross = null;

            return this;
        };

    }

    return SwipeCross;

}(window, window.$));

},{}],24:[function(require,module,exports){
/**
 * swipe-event.js 0.0.0
 * author: Yoshiya Hinosawa (@kt3k)
 * license: MIT lisence
 */

window.SwipeEvent = (function (window, $) {
    'use strict';

    var EVENT = {
        SWIPE: {
            CANCEL: 'swipecancel',
            END: 'swipeend'
        }
    };

    var SwipeEvent = function (options) {
        options = options || {};

        this.elm = options.elm;

        this.fingerCount = 0;

        this.touchCurrent = null;
        this.touchInitial = null;

        this.bindEvents();
    };

    /**
     * Detect if environment supports touch
     *
     * @return {Boolean} true if device supports touch, otherwise false
     */
    SwipeEvent.isTouchDevice = function () {
        return 'ontouchstart' in window.document.documentElement;
    };

    var prototype = SwipeEvent.prototype;

    prototype.dispatchEvent = function (eventName) {
        this.elm.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                startX: this.touchInitial.pageX,
                startY: this.touchInitial.pageY,
                endX: this.touchCurrent.pageX,
                endY: this.touchCurrent.pageY
            }
        }));
    };

    prototype.swipeEnd = function () {
        if (this.fingerCount !== 1) {
            this.fingerCount = 0;

            return;
        }

        this.fingerCount = 0;

        this.dispatchEvent(EVENT.SWIPE.END);

    };

    // touch event handlers and a resetter
    prototype.touchStart = function (touch) {
        this.touchInitial = {pageX: touch.pageX, pageY: touch.pageY};
        this.touchCurrent = touch;
        this.fingerCount = 1;
    };

    prototype.touchMove = function (touch) {
        this.touchCurrent = touch;
    };

    prototype.touchEnd = function () {
        this.swipeEnd();
    };

    prototype.touchCancel = function () {
        if (this.fingerCount > 0) {
            this.fingerCount = 0;

            this.dispatchEvent(EVENT.SWIPE.CANCEL);
        }
    };

    prototype.createHandlers = function () {

        var self = this;

        this.handlers = {
            touchStart: function (event) {

                event.preventDefault();

                if (event.touches.length === 1) {
                    self.touchStart(event.touches[0]);
                } else {
                    self.touchCancel();
                }
            },

            touchMove: function (event) {

                event.preventDefault();

                if (self.fingerCount === 1) {
                    self.touchMove(event.touches[0]);
                } else {
                    self.touchCancel();
                }
            },

            touchEnd: function (event) {

                event.preventDefault();

                if (self.fingerCount === 1) {
                    self.touchEnd();
                } else {
                    self.touchCancel();
                }
            },

            touchCancel: function (event) {

                event.preventDefault();

                self.touchCancel();

            },

            mouseDown: function (event) {

                event.preventDefault();

                self.touchStart(event);

            },

            mouseMove: function (event) {

                event.preventDefault();

                self.touchMove(event);

            },

            mouseUp: function (event) {

                event.preventDefault();

                self.touchEnd();

            },

            mouseOut: function (event) {

                event.preventDefault();

                self.touchCancel();

            }
        };
    };

    prototype.bindEvents = function () {

        this.createHandlers();

        if (SwipeEvent.isTouchDevice()) {
            this.elm.addEventListener('touchstart', this.handlers.touchStart, false);
            this.elm.addEventListener('touchmove', this.handlers.touchMove, false);
            this.elm.addEventListener('touchend', this.handlers.touchEnd, false);
            this.elm.addEventListener('touchcancel', this.handlers.touchCancel, false);
        } else {
            this.elm.addEventListener('mousedown', this.handlers.mouseDown, false);
            this.elm.addEventListener('mousemove', this.handlers.mouseMove, false);
            this.elm.addEventListener('mouseout', this.handlers.mouseOut, false);
            this.elm.addEventListener('mouseup', this.handlers.mouseUp, false);
        }
    };

    prototype.unbindEvents = function () {

        if (SwipeEvent.isTouchDevice()) {
            this.elm.removeEventListener('touchstart', this.handlers.touchStart, false);
            this.elm.removeEventListener('touchmove', this.handlers.touchMove, false);
            this.elm.removeEventListener('touchend', this.handlers.touchEnd, false);
            this.elm.removeEventListener('touchcancel', this.handlers.touchCancel, false);
        } else {
            this.elm.removeEventListener('mousedown', this.handlers.mouseDown, false);
            this.elm.removeEventListener('mousemove', this.handlers.mouseMove, false);
            this.elm.removeEventListener('mouseout', this.handlers.mouseOut, false);
            this.elm.removeEventListener('mouseup', this.handlers.mouseUp, false);
        }
    };

    if ($ != null && $.fn != null) {

        $.fn.swipeEvent = function () {
            this._swipeEvent = new SwipeEvent({elm: this[0]});

            return this;
        };

        $.fn.swipeEventUnbind = function () {

            if (this._swipeEvent != null) {
                this._swipeEvent.unbindEvents();
            }

            this._swipeEvent = null;

            return this;
        };

    }

    return SwipeEvent;

}(window, window.$));

},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
'use strict';

require('arrowkeys');

require('swipe-event/swipe-event');

require('swipe-event/swipe-cross');

require('../../src/level/intro-scene');

require('../../src/level/play-scene');

require('../../src/level/outro-scene');

},{"../../src/level/intro-scene":54,"../../src/level/outro-scene":57,"../../src/level/play-scene":58,"arrowkeys":1,"swipe-event/swipe-cross":23,"swipe-event/swipe-event":24}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
         * @return {Promise} A promise of a character
         */

    }, {
        key: 'getById',
        value: function getById(id) {

            return infrastructure.storage.get(STORAGE_KEY + id, null).then(function (obj) {

                var character = undefined;

                var factory = new datadomain.CharacterFactory();

                if (obj == null) {

                    character = factory.createInitialById(id);
                } else {

                    character = factory.createFromObject(obj);
                }

                return Promise.all([character, character.reloadHistories(), character.reloadPlayingState(), character.reloadLocks()]);
            }).then(function (array) {
                return array[0];
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
                position: this.positionToObject(character.position)
            };
        }

        /**
         * @private
         * Converts the CharPosition object into js object.
         *
         * @param {datadomain.CharPosition} position The position
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

exports.default = CharacterRepository;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * BomTable is the master table of the cell name for each number.
 */
exports.default = {

    1: 'monon',
    2: 'deutron',
    3: 'triton',
    4: 'quatron',
    5: 'penton',
    6: 'hexton',
    7: 'septon'

};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GENES = ['f', 'm', 'a', 'w', 'b'];

var GENE_SCORE_TABLE = {
    f: 1,
    m: 1,
    a: 8,
    w: 64,
    b: 512
};

function virtualLengthOfMonon(monon) {

    return GENE_SCORE_TABLE[monon] || 0;
}

function countChar(string, c) {

    return string.split(c).length - 1;
}

function sumArray(array) {
    return array.reduce(function (n, m) {
        return n + m;
    });
}

/**
 * MeioticService is the service class which handles meiotic recombination and calculation of its value.
 */

var MeioticService = function () {
    function MeioticService() {
        _classCallCheck(this, MeioticService);
    }

    _createClass(MeioticService, [{
        key: 'recombination',

        /**
         * Calculates the recombination the maternal gene and the paternal gene and returns a new gene.
         *
         * @param {String} maternalGene The gene of the mother
         * @param {String} paternalGene The gene of the father
         * @return {String}
         */
        value: function recombination(maternalGene, paternalGene) {

            var newGene = (maternalGene + paternalGene).replace(/([fm])(\1)+/g, '$1');

            if (newGene.length >= 8) {
                // remove all males and females
                newGene = newGene.replace(/[fm]/g, '');

                // add an ankh for the reward of over 8 recombination
                newGene += 'a';
            }

            if (newGene.length >= 8) {
                // remove all ankhs
                newGene = newGene.replace(/[a]/g, '');

                // add a wheel for the reward of over 8 recombination
                newGene += 'w';
            }

            if (newGene.length >= 8) {
                // remove all wheels
                newGene = newGene.replace(/[w]/g, '');

                // add a bat for the reward of over 8 recombination
                newGene += 'b';
            }

            if (newGene.length >= 8) {
                newGene = 'm'; // Returns to the beginning
            }

            return newGene;
        }

        /**
         * Returns the virtual length of the gene.
         *
         * @param {String} gene The gene
         * @return {Number}
         */

    }, {
        key: 'virtualLength',
        value: function virtualLength(gene) {

            return sumArray(GENES.map(function (c) {
                return countChar(gene, c) * virtualLengthOfMonon(c);
            }));
        }
    }]);

    return MeioticService;
}();

exports.default = MeioticService;

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _userStatistics = require('./user-statistics');

var _userStatistics2 = _interopRequireDefault(_userStatistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

            return new _user2.default(obj.charId, new _userStatistics2.default(obj.stat));
        }
    }]);

    return UserFactory;
}();

exports.default = UserFactory;

},{"./user":33,"./user-statistics":32}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userFactory = require('./user-factory');

var _userFactory2 = _interopRequireDefault(_userFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      return infrastructure.storage.set(KEY, user).then(function () {
        return user;
      });
    }

    /**
     * Gets the user.
     */

  }, {
    key: 'get',
    value: function get() {

      return infrastructure.storage.get(KEY, {}).then(function (data) {
        return new _userFactory2.default().createFromObject(data);
      });
    }
  }]);

  return UserRepository;
}();

exports.default = UserRepository;

},{"./user-factory":30}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UserStatistics is the collection class of user statistics info.
 */

var UserStatistics = function () {
  function UserStatistics() {
    _classCallCheck(this, UserStatistics);
  }

  _createClass(UserStatistics, [{
    key: "constuctor",

    /**
     * @constructor
     * @param {Object} opts The options
     * @param {Number} [opts.launchTimes] The number of the launches of the app
     */
    value: function constuctor(opts) {

      /**
       * @property {Number} launchTimes The number of the launches of the app
       */
      this.launchTimes = opts.launchTimes;
    }
  }]);

  return UserStatistics;
}();

exports.default = UserStatistics;

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of user.
 */

var User = function () {

  /**
   * @constructor
   * @param {String} charId The id of the character currently chosen
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
  }

  /**
   * Sets the character id.
   *
   * @param {String} charId The character id.
   */

  _createClass(User, [{
    key: "setCharId",
    value: function setCharId(charId) {

      this.charId = charId;
    }
  }]);

  return User;
}();

exports.default = User;

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BASE_PATH = exports.BASE_PATH = '';

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _possibleMoveDetectionService = require('./possible-move-detection-service');

var _possibleMoveDetectionService2 = _interopRequireDefault(_possibleMoveDetectionService);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 * @class
 */

var BallMoveMobLeaveService = function () {

    /**
     * @constructor
     * @param {Ball} ball The ball
     * @param {CellCollection} cells The cells
     */

    function BallMoveMobLeaveService(ball, cells) {
        _classCallCheck(this, BallMoveMobLeaveService);

        this.ball = ball;
        this.mobs = new Mobs(cells);

        this.pmds = new _possibleMoveDetectionService2.default(this.ball, cells);
    }

    /**
     * Processes the stream of direction and returns the stream of cells.
     *
     * @param {Rx.Observable<String>} dirStream The stream of directions
     * @return {Rx.Observable<Cell>}
     */

    _createClass(BallMoveMobLeaveService, [{
        key: 'processDirStream',
        value: function processDirStream(dirStream) {
            var _this = this;

            return dirStream.pipe(function (dir) {
                return _this.ballMoveAndLeaveOne(dir);
            }).filterNull();
        }

        /**
         * Makes the ball move to the specified direction and a mob leave the field.
         *
         * @param {String} dir The direction the ball moves (up|down|right|left)
         * @returns {Cell|Rx.Observable} A promise which resolves when the mob(bom) left the field
         */

    }, {
        key: 'ballMoveAndLeaveOne',
        value: function ballMoveAndLeaveOne(dir) {

            var pos = this.ball.posAhead(dir);

            if (this.mobs.find(pos) == null) {

                this.ball.refuseToMove(dir);

                return null;
            }

            this.ball.move(dir);

            return this.leaveAtPos(pos);
        }

        /**
         * Make the mob at the ball leave the field.
         *
         * @return {Cell}
         */

    }, {
        key: 'leaveLastOneAtBall',
        value: function leaveLastOneAtBall() {

            return this.mobs.leave(this.ball.pos()).setLastOne();
        }

        /**
         * Make a mob at the specified position leave the field.
         *
         * @param {Object} pos The position
         * @return {Cell|Rx.Observable}
         */

    }, {
        key: 'leaveAtPos',
        value: function leaveAtPos(pos) {
            var _this2 = this;

            var mob = this.mobs.leave(pos);

            if (this.pmds.possible()) {

                return mob;
            }

            console.log('no more move!');

            if (this.pmds.cellRemainsAtBall()) {

                console.log('cell remains at ball');

                return [mob, (0, _spn.wait)(600).then(function () {
                    return _this2.leaveLastOneAtBall();
                })].toFlatStream();
            }

            console.log('no cell left');

            return mob.setLastOne();
        }
    }]);

    return BallMoveMobLeaveService;
}();

/**
 * Mobs is the role class which represents the collection of cells on and below the field.
 *
 * Mobs is the adaptor class of domain.level.FieldCells class into the BallMoveMobLeaveService context.
 */

exports.default = BallMoveMobLeaveService;

var Mobs = function () {

    /**
     * @constructor
     * @param {CellCollection} cells The collection of cells
     */

    function Mobs(cells) {
        _classCallCheck(this, Mobs);

        this.cells = cells;
    }

    /**
     * Check if the field is empty of cells.
     *
     * @return {Boolean}
     */

    _createClass(Mobs, [{
        key: 'isEmpty',
        value: function isEmpty() {

            return this.cells.isEmpty();
        }

        /**
         * Makes the cell at the position leave the field.
         *
         * @param {Object} pos The position
         */

    }, {
        key: 'leave',
        value: function leave(pos) {

            var w = this.cells.select(pos);

            this.cells.remove(w);

            w = w[0];

            this.cells.selectRange(pos).forEach(function (cell) {
                return cell.up();
            });

            return w;
        }

        /**
         * Finds the cell at the position.
         *
         * @param {Object} pos The position
         */

    }, {
        key: 'find',
        value: function find(pos) {

            return this.cells.find(pos);
        }
    }]);

    return Mobs;
}();

},{"./possible-move-detection-service":48,"spn":14}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

var TRANS_DUR = 150;
var MAX = 3;
var CENTER_M = 1;
var CENTER_N = 1;

/**
 * Ball class represents the ball inside the field of the level.
 *
 * @class
 */
var Ball = (_dec = component('ball'), _dec(_class = function (_GridWalker) {
    _inherits(Ball, _GridWalker);

    function Ball(elem) {
        _classCallCheck(this, Ball);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this, elem));

        _this.maxX = MAX;
        _this.maxY = MAX;

        _this.setGrid(elem.data('grid'), CENTER_M, CENTER_N);
        _this.setTransitionDuration(TRANS_DUR);

        return _this;
    }

    _createClass(Ball, [{
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('ball-appear', TRANS_DUR);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('ball-disappear', TRANS_DUR);
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
}(_spn.GridWalker)) || _class);
exports.default = Ball;

},{"spn":14}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _FieldIndexGenerator = require('../../util/FieldIndexGenerator');

var _FieldIndexGenerator2 = _interopRequireDefault(_FieldIndexGenerator);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _$$cc = $.cc;
var component = _$$cc.component;
var Coelement = _$$cc.Coelement;

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */

var CellCollection = (_dec = component('cell-collection'), _dec(_class = function (_Coelement) {
    _inherits(CellCollection, _Coelement);

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */

    function CellCollection(elem) {
        _classCallCheck(this, CellCollection);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CellCollection).call(this, elem));

        _this.cells = [];

        return _this;
    }

    /**
     * @param {Grid} grid
     */

    _createClass(CellCollection, [{
        key: 'setGrid',
        value: function setGrid(grid) {

            this.grid = grid;

            return this;
        }

        /**
         * Create a cell from a bom object.
         *
         * @param {Object} obj The bom object
         * @return {Cell}
         */

    }, {
        key: 'createCellFromObject',
        value: function createCellFromObject(obj) {

            return $('<object />', {
                data: { gene: obj.gene },
                prependTo: this.elem
            }).cc.init('cell');
        }

        /**
         * Checks if the field is empty.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isEmpty',
        value: function isEmpty() {

            return this.cells.length === 0;
        }

        /**
         * Loads field cells from object list.
         *
         * @param {Array} list The list of cells (Object)
         * @return {CellCollection}
         */

    }, {
        key: 'loadFromObjectList',
        value: function loadFromObjectList(list) {
            var _this2 = this;

            return this.loadList(list.map(function (obj) {
                return _this2.createCellFromObject(obj);
            }));
        }

        /**
         * Loads field cells from cell list.
         *
         * @param {Array<Cell>}
         */

    }, {
        key: 'loadList',
        value: function loadList(list) {
            var _this3 = this;

            var indices = new _FieldIndexGenerator2.default().generate(list.length, this.usedIndices());

            list.forEach(function (cell, i) {

                var nm = indices[i];

                cell.setGrid(_this3.grid, nm[1], nm[0]);
                cell.unsetLastOne();

                _this3.cells.push(cell);
            });
        }

        /**
         * Processes the stream of released cells from the exit queue.
         *
         * @param {Rx.Observable<Cell[]>}
         * @return {Rx.Observable}
         */

    }, {
        key: 'processCellStream',
        value: function processCellStream(releasedCellStream) {
            var _this4 = this;

            return releasedCellStream.pipe(function (releasedCells) {

                _this4.loadList(releasedCells);

                return _this4.resetShapeAndLocate();
            });
        }

        /**
         * Appears all the cells
         *
         * @return {Promise} The promise which resolves with the last cell when it resolved
         */

    }, {
        key: 'appear',
        value: function appear() {

            return this.cells.map(function (cell, i) {
                return (0, _spn.wait)(i * 56).then(function () {
                    return cell.show();
                });
            }).pop();
        }

        /**
         * Reset the shapes of the cells and locate them.
         *
         * @return {Promise}
         */

    }, {
        key: 'resetShapeAndLocate',
        value: function resetShapeAndLocate() {

            return this.cells.map(function (cell, i) {
                return (0, _spn.wait)(i * 56).then(function () {
                    return cell.resetShapeAndLocate();
                });
            }).pop();
        }

        /**
         * Selects all the cells at the position.
         *
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
         *
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
         *
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
         *
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
         *
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
}(Coelement)) || _class);
exports.default = CellCollection;

},{"../../util/FieldIndexGenerator":69,"spn":14}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _spn = require('spn');

var _bomTable = require('../../domain/genetics/bom-table');

var _bomTable2 = _interopRequireDefault(_bomTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

var ALL_CELLS = [];
/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
var Cell = (_dec = component('cell'), _dec(_class = function (_GridWalker) {
    _inherits(Cell, _GridWalker);

    _createClass(Cell, [{
        key: 'cellRatioX',
        value: function cellRatioX() {
            return 0.65;
        }
    }, {
        key: 'cellRatioY',
        value: function cellRatioY() {
            return 0.65;
        }

        /**
         * @constructor
         * @param {String} gene The gene string
         * @param {String|HTMLElement} parent The parent dom
         */

    }]);

    function Cell(elem) {
        _classCallCheck(this, Cell);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).call(this, elem));

        _this.gene = elem.data('gene');

        _this.__isLastOne = false;
        _this.__isEvolved = false;

        ALL_CELLS.push(_this);

        return _this;
    }

    _createClass(Cell, [{
        key: 'setLastOne',

        /**
         * Sets the flag of the last one.
         *
         * @return {Cell}
         */
        value: function setLastOne() {

            this.__isLastOne = true;

            return this;
        }

        /**
         * Unsets the flag of the last one.
         *
         * @return {Cell}
         */

    }, {
        key: 'unsetLastOne',
        value: function unsetLastOne() {

            this.__isLastOne = false;

            return this;
        }

        /**
         * Returns true if it's the last one of the round.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isLastOne',
        value: function isLastOne() {

            return this.__isLastOne;
        }

        /**
         * Sets the flag of being evolved from the parents.
         */

    }, {
        key: 'setEvolved',
        value: function setEvolved() {

            this.__evolved = true;

            return this;
        }

        /**
         * Unsets the flag of being evolved.
         */

    }, {
        key: 'unsetEvolved',
        value: function unsetEvolved() {

            this.__evolved = false;

            return this;
        }

        /**
         * Returns true if it's evolved from its parents, otherwise false.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isEvolved',
        value: function isEvolved() {

            return this.__evolved;
        }

        /**
         * Chooses the image for the gene.
         *
         * @private
         * @return {String}
         */

    }, {
        key: 'selectImage',
        value: function selectImage() {

            if (this.gene === 'f') {

                return 'img/neef.svg';
            }

            if (this.gene === 'm') {

                return 'img/nim.svg';
            }

            if (this.gene === 'a') {

                return 'img/ankh.svg';
            }

            if (this.gene === 'w') {

                return 'img/wheel.svg';
            }

            if (this.gene === 'b') {

                return 'img/box.svg';
            }

            var cellKind = _bomTable2.default[this.gene.length];

            return 'img/' + cellKind + '.svg';
        }

        /**
         * Creates the dom for this
         *
         * @return {jQuery}
         */

    }, {
        key: 'willShow',
        value: function willShow() {
            var _this2 = this;

            return _get(Object.getPrototypeOf(Cell.prototype), 'willShow', this).call(this).then(function () {

                _this2.elem.attr('data', _this2.selectImage());

                _this2.setTransitionDuration(300);

                return _this2.elem.once('load');
            }).then(function () {

                _this2.fitToGrid();

                var genes = _this2.gene.split('');

                var $svg = $(_this2.elem[0].contentDocument);

                for (var i = 0; i < genes.length; i++) {

                    $('#' + i, $svg).attr('class', genes[i]);
                }
            });
        }

        /**
         * Reset the shape of the cell.
         *
         * For example, change the size of the dom.
         */

    }, {
        key: 'resetShapeAndLocate',
        value: function resetShapeAndLocate() {

            return this.fitToGrid();
        }
    }, {
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('bom-appear', 500);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('bom-disappear', 500);
        }
    }, {
        key: 'remove',
        value: function remove() {

            this.elem.remove();

            ALL_CELLS.splice(ALL_CELLS.indexOf(this), 1);
        }

        /**
         * Animates the cell using the give css animation with the given duration.
         *
         * @param {string} animation
         * @param {number} duration
         */

    }, {
        key: 'anim',
        value: function anim(animation, duration) {

            return this.elem.anim(animation, duration);
        }
    }, {
        key: 'up',
        value: function up() {

            return this.moveUpOnGrid();
        }
    }, {
        key: 'down',
        value: function down() {

            return this.moveDownOnGrid();
        }
    }, {
        key: 'left',
        value: function left() {

            return this.moveLeftOnGrid();
        }
    }, {
        key: 'right',
        value: function right() {

            return this.moveRightOnGrid();
        }
    }], [{
        key: 'disappear',
        value: function disappear() {

            return ALL_CELLS.map(function (cell, i) {
                return (0, _spn.wait)(40 * i).then(function () {
                    return cell.disappear();
                });
            }).pop();
        }
    }]);

    return Cell;
}(_spn.GridWalker)) || _class);
exports.default = Cell;

},{"../../domain/genetics/bom-table":28,"spn":14}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class;

var _charSprite = require('../../ui/sprite/char-sprite');

var _charSprite2 = _interopRequireDefault(_charSprite);

var _spn = require('spn');

var _speaker = require('../../ui/sprite/speaker');

var _speaker2 = _interopRequireDefault(_speaker);

var _traitsDecorator = require('traits-decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * The main character on the level scene.
 */

var Character = (_dec = (0, _traitsDecorator.traits)(_speaker2.default), _dec2 = (0, _traitsDecorator.traits)(_charSprite2.default), _dec3 = component('character-on-level'), _dec(_class = _dec2(_class = _dec3(_class = function (_GridWalker) {
    _inherits(Character, _GridWalker);

    function Character(elem) {
        _classCallCheck(this, Character);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Character).call(this, elem));

        _this.elem.addClass('hero');

        _this.initSprite();
        return _this;
    }

    _createClass(Character, [{
        key: 'ratioX',
        value: function ratioX() {
            return 0.5;
        }
    }, {
        key: 'ratioY',
        value: function ratioY() {
            return 1;
        }

        /**
         * @param {number} dur The duration
         */

    }, {
        key: 'willShow',
        value: function willShow(dur) {

            this.elem.css('display', 'inline');
            this.updateSprite();

            return _get(Object.getPrototypeOf(Character.prototype), 'willShow', this).call(this, dur);
        }

        /**
         * @param {number} dur The duration
         */

    }, {
        key: 'didHide',
        value: function didHide(dur) {

            this.elem.css('display', 'none');

            return _get(Object.getPrototypeOf(Character.prototype), 'didHide', this).call(this, dur);
        }

        /**
         * Moves a unit upward along the grid.
         *
         * @return {Promise}
         */

    }, {
        key: 'moveUpOnGrid',
        value: function moveUpOnGrid() {

            this.turn('up');

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

            this.turn('right');

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

            this.turn('down');

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

            this.turn('left');

            return _get(Object.getPrototypeOf(Character.prototype), 'moveLeftOnGrid', this).call(this);
        }
    }]);

    return Character;
}(_spn.GridWalker)) || _class) || _class) || _class);
exports.default = Character;

},{"../../ui/sprite/char-sprite":63,"../../ui/sprite/speaker":66,"spn":14,"traits-decorator":25}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ExitQueue class represents the exit queue at the level view.
 */

var ExitQueue = function () {

    /**
     * @param {Grid} grid The grid
     */

    function ExitQueue(grid) {
        _classCallCheck(this, ExitQueue);

        this.grid = grid;
        this.queue = [];
    }

    /**
     * Processes the new cell stream and returns a stream of arrays of exiting cells.
     *
     * @param {Rx.Observable<Cell>} newCellStream The stream of the new cells
     * @return {Rx.Observable<Cell[]>}
     */

    _createClass(ExitQueue, [{
        key: 'processNewCellStream',
        value: function processNewCellStream(newCellStream) {
            var _this = this;

            return newCellStream.pipe(function (newCell) {
                return _this.enqueue(newCell).then(function () {
                    return newCell;
                });
            }).filter(function (newCell) {
                return newCell.isLastOne();
            }).map(function () {

                if (_this.theLastOneIsEvolved()) {

                    return _this.releaseCells();
                }

                // this finishes the stream
                return null;
            }).takeWhile(function (releasedCells) {
                return releasedCells != null;
            });
        }

        /**
         * Enqueues the cell.
         *
         * @param {Cell} cell The cell
         * @return {Promise} The promise resolves with the cell.
         */

    }, {
        key: 'enqueue',
        value: function enqueue(cell) {

            this.queue.push(new Queuee(cell, this.grid));

            return this.goForward();
        }

        /**
         * Release cells.
         *
         * @return {Array}
         */

    }, {
        key: 'releaseCells',
        value: function releaseCells() {

            return this.queue.splice(0).map(function (queuee) {
                return queuee.cell;
            });
        }

        /**
         * Makes the entire queue go forward.
         *
         * @private
         * @return {Promise}
         */

    }, {
        key: 'goForward',
        value: function goForward() {

            var d = 200 / this.queue.length;

            return this.queue.map(function (queuee, i) {
                return (0, _spn.wait)(i * d).then(function () {
                    return queuee.goForward();
                });
            }).pop();
        }

        /**
         * Checks if the queue is finished and has the last cell evolving.
         *
         * @return {Boolean}
         */

    }, {
        key: 'theLastOneIsEvolved',
        value: function theLastOneIsEvolved() {

            if (this.queue.length === 0) {

                return false;
            }

            var cell = this.queue[this.queue.length - 1].cell;

            return cell.isLastOne() && cell.isEvolved();
        }
    }]);

    return ExitQueue;
}();

/**
 * Queuee class is the role of the cell which is queued in the ExitQueue.
 */

exports.default = ExitQueue;

var Queuee = function () {
    /*
     * @constructor
     * @param {Cell} cell The queueing cell
     * @param {Grid} grid The grid
     */

    function Queuee(cell, grid) {
        _classCallCheck(this, Queuee);

        this.cell = cell;
        this.cell.setGrid(grid, -1, 0);
        this.cell.setTransitionDuration(500);
    }

    /**
     * Goes forward in the queue.
     */

    _createClass(Queuee, [{
        key: 'goForward',
        value: function goForward() {

            if (this.cell.m < 4) {

                this.cell.m += 1;
            } else {

                this.cell.n += 1;
            }

            return this.cell.updateElemOnGrid();
        }
    }]);

    return Queuee;
}();

},{"spn":14}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return new _spn.Animation('field-appear', 200);
    }
  }, {
    key: 'hideAnim',
    value: function hideAnim() {
      return new _spn.Animation('field-disappear', 400);
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
}(_spn.Body)) || _class);
exports.default = Field;

},{"spn":14}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _meioticService = require('../../domain/genetics/meiotic-service');

var _meioticService2 = _interopRequireDefault(_meioticService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var meiosis = new _meioticService2.default();
var getGene = function getGene(cell) {
    return cell ? cell.gene : '';
};
var _isLastOne = function _isLastOne(cell) {
    return cell ? cell.isLastOne() : false;
};

/**
 * FusionPair represents the pair of cells which perform the fusion of them.
 */

var FusionPair = function () {

    /**
     * @constructor
     * @param {Cell} left The left cell
     * @param {Cell} right The right cell
     */

    function FusionPair(left, right) {
        _classCallCheck(this, FusionPair);

        this.left = left;
        this.right = right;

        this.__newGene__ = meiosis.recombination(this.leftGene(), this.rightGene());
    }

    /**
     * Creates a new gene from the pair of cells
     *
     * @param {String} x The first gene
     * @param {String} y The second gene
     * @returns {String} The new gene
     */

    _createClass(FusionPair, [{
        key: 'newGene',
        value: function newGene() {

            return this.__newGene__;
        }

        /**
         * Checks if the pair is evolving.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isEvolving',
        value: function isEvolving() {

            var prevLength = Math.max(meiosis.virtualLength(this.leftGene()), meiosis.virtualLength(this.rightGene()));
            var newLength = meiosis.virtualLength(this.newGene());

            return newLength > prevLength;
        }

        /**
         * Returns true if the pair is the last one of the round.
         *
         * @return {Boolean}
         */

    }, {
        key: 'isLastOne',
        value: function isLastOne() {

            return _isLastOne(this.left) || _isLastOne(this.right);
        }

        /**
         * Returns the left gene.
         *
         * @return {String}
         */

    }, {
        key: 'leftGene',
        value: function leftGene() {

            return getGene(this.left);
        }

        /**
         * Returns the right gene.
         *
         * @return {String}
         */

    }, {
        key: 'rightGene',
        value: function rightGene() {

            return getGene(this.right);
        }

        /**
         * Calculates the score of the pair.
         *
         * @return {Number} The score
         */

    }, {
        key: 'score',
        value: function score() {

            var length = meiosis.virtualLength(this.newGene());

            var s = Math.pow(length, 2) * 10;

            if (this.isLastOne()) {

                s *= 2;
            }

            return s;
        }
    }]);

    return FusionPair;
}();

exports.default = FusionPair;

},{"../../domain/genetics/meiotic-service":29}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fusionPair = require('./fusion-pair');

var _fusionPair2 = _interopRequireDefault(_fusionPair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FusionPreparationService takes cells in sequence and move them into the preparation position. After that it emits the list of cells for the actual fusion.
 *
 * @class
 */

var FusionPreparationService = function () {

    /**
     * @constructor
     * @param {Grid} grid The grid
     */

    function FusionPreparationService(grid) {
        _classCallCheck(this, FusionPreparationService);

        this.stack = new PreparationStack(grid);
    }

    /**
     * Processes the cell stream and returns the fusion pair stream.
     *
     * @param {Rx.Observable<Cell>} cellStream
     * @return {Rx.Observable<FunsionPair>}
     */

    _createClass(FusionPreparationService, [{
        key: 'processCellStream',
        value: function processCellStream(cellStream) {
            var _this = this;

            return cellStream.pipe(function (cell) {
                return _this.take(cell);
            }).filterNull();
        }

        /**
         * Takes cell into the fusion preparing position.
         *
         * @param {Cell} cell The cell
         * @return {Promise} {Promise<FusionPair>}
         */

    }, {
        key: 'take',
        value: function take(cell) {

            this.stack.push(cell);

            if (!this.stack.isPrepared()) {

                return;
            }

            return Promise.all(this.stack.popAll()).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var left = _ref2[0];
                var right = _ref2[1];
                return new _fusionPair2.default(left, right);
            });
        }
    }]);

    return FusionPreparationService;
}();

/**
 * PreparationStack is the stack class of cells which are preparing for the fusion and going to the preparing position.
 */

exports.default = FusionPreparationService;

var PreparationStack = function () {

    /**
     * @constructor
     * @param {Grid} grid The grid
     */

    function PreparationStack(grid) {
        _classCallCheck(this, PreparationStack);

        this.grid = grid;
        this.stack = [];
        this.isFinished = false;
        this.takeDur = 700; // The duration of going to fusion preparation position.
    }

    /**
     * Pushes to the stack.
     *
     * @param {Cell} cell The cell
     */

    _createClass(PreparationStack, [{
        key: 'push',
        value: function push(cell) {

            this.isFinished = cell.isLastOne();

            this.stack.push(this.locate(cell, this.stack.length));
        }

        /**
         * locate the cell at the index.
         *
         * @param {Cell} cell The cell
         * @param {Number} index The index
         * @return {Promise<Cell>}
         */

    }, {
        key: 'locate',
        value: function locate(cell, index) {

            cell.setGrid(this.grid);

            cell.m = index;
            cell.n = 0;

            cell.setTransitionDuration(this.takeDur);

            return cell.fitToGrid().then(function () {
                return cell;
            });
        }
    }, {
        key: 'isPrepared',
        value: function isPrepared() {

            return this.isFinished || this.isFull();
        }
    }, {
        key: 'isFull',
        value: function isFull() {

            return this.stack.length >= 2;
        }

        /**
         * Pops all the cells.
         *
         * @return {Array<Promise<Cell>>}
         */

    }, {
        key: 'popAll',
        value: function popAll() {

            return this.stack.splice(0);
        }
    }]);

    return PreparationStack;
}();

},{"./fusion-pair":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * FusionService performs the fusion of the pair of cells.
 */

var FusionService = (_dec = component('fusion-service'), _dec(_class = function (_$$cc$Coelement) {
    _inherits(FusionService, _$$cc$Coelement);

    function FusionService() {
        _classCallCheck(this, FusionService);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FusionService).apply(this, arguments));
    }

    _createClass(FusionService, [{
        key: 'setGrid',

        /**
         * @param {Grid} grid The grid
         */
        value: function setGrid(grid) {

            this.grid = grid;

            return this;
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
            var _this2 = this;

            return fusionPairStream.pipe(function (fusionPair) {
                return _this2.performFusion(fusionPair);
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
            var _this3 = this;

            return this.getToReactor(pair).then(function () {
                return _this3.fusion(pair);
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
         *
         * @private
         * @param {FusionPair} pair The pair
         * @return {Promise} The new cell {Promise<Cell>}
         */

    }, {
        key: 'fusion',
        value: function fusion(pair) {

            var dur = 600;

            var cell = $('<object />', {

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
}($.cc.Coelement)) || _class);
exports.default = FusionService;

},{}],45:[function(require,module,exports){
'use strict';

require('./ball');

require('./cell-collection');

require('./character');

require('./field');

require('./fusion-service');

require('./paper');

require('./result-pane');

require('./scoreboard');

require('./swipe-field');

require('./moo');

},{"./ball":36,"./cell-collection":37,"./character":39,"./field":41,"./fusion-service":44,"./moo":46,"./paper":47,"./result-pane":50,"./scoreboard":51,"./swipe-field":52}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _resident = require('./resident');

var _resident2 = _interopRequireDefault(_resident);

var _ = require('../../');

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;
var Moo = (_dec = component('moo'), _dec(_class = function (_Resident) {
    _inherits(Moo, _Resident);

    function Moo() {
        _classCallCheck(this, Moo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Moo).apply(this, arguments));
    }

    _createClass(Moo, [{
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('bom-appear', 400);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('bom-disappear', 400);
        }
    }, {
        key: 'willHide',
        value: function willHide() {

            this.elem.css('opacity', 0);
        }
    }, {
        key: 'image',
        value: function image() {

            return _.BASE_PATH + 'img/moo.svg';
        }
    }]);

    return Moo;
}(_resident2.default)) || _class);
exports.default = Moo;

},{"../../":34,"./resident":49,"spn":14}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class;

var _spn = require('spn');

var _staticSprite = require('../../ui/sprite/static-sprite');

var _staticSprite2 = _interopRequireDefault(_staticSprite);

var _traitsDecorator = require('traits-decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 */

var Paper = (_dec = component('paper'), _dec2 = (0, _traitsDecorator.traits)(_staticSprite2.default), _dec(_class = _dec2(_class = function (_GridWalker) {
    _inherits(Paper, _GridWalker);

    function Paper(elem) {
        _classCallCheck(this, Paper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).call(this, elem));

        _this.initSprite();
        return _this;
    }

    _createClass(Paper, [{
        key: 'willShow',
        value: function willShow() {
            this.updateSprite();

            return _get(Object.getPrototypeOf(Paper.prototype), 'willShow', this).call(this);
        }
    }, {
        key: 'width',
        value: function width() {
            return 50;
        }
    }, {
        key: 'height',
        value: function height() {
            return 50;
        }
    }, {
        key: 'ratioX',
        value: function ratioX() {
            return 0.5;
        }
    }, {
        key: 'ratioY',
        value: function ratioY() {
            return 1;
        }
    }, {
        key: 'image',
        value: function image() {
            return 'img/paper.svg';
        }
    }, {
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('paper-appear', 500);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('paper-disappear', 500);
        }
    }]);

    return Paper;
}(_spn.GridWalker)) || _class) || _class);
exports.default = Paper;

},{"../../ui/sprite/static-sprite":68,"spn":14,"traits-decorator":25}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PossibleMoveDetectionService provides the functionality of detecting the possible moves in the play field.
 */

var PossibleMoveDetectionService = function () {

  /**
   * @constructor
   * @param {Ball} ball The ball
   * @param {CellCollection} cells The field cells
   */

  function PossibleMoveDetectionService(ball, cells) {
    _classCallCheck(this, PossibleMoveDetectionService);

    this.ball = ball;
    this.cells = cells;
  }

  /**
   * Check if there is any space left in the play field.
   *
   * @returns {Boolean} true if possible move available
   */

  _createClass(PossibleMoveDetectionService, [{
    key: 'possible',
    value: function possible() {

      // if any of the next cells has a bom, then the next move is possible.
      if (this.cells.find(this.ball.posAhead('up'))) {
        return true;
      }
      if (this.cells.find(this.ball.posAhead('down'))) {
        return true;
      }
      if (this.cells.find(this.ball.posAhead('left'))) {
        return true;
      }
      if (this.cells.find(this.ball.posAhead('right'))) {
        return true;
      }

      return false;
    }

    /**
     * Check if there is a cell at the position of the ball.
     *
     * @return {Boolean} true iff there is a cell at the ball
     */

  }, {
    key: 'cellRemainsAtBall',
    value: function cellRemainsAtBall() {

      return this.cells.find(this.ball.pos()) != null;
    }
  }]);

  return PossibleMoveDetectionService;
}();

exports.default = PossibleMoveDetectionService;

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class;

var _staticSprite = require('../../ui/sprite/static-sprite');

var _staticSprite2 = _interopRequireDefault(_staticSprite);

var _relativeBody = require('../../ui/sprite/relative-body');

var _relativeBody2 = _interopRequireDefault(_relativeBody);

var _speaker = require('../../ui/sprite/speaker');

var _speaker2 = _interopRequireDefault(_speaker);

var _traitsDecorator = require('traits-decorator');

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resident = (_dec = (0, _traitsDecorator.traits)(_relativeBody2.default), _dec2 = (0, _traitsDecorator.traits)(_staticSprite2.default), _dec3 = (0, _traitsDecorator.traits)(_speaker2.default), _dec(_class = _dec2(_class = _dec3(_class = function (_Body) {
    _inherits(Resident, _Body);

    _createClass(Resident, [{
        key: 'ratioX',
        value: function ratioX() {
            return 0.5;
        }
    }, {
        key: 'ratioY',
        value: function ratioY() {
            return 1;
        }
    }]);

    function Resident(elem) {
        _classCallCheck(this, Resident);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Resident).call(this, elem));

        _this.initSprite();

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
    }]);

    return Resident;
}(_spn.Body)) || _class) || _class) || _class);
exports.default = Resident;

},{"../../ui/sprite/relative-body":65,"../../ui/sprite/speaker":66,"../../ui/sprite/static-sprite":68,"spn":14,"traits-decorator":25}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _spn = require('spn');

var _domGen = require('dom-gen');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 *
 * @class
 */

var ResultPane = (_dec = component('result-pane'), _dec(_class = function (_Body) {
    _inherits(ResultPane, _Body);

    function ResultPane() {
        _classCallCheck(this, ResultPane);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultPane).apply(this, arguments));
    }

    _createClass(ResultPane, [{
        key: 'setScore',

        /**
         * Sets the score.
         *
         * @param {number} score The score to set
         */
        value: function setScore(score) {

            this.score = score;
        }

        /**
         * Sets the number of the stars.
         *
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

            this.elem.append((0, _domGen.div)({
                addClass: 'result-content',
                css: { opacity: 0, position: 'relative' }
            }, 'score = ' + this.score));

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
         *
         * @param {Number} timeout
         * @return {Promise}
         */

    }, {
        key: 'showInfoPane',
        value: function showInfoPane(timeout) {
            var _this3 = this;

            return this.elem.attr({ m: 9, n: 7 }).cc.init('multiflip').show().then(function () {
                return Promise.race([(0, _spn.wait)(timeout), _this3.elem.once('click touchstart')]);
            }).then(function () {
                return _this3.elem.cc.get('multiflip').hide();
            });
        }
    }]);

    return ResultPane;
}(_spn.Body)) || _class);
exports.default = ResultPane;

},{"dom-gen":2,"spn":14}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _spn = require('spn');

var _util = require('../../util/util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */

var Scoreboard = (_dec = component('scoreboard'), _dec(_class = function (_Body) {
    _inherits(Scoreboard, _Body);

    _createClass(Scoreboard, [{
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

    function Scoreboard(elem) {
        _classCallCheck(this, Scoreboard);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Scoreboard).call(this, elem));

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
    }, {
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('bom-appear', 400);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('bom-disappear', 400);
        }

        /**
         * Set up the initial dom state.
         */

    }, {
        key: 'willShow',
        value: function willShow() {

            _get(Object.getPrototypeOf(Scoreboard.prototype), 'willShow', this).call(this);

            this.elem.css('line-height', this.posture.actualHeight() + 'px');

            this.update();
        }

        /**
         * Updates the scoreboard's number.
         */

    }, {
        key: 'update',
        value: function update() {

            this.elem.text((0, _util.commaNumber)(this.score));
        }

        /**
         * Add the score to the total score.
         *
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
         *
         * @return {Number}
         */

    }, {
        key: 'getScore',
        value: function getScore() {

            return this.score;
        }
    }]);

    return Scoreboard;
}(_spn.Body)) || _class);
exports.default = Scoreboard;

},{"../../util/util":70,"spn":14}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _$$cc = $.cc;
var component = _$$cc.component;
var Coelement = _$$cc.Coelement;

/**
 * SwipeEvent class provides the stream of the swipe events.
 */

var SwipeField = (_dec = component('swipe-field'), _dec(_class = function (_Coelement) {
    _inherits(SwipeField, _Coelement);

    function SwipeField(elem) {
        _classCallCheck(this, SwipeField);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeField).call(this, elem));

        _this.elem.swipeCross();
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

        return _this;
    }

    return SwipeField;
}(Coelement)) || _class);
exports.default = SwipeField;

},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sceneContext = require('../scene-context');

var _sceneContext2 = _interopRequireDefault(_sceneContext);

require('./component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The common context for level scenes.
 */

var Context = function (_SceneContext) {
  _inherits(Context, _SceneContext);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Context).apply(this, arguments));
  }

  _createClass(Context, [{
    key: 'getField',

    /**
     * Gets the field grid.
     *
     * @return {Field}
     */
    value: function getField() {

      return this.get('field-grid');
    }

    /**
     * Gets the character.
     *
     * @return {Character}
     */

  }, {
    key: 'getCharacter',
    value: function getCharacter() {

      return this.get('character-on-level');
    }

    /**
     * Gets the ball
     *
     * @return {Ball}
     */

  }, {
    key: 'getBall',
    value: function getBall() {

      return this.get('ball');
    }

    /**
     * Gets the paper.
     *
     * @return {Paper}
     */

  }, {
    key: 'getPaper',
    value: function getPaper() {

      return this.get('paper');
    }

    /**
     * Gets the scoreboard.
     *
     * @return {ui.level.Scoreboard}
     */

  }, {
    key: 'getScoreboard',
    value: function getScoreboard() {

      return this.get('scoreboard');
    }

    /**
     * Gets the result pane.
     *
     * @return {ui.level.ResultPane}
     */

  }, {
    key: 'getResultPane',
    value: function getResultPane() {

      return this.get('result-pane');
    }

    /**
     * Gets the residents
     * @param {string} name The name of the residents
     */

  }, {
    key: 'residents',
    value: function residents(name) {

      return this.elem.find('.' + name).toArray().map(function (dom) {
        return $(dom).cc.get(name);
      });
    }
  }]);

  return Context;
}(_sceneContext2.default);

exports.default = Context;

},{"../scene-context":59,"./component":45}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class, _desc, _value, _class2;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _introSceneLayout = require('./layout/intro-scene-layout');

var _introSceneLayout2 = _interopRequireDefault(_introSceneLayout);

var _playSceneLayout = require('./layout/play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _backgroundService = require('../ui/common/background-service');

var _backgroundService2 = _interopRequireDefault(_backgroundService);

var _userRepository = require('../domain/user-repository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _characterRepository = require('../domain/character-repository');

var _characterRepository2 = _interopRequireDefault(_characterRepository);

require('../ui/manager/screenplay-manager');

var _ = require('../');

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _$$cc = $.cc;
var component = _$$cc.component;
var event = _$$cc.event;

/**
 * IntroScene class handles the introduction scene of the level page.
 */

var IntroScene = (_dec = component('intro-scene'), _dec2 = event('scene-start'), _dec(_class = (_class2 = function (_Context) {
    _inherits(IntroScene, _Context);

    function IntroScene() {
        _classCallCheck(this, IntroScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(IntroScene).apply(this, arguments));
    }

    _createClass(IntroScene, [{
        key: 'main',
        value: function main() {
            _get(Object.getPrototypeOf(IntroScene.prototype), 'main', this).call(this);
        }

        /**
         * Loads the data
         *
         * @protected
         * @return {Promise}
         */

    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            return this.loadUser().then(function () {
                return _this2.loadCharacter(_this2.user.charId);
            }).then(function () {
                return _this2.loadLevel(_this2.character.getFloorObjectId());
            }).then(function () {
                return _this2.loadLevelNext(_this2.character.getFloorObjectId());
            });
        }

        /**
         * Loads the user.
         * @return {Promise}
         */

    }, {
        key: 'loadUser',
        value: function loadUser() {
            var _this3 = this;

            return new _userRepository2.default().get().then(function (user) {
                return _this3.user = user;
            });
        }

        /**
         * Loads the character.
         * @param {string} id The id of the character
         * @return {Promise}
         */

    }, {
        key: 'loadCharacter',
        value: function loadCharacter(id) {
            var _this4 = this;

            return new _characterRepository2.default().getById(id).then(function (character) {
                return _this4.character = character;
            });
        }

        /**
         * Loads the level of the given id.
         * @deprecated
         * @param {string} id The id of the level
         * @return {Promise}
         */

    }, {
        key: 'loadLevel',
        value: function loadLevel(id) {
            var _this5 = this;

            return new datadomain.LevelRepository().getById(id).then(function (level) {
                return _this5.level = level;
            });
        }

        /**
         * Loads the level of the given id.
         * @param {string} id The id of the level
         * @return {Promise}
         */

    }, {
        key: 'loadLevelNext',
        value: function loadLevelNext(id) {
            var _this6 = this;

            return Promise.resolve($.get(this.getLevelDataUrl(id))).then(function (levelData) {

                $(levelData).appendTo(_this6.elem);
            });
        }

        /**
         * Gets the url of the level data.
         * @param {string} id The id of the level
         * @return {string}
         */

    }, {
        key: 'getLevelDataUrl',
        value: function getLevelDataUrl(id) {

            return _.BASE_PATH + 'data/level/' + id + '.html';
        }

        /**
         * Sets up the components.
         *
         * @protected
         * @return {Promise}
         */

    }, {
        key: 'setUp',
        value: function setUp() {

            $.cc.init();

            var layout = new _introSceneLayout2.default();

            this.spawnBall();
            this.spawnPaper();
            this.spawnCharacter(this.character);

            var centerGrid = layout.centerGrid();

            this.getPaper().setGrid(centerGrid, 0, 0);

            var character = this.getCharacter();

            character.setGrid(centerGrid, 0, 1);

            character.setTransitionDuration(500);

            character.fitToGrid();

            this.residents('moo').forEach(function (moo) {
                return moo.onSetParentRect(layout.main);
            });
        }

        /**
         * Starts the scene
         *
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this7 = this;

            this.getPaper().show();

            return _backgroundService2.default.turnWhite().then(function () {
                return _this7.getCharacter().moveUpOnGrid(600);
            }).then(function () {

                _this7.getPaper().disappear();

                return Promise.all(_this7.residents('moo').map(function (moo) {

                    return (0, _spn.wait)(Math.random() * 500).then(function () {
                        return moo.show();
                    });
                }));
            }).then(function () {

                /*
                const goals = $('<p />').text(this.level.goal.toString())
                 // the character read up the goals of the room
                return this.getCharacter().speak(goals, {cancelDom: '.wrapper'})
                */

                return _this7.get('screenplay-manager').play();
            }).then(function () {

                _this7.getCharacter().hide();

                return _this7.getBall().show();
            }).then(function () {
                return _this7.elem.trigger('main.play-scene');
            });
        }

        /**
         * Spawns the ball.
         *
         * @private
         */

    }, {
        key: 'spawnBall',
        value: function spawnBall() {

            var playSceneLayout = new _playSceneLayout2.default();

            $($('#tpl-ball').html()).css({ display: 'none' }).data({

                grid: playSceneLayout.playGrid(),
                pos: { m: 1, n: 1 }

            }).appendTo(this.elem).cc.init('ball');
        }

        /**
         * Spawns the paper.
         *
         * @private
         */

    }, {
        key: 'spawnPaper',
        value: function spawnPaper() {

            $('<img />').appendTo(this.elem).cc.init('paper');
        }

        /**
         * Spawns the character sprite.
         *
         * @private
         */

    }, {
        key: 'spawnCharacter',
        value: function spawnCharacter(character) {

            $('<img />').appendTo(this.elem).data({ character: character }).cc.init('character-on-level');
        }
    }]);

    return IntroScene;
}(_context2.default), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype)), _class2)) || _class);
exports.default = IntroScene;

},{"../":34,"../domain/character-repository":27,"../domain/user-repository":31,"../ui/common/background-service":60,"../ui/manager/screenplay-manager":62,"./context":53,"./layout/intro-scene-layout":55,"./layout/play-scene-layout":56,"spn":14}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BOTTOM_AD_SAFETY_HEIGHT = 50; // The ad safety zone
/**
 * The layout manager for intro scene
 */

var IntroSceneLayout = function (_LayoutFactory) {
    _inherits(IntroSceneLayout, _LayoutFactory);

    function IntroSceneLayout() {
        _classCallCheck(this, IntroSceneLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IntroSceneLayout).call(this));

        _this.main = _spn.Rect.windowAsRect().margin({
            bottom: BOTTOM_AD_SAFETY_HEIGHT
        }).getBestRect({
            horizontal: 2,
            vertical: 3
        });

        return _this;
    }

    /**
     * Returns the grid for the paper.
     *
     * @return {Grid}
     */

    _createClass(IntroSceneLayout, [{
        key: 'centerGrid',
        value: function centerGrid() {

            return this.main.shiftDown(0.21).toGrid().override({ cellWidth: 70, cellHeight: 70 });
        }

        /**
         * Returns the grid for residents.
         *
         * @return {Grid}
         */

    }, {
        key: 'residentGrid',
        value: function residentGrid() {

            return this.main.scaleRight(1 / 3).scaleBottom(1 / 2).toGrid();
        }
    }]);

    return IntroSceneLayout;
}(_spn.LayoutFactory);

exports.default = IntroSceneLayout;

},{"spn":14}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOP_UI_HEIGHT = 50; // The top ui component height
var BOTTOM_AD_SAFETY_HEIGHT = 50; // The ad safety zone
/**
 * The factory class of the dimensions of various object on level scene.
 *
 * @class
 */

var PlaySceneLayout = function (_LayoutFactory) {
    _inherits(PlaySceneLayout, _LayoutFactory);

    /**
     * @constructor
     */

    function PlaySceneLayout() {
        _classCallCheck(this, PlaySceneLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlaySceneLayout).call(this));

        _this.main = _spn.Rect.windowAsRect().margin({
            top: TOP_UI_HEIGHT,
            bottom: BOTTOM_AD_SAFETY_HEIGHT
        }).getBestRect({
            horizontal: 2,
            vertical: 3
        });

        // The unit rect on the left top corner.
        _this.unit = _this.main.scaleBottom(1 / 6).scaleRight(1 / 4);

        return _this;
    }

    _createClass(PlaySceneLayout, [{
        key: 'playGrid',
        value: function playGrid() {

            return this.unit.shiftRight(0.5).shiftDown(2).toGrid();
        }

        /**
         * Returns the dimension for the field.
         *
         * @return {Rect}
         */

    }, {
        key: 'fieldRect',
        value: function fieldRect() {

            return this.unit.shiftRight(0.5).shiftDown(2).scaleRight(3).scaleBottom(3);
        }

        /**
         * Returns the dimension for the evaluation room.
         *
         * @return {Grid}
         */

    }, {
        key: 'evalRoomGrid',
        value: function evalRoomGrid() {

            return this.unit.scaleBottom(1.7).scaleRight(2).shiftDown(0.4).toGrid();
        }

        /**
         * Returns the dimension for the exit queue. (The unit is a bit smaller.)
         *
         * @return {Grid}
         */

    }, {
        key: 'queueGrid',
        value: function queueGrid() {

            return this.unit.scaleBottom(0.5).scaleRight(0.5).shiftDown(0.5).shiftRight(3.5).toGrid();
        }

        /**
         * Returns the dimension for the fusion box.
         *
         * @return {Grid}
         */

    }, {
        key: 'fusionBoxGrid',
        value: function fusionBoxGrid() {

            return this.unit.scaleRight(0.5).scaleBottom(0.5).shiftDown(2.5).shiftRight(3.5).toGrid();
        }

        /**
         * Returns the dimension for the result pane.
         *
         * @return {Rect}
         */

    }, {
        key: 'resultPaneRect',
        value: function resultPaneRect() {

            return this.main.scaleTop(4.5 / 6).scaleBottom(4 / 4.5);
        }

        /**
         * Returns the dimension for the scoreboard.
         *
         * @return {Rect}
         */

    }, {
        key: 'scoreboardRect',
        value: function scoreboardRect() {

            return this.main.scaleRight(0.5).extCutTop(50);
        }
    }]);

    return PlaySceneLayout;
}(_spn.LayoutFactory);

exports.default = PlaySceneLayout;

},{"spn":14}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class, _desc, _value, _class2;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _playSceneLayout = require('./layout/play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _backgroundService = require('../ui/common/background-service');

var _backgroundService2 = _interopRequireDefault(_backgroundService);

var _cell = require('./component/cell');

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _$$cc = $.cc;
var component = _$$cc.component;
var event = _$$cc.event;

/**
 * OutroScene handles the scene after finishing main play.
 */

var OutroScene = (_dec = component('outro-scene'), _dec2 = event('play-scene-success play-scene-failure'), _dec(_class = (_class2 = function (_Context) {
    _inherits(OutroScene, _Context);

    function OutroScene() {
        _classCallCheck(this, OutroScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(OutroScene).apply(this, arguments));
    }

    _createClass(OutroScene, [{
        key: 'main',
        value: function main() {

            _get(Object.getPrototypeOf(OutroScene.prototype), 'main', this).call(this);
        }

        /**
         * Sets up the scene.
         *
         * @override
         */

    }, {
        key: 'setUp',
        value: function setUp() {

            var layout = new _playSceneLayout2.default();

            this.getResultPane().setRect(layout.resultPaneRect());
            this.getResultPane().setScore(this.getScoreboard().score);
        }

        /**
         * Starts the scene.
         *
         * @override
         */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            return this.getResultPane().show(30000000).then(function () {

                _cell2.default.disappear();

                _this2.getMenuButton().hide();

                _this2.getScoreboard().disappear();

                return _this2.getField().disappear();
            }).then(function () {
                return _this2.getBall().goCenterX();
            }).then(function () {
                return _this2.getBall().goCenterY();
            }).then(function () {
                return Promise.all([_this2.getCharacter().turn('down'), _this2.getCharacter().show(400), _this2.getBall().disappear()]);
            }).then(function () {
                return _this2.getCharacter().moveTo('y', 800, 1000);
            }).then(function () {
                return _backgroundService2.default.turnBlack();
            }).then(function () {
                return history.back();
            });
        }
    }]);

    return OutroScene;
}(_context2.default), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype)), _class2)) || _class);
exports.default = OutroScene;

},{"../ui/common/background-service":60,"./component/cell":38,"./context":53,"./layout/play-scene-layout":56}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _playSceneLayout = require('./layout/play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _spn = require('spn');

var _fusionPreparationService = require('./component/fusion-preparation-service');

var _fusionPreparationService2 = _interopRequireDefault(_fusionPreparationService);

var _ballMoveMobLeaveService = require('./component/ball-move-mob-leave-service');

var _ballMoveMobLeaveService2 = _interopRequireDefault(_ballMoveMobLeaveService);

var _exitQueue = require('./component/exit-queue');

var _exitQueue2 = _interopRequireDefault(_exitQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _$$cc = $.cc;
var component = _$$cc.component;
var event = _$$cc.event;
/**
 * PlayScene controlls the main playing scene of the level page.
 */

var PlayScene = (_dec = component('play-scene'), _dec2 = event('main.play-scene'), _dec3 = event('finish.play-scene'), _dec(_class = (_class2 = function (_Context) {
    _inherits(PlayScene, _Context);

    function PlayScene() {
        _classCallCheck(this, PlayScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayScene).apply(this, arguments));
    }

    _createClass(PlayScene, [{
        key: 'main',
        value: function main() {

            _get(Object.getPrototypeOf(PlayScene.prototype), 'main', this).call(this);
        }

        /**
         * Sets up the components.
         */

    }, {
        key: 'setUp',
        value: function setUp() {

            var layout = new _playSceneLayout2.default();

            this.character = this.getCharacter().character;
            this.level = this.getAtElem('intro-scene').level;

            // models
            this.cells = this.getAtElem('cell-collection');
            this.cells.setGrid(layout.playGrid());
            this.cells.loadFromObjectList(this.level.cells.cells);

            this.getField().setRect(layout.fieldRect());

            // services
            this.fps = new _fusionPreparationService2.default(layout.evalRoomGrid());
            this.fusionService = this.getAtElem('fusion-service').setGrid(layout.fusionBoxGrid());
            this.exitQueue = new _exitQueue2.default(layout.queueGrid());

            // ball move service
            this.bms = new _ballMoveMobLeaveService2.default(this.getBall(), this.cells);

            // init scoreboard dimension
            this.getScoreboard().setRect(layout.scoreboardRect());
        }

        /**
         * Records the stream of the directions.
         *
         * @param {Rx.Observable<String>} dirs
         */

    }, {
        key: 'recordDirStream',
        value: function recordDirStream(dirStream) {
            var _this2 = this;

            dirStream.forEach(function (dir) {

                _this2.character.playingState.add(dir);

                _this2.character.savePlayingState();
            });
        }

        /**
         * Hooks the playing state bump to the stream
         *
         * @param {Rx.Observable} stream The stream
         * @return {Rx.Observable}
         */

    }, {
        key: 'hookPlayingStateBumping',
        value: function hookPlayingStateBumping(stream) {
            var _this3 = this;

            return stream.filter(function () {

                _this3.character.playingState.bump();

                return true;
            });
        }

        /**
         * Binds event handlers to the stream.
         *
         * @param {Rx.Observable} dirStream The stream of directions
         * @return {Promise}
         */

    }, {
        key: 'playLoop',
        value: function playLoop(dirStream) {

            var cellStream = this.bms.processDirStream(dirStream);

            var fusionPairStream = this.fps.processCellStream(cellStream);

            fusionPairStream = this.getScoreboard().hookToFusionPairStream(fusionPairStream);

            var newCellStream = this.fusionService.processFusionPairStream(fusionPairStream);

            var releasedCellStream = this.exitQueue.processNewCellStream(newCellStream);

            releasedCellStream = this.hookPlayingStateBumping(releasedCellStream);

            return this.cells.processCellStream(releasedCellStream).getPromise();
        }

        /**
         * Replays the saved playing state.
         *
         * @return {Promise}
         */

    }, {
        key: 'replayRounds',
        value: function replayRounds() {
            var _this4 = this;

            return this.character.playingState.rounds.reduce(function (promise, round) {
                return promise.then(function () {
                    return _this4.playLoop(round.map(function (dir, i) {
                        return (0, _spn.wait)(i * 180, dir);
                    }).toFlatStream());
                });
            }, Promise.resolve());
        }

        /**
         * @return {Promise}
         */

    }, {
        key: 'userPlay',
        value: function userPlay() {

            var userDirStream = this.getUserSwipeStream();

            this.recordDirStream(userDirStream);

            return this.playLoop(userDirStream);
        }

        /**
         * Starts the scene.
         *
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this5 = this;

            this.getMenuButton().show();

            return this.getField().show().then(function () {
                return _this5.getCharacter().speechEndPromise;
            }).then(function () {
                return _this5.character.reloadPlayingState();
            }).then(function () {
                return Promise.all(_this5.residents('moo').map(function (moo) {
                    return moo.hide();
                }));
            }).then(function () {
                return _this5.cells.appear();
            }).then(function () {
                return _this5.getScoreboard().show();
            }).then(function () {
                return _this5.replayRounds();
            }).then(function () {
                return _this5.userPlay();
            }).then(function () {
                return _this5.removeSwipeField();
            }).then(function () {
                return _this5.elem.trigger('finish.play-scene');
            });
        }

        /**
         * Gets the stream of direction symbols from the user's swipe operation.
         *
         * @return {Rx.Observable}
         */

    }, {
        key: 'getUserSwipeStream',
        value: function getUserSwipeStream() {

            var field = $('.swipe-field');

            return Rx.Observable.merge(field.streamOf('swipeup').map('up'), field.streamOf('swipedown').map('down'), field.streamOf('swipeleft').map('left'), field.streamOf('swiperight').map('right'));
        }

        /**
         * Removes the swipe field.
         */

    }, {
        key: 'removeSwipeField',
        value: function removeSwipeField() {

            $('.swipe-field').remove();
        }

        /**
         * Ends the playing scene, clear playing data, and kicks the next scene.
         *
         * @param {Event} e The event object (unused)
         * @param {Boolean} playerWon True if the player won the game
         */

    }, {
        key: 'finish',
        value: function finish(e, playerWon) {

            this.character.clearPlayingState();

            this.elem.trigger(playerWon ? 'play-scene-success' : 'play-scene-failure');
        }
    }]);

    return PlayScene;
}(_context2.default), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'finish', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'finish'), _class2.prototype)), _class2)) || _class);
exports.default = PlayScene;

},{"./component/ball-move-mob-leave-service":35,"./component/exit-queue":40,"./component/fusion-preparation-service":43,"./context":53,"./layout/play-scene-layout":56,"spn":14}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Coelement = $.cc.Coelement;

/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 *
 * @abstract
 * @class
 */

var SceneContext = function (_Coelement) {
  _inherits(SceneContext, _Coelement);

  function SceneContext() {
    _classCallCheck(this, SceneContext);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SceneContext).apply(this, arguments));
  }

  _createClass(SceneContext, [{
    key: 'main',
    value: function main() {
      var _this2 = this;

      return Promise.resolve(this.load()).then(function () {
        return _this2.setUp();
      }).then(function () {
        return _this2.start();
      });
    }

    /**
     * Loads the data necessary for the scene.
     *
     * @abstract
     */

  }, {
    key: 'load',
    value: function load() {}

    /**
     * Sets up the services necessary for the scene.
     *
     * This must be a sync process.
     *
     * @abstract
     */

  }, {
    key: 'setUp',
    value: function setUp() {}

    /**
     * Starts the scene.
     *
     * @abstract
     */

  }, {
    key: 'start',
    value: function start() {}

    /**
     * Gets the class component of the given name inside the element.
     *
     * @param {string} className The class name of the component
     */

  }, {
    key: 'get',
    value: function get(className) {

      return this.elem.find('.' + className).cc.get(className);
    }

    /**
     * Gets the class component of the given name at the element.
     *
     * @param {string} className The class name of the component
     */

  }, {
    key: 'getAtElem',
    value: function getAtElem(className) {

      return this.elem.cc.get(className);
    }

    /**
     * Gets the class component of the given name at the given selector
     *
     * @param {string} selector The selector for searching
     * @param {string} className The class name of the component
     */

  }, {
    key: 'getGlobal',
    value: function getGlobal(selector, className) {

      return $(selector).cc.get(className);
    }

    /**
     * Gets the menu button.
     *
     * @return {ui.common.MenuButton}
     */

  }, {
    key: 'getMenuButton',
    value: function getMenuButton() {

      return this.getGlobal('.menu-button-root', 'menu-button');
    }
  }]);

  return SceneContext;
}(Coelement);

exports.default = SceneContext;

},{}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      return (0, _spn.wait)(dur);
    }
  }]);

  return BackgroundService;
}();

exports.default = BackgroundService;

},{"spn":14}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domGen = require('dom-gen');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Screenplay line represents a line of a screenplay.
 */

var ScreenplayLine = function () {

  /**
   * @param {string} selector The selector of the actor
   * @param {string} line The screenplay line
   */

  function ScreenplayLine(selector, line, context) {
    _classCallCheck(this, ScreenplayLine);

    this.selector = selector;
    this.line = line;
    this.context = context;
  }

  /**
   * Gets the actor of this line.
   */

  _createClass(ScreenplayLine, [{
    key: 'getActor',
    value: function getActor() {

      return $(this.selector, this.context).cc.getActor();
    }

    /**
     * Plays the role.
     */

  }, {
    key: 'play',
    value: function play() {

      return this.getActor().speak((0, _domGen.p)(this.line));
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

exports.default = ScreenplayLine;

},{"dom-gen":2}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _screenplayLine = require('./screenplay-line');

var _screenplayLine2 = _interopRequireDefault(_screenplayLine);

var _2 = require('../../');

var _scenarioscript = require('scenarioscript');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _$$cc = $.cc;
var event = _$$cc.event;
var component = _$$cc.component;
var Coelement = _$$cc.Coelement;

var emojiList = ['love'];

/**
 * ScreenplayManager
 */
var ScreenplayManager = (_dec = component('screenplay-manager'), _dec2 = event('screenplay-start'), _dec(_class = (_class2 = function (_Coelement) {
    _inherits(ScreenplayManager, _Coelement);

    function ScreenplayManager(elem) {
        _classCallCheck(this, ScreenplayManager);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScreenplayManager).call(this, elem));

        _this.context = elem.data('context');

        _this.lines = ScreenplayManager.parse(elem.text());
        _this.lines.forEach(function (line) {
            return line.context = _this.context;
        });
        return _this;
    }

    /**
     * Parses the screenplay DSL.
     * @private
     * @param {string} text The text of screenplay
     */

    _createClass(ScreenplayManager, [{
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
         * Plays the screenplay
         * @return {Promise}
         */

    }, {
        key: 'play',
        value: function play() {

            return this.lines.reduce(function (previous, line) {
                return previous.then(function () {
                    return line.play();
                });
            }, Promise.resolve());
        }

        /**
         * Renders the emoji simbols in the text to emoji tag.
         * @param {string} raw The raw text
         * @return {string}
         */

    }], [{
        key: 'parse',
        value: function parse(text) {

            return (0, _scenarioscript.parse)(text).map(function (line) {
                return new _screenplayLine2.default(line.role, line.message);
            });
        }
    }, {
        key: 'renderEmoji',
        value: function renderEmoji(raw) {
            return raw.replace(/:([_a-z]+):/g, ScreenplayManager.emojiToTag);
        }

        /**
         * Returns the html expression of the emoji.
         * @param {string} emoji The id of emoji symbol
         * @return {string}
         */

    }, {
        key: 'emojiToTag',
        value: function emojiToTag(_, emoji) {

            if (!/[amf]+/.test(emoji) && emojiList.indexOf(emoji) === -1) {

                console.log('unknown emoji', emoji);
                return ':' + emoji + ':';
            }

            return '<img class="emoji-' + emoji + '" src="' + _2.BASE_PATH + '/img/quatron.svg" style="width: 20px; height: 20px; vertical-align: middle;" />';
        }
    }]);

    return ScreenplayManager;
}(Coelement), (_applyDecoratedDescriptor(_class2.prototype, 'play', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'play'), _class2.prototype)), _class2)) || _class);
exports.default = ScreenplayManager;

},{"../../":34,"./screenplay-line":61,"scenarioscript":3}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _ma = require('./ma');

var _ma2 = _interopRequireDefault(_ma);

var _spn = require('spn');

var _traitsDecorator = require('traits-decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CHR_TABLE = {
    ma: _ma2.default
};

/**
 * CharSprite class handles 4-directional character sprite.
 *
 * Trant.
 */
var CharSprite = (_dec = (0, _traitsDecorator.traits)(_sprite2.default), _dec(_class = function () {
    function CharSprite() {
        _classCallCheck(this, CharSprite);
    }

    _createClass(CharSprite, [{
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
    }, {
        key: 'initSprite',
        value: function initSprite() {

            this.character = this.elem.data('character');

            CHR_TABLE[this.character.id].call(this);

            this.dirStateImage = new _spn.DirStateImageMap();

            this.dirStateImage.addImageByDirState(new _spn.Image(this.upImage()), 'up', 'default');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.downImage()), 'down', 'default');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.leftImage()), 'left', 'default');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.rightImage()), 'right', 'default');
        }

        /**
         * Changes the direction the character currently heading for.
         *
         * @param {string} dir The direction (one of up, down, left or right)
         */

    }, {
        key: 'turn',
        value: function turn(dir) {

            this.setDir(dir);
        }

        /**
         * Gets the direction to the target point.
         *
         * @param {string} coordinate 'x' or 'y'
         * @param {number} to The position
         */

    }, {
        key: 'getDirection',
        value: function getDirection(coordinate, to) {

            if (coordinate === 'x') {

                return to > this.x ? 'right' : 'left';
            }

            return to > this.y ? 'down' : 'up';
        }

        /**
         * Moves the sprite to the given position within the given duration.
         *
         * @param {string} coordinate 'x' or 'y'
         * @param {number} to The position to go
         * @param {number} dur The duration of movement in ms
         */

    }, {
        key: 'moveTo',
        value: function moveTo(coordinate, to, dur) {

            var dir = this.getDirection(coordinate, to);

            this.turn(dir);

            this.setTransitionDuration(dur);

            if (dir === 'up' || dir === 'down') {

                this.moveToY(to);
            } else {

                this.moveToX(to);
            }

            return (0, _spn.wait)(dur);
        }
    }]);

    return CharSprite;
}()) || _class);
exports.default = CharSprite;

},{"./ma":64,"./sprite":67,"spn":14,"traits-decorator":25}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

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
        return new _spn.Animation('char-appear', 1000);
    };
    this.hideAnim = function () {
        return new _spn.Animation('char-disappear', 1000);
    };
};

var _spn = require('spn');

},{"spn":14}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      this.posture.width = rect.width() * this.relW;
      this.posture.height = rect.width() * this.relH;
    }
  }]);

  return RelativeBody;
}();

exports.default = RelativeBody;

},{}],66:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screenplayManager = require('../manager/screenplay-manager');

var _screenplayManager2 = _interopRequireDefault(_screenplayManager);

var _spn = require('spn');

var _domGen = require('dom-gen');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: 'speak',

        /**
         * Speaks the phrase
         *
         * @param {string} speech The contents of the speech
         * @fires 'speech.started' when the speech started
         * @fires 'speech.ended' when the speech ended
         */
        value: function speak(speech) {
            var _this = this;

            this.elem.trigger('speech.started');

            // const cancelDom = this.elem.data('speech-ok') || this.elem
            var timeout = +this.elem.data('speech-timeout') || DEFAULT_SPEECH_TIMEOUT;

            var text = speech.text();

            text = _screenplayManager2.default.renderEmoji(text);

            var speech0 = (0, _domGen.p)(text);

            speech0.css('text-align', 'left');
            speech0.css('display', 'block');
            speech0.css('height', '0px');
            speech0.css('overflow', 'hidden');

            var speech1 = (0, _domGen.p)(text);

            speech1.css('text-align', 'left');
            speech1.css('display', 'inline');

            var wrapper = (0, _domGen.div)(speech0, speech1);

            var drop = new global.Drop({
                target: this.elem[0],
                content: wrapper.appendTo(document.body)[0],
                classes: 'drop-theme-arrows-bounce',
                position: 'top center',
                openOn: 'always'
            });

            return speech1.cc.up('puncher').trigger('puncher.start').once('puncher.ended').then(function () {
                return (0, _spn.wait)(timeout / 10);
            }).then(function () {
                return drop.close();
            }).then(function () {
                return (0, _spn.wait)(500);
            }).then(function () {
                return _this.elem.trigger('speech.ended');
            });
        }
    }]);

    return Speaker;
}();

exports.default = Speaker;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../manager/screenplay-manager":62,"dom-gen":2,"spn":14}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    value: function setDirState() {
      var dir = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      this.dir = dir || this.dir;
      this.state = state || this.state;

      this.updateElemByDirState();
    }

    /**
     * Updates the element by the dir and state.
     */

  }, {
    key: "updateElemByDirState",
    value: function updateElemByDirState() {

      this.dirStateImage.get(this.dir || this.defaultDir(), this.state || this.defaultState()).apply(this.elem);
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

exports.default = Sprite;

},{}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _traitsDecorator = require('traits-decorator');

var _spn = require('spn');

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The sprite class which has only one image.
 *
 * Trait.
 */
var StaticSprite = (_dec = (0, _traitsDecorator.traits)(_sprite2.default), _dec(_class = function () {
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

      this.dirStateImage = new _spn.DirStateImageMap();
      this.dirStateImage.addImageByDirState(new _spn.Image(this.image()), 'down', 'default');
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
exports.default = StaticSprite;

},{"./sprite":67,"spn":14,"traits-decorator":25}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.default = FieldIndexGenerator;

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

},{}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Load image and returns promise which resolves when the image loaded.
 */
var loadImage = exports.loadImage = function loadImage(path, cls, dom) {
  return new Promise(function (resolve) {

    var $img = $('<img />').attr('src', path).addClass(cls).appendTo(dom).on('load', function () {
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
var commaNumber = exports.commaNumber = function commaNumber(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

/**
 * Chains elements of the array as promise chain using the promise generating function.
 *
 * @param {Array} array The array
 * @param {Function} createPromise The function for creating promise
 */
var chainPromise = exports.chainPromise = function chainPromise(array, createPromise) {
  return array.reduce(function (promise, item) {
    return promise.then(function () {
      return createPromise(item);
    });
  }, Promise.resolve());
};

},{}]},{},[26]);
