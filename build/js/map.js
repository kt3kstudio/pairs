(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}],2:[function(require,module,exports){
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
},{"./if-num-else":10,"./reflow":17,"./wait":20}],3:[function(require,module,exports){
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

var Being = function (_$$cc$Coelement) {
  _inherits(Being, _$$cc$Coelement);

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
}($.cc.Coelement);

exports.default = Being;
},{}],4:[function(require,module,exports){
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
},{"./being":3,"./posture":15,"./reflow":17,"./wait":20}],5:[function(require,module,exports){
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
},{"./sprite":18}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{"./body":4}],9:[function(require,module,exports){
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
},{"./if-num-else":10,"./rect":16}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{"./animation":2,"./being":3,"./body":4,"./char-sprite":5,"./dir-state-image-map":6,"./dirs":7,"./grid":9,"./grid-walker":8,"./if-num-else":10,"./image":11,"./layout-factory":14,"./posture":15,"./rect":16,"./reflow":17,"./sprite":18,"./static-sprite":19,"./wait":20}],13:[function(require,module,exports){
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
},{"./rect":16}],14:[function(require,module,exports){
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
},{"./grid":9,"./rect":16}],15:[function(require,module,exports){
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
},{"./if-num-else":10,"./rect":16}],16:[function(require,module,exports){
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
},{"./grid":9,"./if-num-else":10,"./interval":13}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{"./grid-walker":8}],19:[function(require,module,exports){
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
},{"./sprite":18}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
'use strict';

require('../../src/floor/floor-scene');

},{"../../src/floor/floor-scene":37}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./user":27,"./user-statistics":26}],25:[function(require,module,exports){
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

},{"./user-factory":24}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _spn = require('spn');

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
 * Camera handles the screen position.
 */

var Camera = (_dec = component('camera'), _dec2 = event('character-focus'), _dec3 = event('character-move'), _dec(_class = (_class2 = function (_$$cc$Coelement) {
    _inherits(Camera, _$$cc$Coelement);

    function Camera() {
        _classCallCheck(this, Camera);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Camera).apply(this, arguments));
    }

    _createClass(Camera, [{
        key: 'getWindowWidth',

        /**
         * Gets the window width.
         *
         * @return {Number}
         */
        value: function getWindowWidth() {

            return $(window).width();
        }

        /**
         * Sets up the initial position
         */

    }, {
        key: 'setUp',
        value: function setUp() {

            this.scrollSet($('.floor-asset-collection').cc.get('floor-asset-collection').findById($('.floor-walker').cc.get('floor-walker').getPosition().floorObjectId).centerX());
        }

        /**
         * Moves the camera to the given position if the position isn't visible.
         *
         * @param {$.Event} e The event object
         * @param {Number} x The horizontal position
         */

    }, {
        key: 'focusToX',
        value: function focusToX(e, x) {

            if (!this.visible(x)) {
                this.scrollSet(x);
            }
        }

        /**
         * Sets the horizontal scroll position
         */

    }, {
        key: 'scrollSet',
        value: function scrollSet(x) {

            this.elem.scrollLeft(x - this.getWindowWidth() / 2);
        }

        /**
         * Scrolls the camera focus to the given x in given duration.
         *
         * @param {Event} e The event object (unused)
         * @param {Number} x The x coordinate
         * @param {Number} dur The duration
         * @return {Promise}
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo(e, x, dur) {

            this.elem.animate({ scrollLeft: x - this.getWindowWidth() / 2 }, dur);

            return (0, _spn.wait)(dur);
        }

        /**
         * Check if the character is visible on the screen.
         *
         * @param {Number} x The focus position
         * @returns {Boolean}
         */

    }, {
        key: 'visible',
        value: function visible(x) {

            return x > this.elem.scrollLeft() && x < this.elem.scrollLeft() + this.getWindowWidth();
        }
    }]);

    return Camera;
}($.cc.Coelement), (_applyDecoratedDescriptor(_class2.prototype, 'focusToX', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'focusToX'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'scrollTo', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'scrollTo'), _class2.prototype)), _class2)) || _class);
exports.default = Camera;

},{"spn":12}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _templateObject = _taggedTemplateLiteral(['♛ Best ♛'], ['♛ Best ♛']),
    _templateObject2 = _taggedTemplateLiteral(['▶'], ['▶']);

var _spn = require('spn');

var _domGen = require('dom-gen');

var _domGen2 = _interopRequireDefault(_domGen);

var _floorAsset = require('./floor-asset');

var _floorAsset2 = _interopRequireDefault(_floorAsset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var button = (0, _domGen2.default)('button');

var component = $.cc.component;

var DOOR_APPEAR_DUR = 400;

/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
var Door = (_dec = component('door'), _dec(_class = function (_FloorAsset) {
    _inherits(Door, _FloorAsset);

    _createClass(Door, [{
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('door-appear', DOOR_APPEAR_DUR);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('door-disappear', DOOR_APPEAR_DUR);
        }

        /**
         * @constructor
         */

    }]);

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

            this.elem.css('opcaity', 0).append((0, _domGen.div)({ addClass: 'door-body' }, (0, _domGen.div)({ addClass: 'door-front' }, this.id), (0, _domGen.div)({ addClass: 'doorknob' }, '●')), (0, _domGen.div)({
                addClass: 'door-info multiflip',
                attr: { m: 3, n: 5, bgcolor: '#393F44' },
                css: {
                    width: '150px',
                    height: '150px',
                    top: '-200px',
                    left: '-40px'
                }
            }, (0, _domGen.div)({ addClass: 'door-info-content' }, (0, _domGen.p)(this.id), (0, _domGen.hr)(), (0, _domGen.p)((0, _domGen.small)(_templateObject), (0, _domGen.br)(), this.score), (0, _domGen.hr)(), button(_templateObject2).click(function (event) {

                event.preventDefault();
                $(this).trigger('goToLevel');
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

            return (0, _spn.wait)(this.doorActionDur);
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

            return (0, _spn.wait)(this.doorActionDur);
        }

        /**
         * Unlocks the door.
         */

    }, {
        key: 'unlocks',
        value: function unlocks() {

            this.locked = false;

            this.enableDoorKnock();

            this.removeFrog();
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
}(_floorAsset2.default)) || _class);
exports.default = Door;

},{"./floor-asset":31,"dom-gen":1,"spn":12}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _spn = require('spn');

var _floorboard = require('./floorboard');

var _floorboard2 = _interopRequireDefault(_floorboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * FloorAssetCollection class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * Collective Component
 */

var FloorAssetCollection = (_dec = component('floor-asset-collection'), _dec(_class = function (_Being) {
    _inherits(FloorAssetCollection, _Being);

    function FloorAssetCollection() {
        _classCallCheck(this, FloorAssetCollection);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FloorAssetCollection).apply(this, arguments));
    }

    _createClass(FloorAssetCollection, [{
        key: 'loadAssetsFromData',

        /**
         * Loads assets from the given string html data.
         *
         * @param {String} data The data
         */
        value: function loadAssetsFromData(data) {

            // prepend loaded (string) data to the elem
            $(data).prependTo(this.elem);

            // set y coordinate to doors and staircases
            this.elem.find('.door, .staircase').attr('y', _floorboard2.default.groundLevel());

            // init floor assets
            $.cc.init('door staircase', this.elem);

            // collect staircases
            this.staircases = this.elem.find('.staircase .door').map(function () {

                return $(this).cc.get('staircase');
            }).toArray();

            // collect doors
            this.doors = this.elem.find('.door').map(function () {

                return $(this).cc.get('door');
            }).toArray();

            this.items = [].concat(this.staircases, this.doors);

            // set floor width
            this.elem.width(this.elem.find('.floor-data').data('floor-width'));
        }

        /**
         * Update the floor assets by the level locks and level histories.
         *
         * @param {datadomain.LevelLockCollection} locks The level locks
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
         * Shows the floor assets.
         *
         * @override
         */

    }, {
        key: 'willShow',
        value: function willShow() {

            return this.foldByFunc(function (item) {

                item.show();

                return (0, _spn.wait)(100);
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

            return this.foldByFunc(function (item) {

                item.disappear();

                return (0, _spn.wait)(100);
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
    }]);

    return FloorAssetCollection;
}(_spn.Being)) || _class);
exports.default = FloorAssetCollection;

},{"./floorboard":33,"spn":12}],31:[function(require,module,exports){
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

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */

var FloorAsset = function (_Body) {
  _inherits(FloorAsset, _Body);

  _createClass(FloorAsset, [{
    key: 'width',

    /**
     * @override
     */
    value: function width() {
      return 80;
    }

    /**
     * @override
     */

  }, {
    key: 'height',
    value: function height() {
      return 100;
    }

    /**
     * @override
     */

  }, {
    key: 'ratioX',
    value: function ratioX() {
      return 0.5;
    }

    /**
     * @override
     */

  }, {
    key: 'ratioY',
    value: function ratioY() {
      return 1;
    }
  }]);

  function FloorAsset(elem) {
    _classCallCheck(this, FloorAsset);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloorAsset).call(this, elem));

    _this.x = +_this.elem.attr('x');
    _this.y = +_this.elem.attr('y');

    _this.id = _this.elem.attr('id');

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

      frog.setGrid(new _spn.Grid({ x: 35, y: 130, unitWidth: 100, unitHeight: 100 }));

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
  }]);

  return FloorAsset;
}(_spn.Body);

exports.default = FloorAsset;

},{"spn":12}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

var _charSprite = require('../../ui/sprite/char-sprite');

var _charSprite2 = _interopRequireDefault(_charSprite);

var _characterRepository = require('../../domain/character-repository');

var _characterRepository2 = _interopRequireDefault(_characterRepository);

var _traitsDecorator = require('traits-decorator');

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
 * FloorWalker is the role of CharSprite which handles the behaviours of the character on the floor.
 *
 * Service Component
 */

var FloorWalker = (_dec = (0, _traitsDecorator.traits)(_charSprite2.default), _dec2 = component('floor-walker'), _dec3 = event('door-knock'), _dec4 = event('character-goto'), _dec(_class = _dec2(_class = (_class2 = function (_Body) {
    _inherits(FloorWalker, _Body);

    function FloorWalker(elem) {
        _classCallCheck(this, FloorWalker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FloorWalker).call(this, elem));

        _this.initSprite();

        _this.characterRepository = new _characterRepository2.default();

        return _this;
    }

    _createClass(FloorWalker, [{
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

            this.x = floorAsset.x;
            this.y = floorAsset.y;

            return floorAsset.open().then(function () {

                _this2.turn('down');

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
         *
         * @param {Event} e The event object
         */

    }, {
        key: 'characterGoto',
        value: function characterGoto(e) {
            var _this3 = this;

            this.character.position.floorId = e.goto.floorId;
            this.character.position.floorObjectId = e.goto.floorObjectId;

            this.saveCharacter().then(function () {
                return _this3.elem.trigger('sceneReload');
            });
        }

        /**
         * Gets the character's position.
         *
         * @return {datadomain.CharPosition}
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

            this.saveCharacter();
        }

        /**
         * Saves the character data.
         */

    }, {
        key: 'saveCharacter',
        value: function saveCharacter() {

            return this.characterRepository.save(this.character);
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

            var current = this.current;

            this.setFloorObjectId(floorAsset.id);

            var goOutDur = 220;
            var moveOnCorridor = 300;
            var goIntoDur = goOutDur;

            var goOutDistance = 80;

            this.elem.trigger('character-focus', [current.x]);

            current.close();

            return this.moveTo('y', current.y + goOutDistance, goOutDur).then(function () {

                _this4.elem.trigger('character-move', [floorAsset.x, moveOnCorridor]);

                floorAsset.open();

                return _this4.moveTo('x', floorAsset.x, moveOnCorridor);
            }).then(function () {
                return _this4.moveTo('y', floorAsset.y, goIntoDur);
            }).then(function () {

                _this4.current = floorAsset;

                floorAsset.onGetWalker(_this4);

                return _this4.turn('down');
            });
        }

        /**
         * Gets the character into the door.
         */

    }, {
        key: 'getIntoDoor',
        value: function getIntoDoor() {
            var _this5 = this;

            this.turn('up');

            return this.disappear().then(function () {
                return _this5.current.close();
            });
        }
    }]);

    return FloorWalker;
}(_spn.Body), (_applyDecoratedDescriptor(_class2.prototype, 'doorKnock', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'doorKnock'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'characterGoto', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'characterGoto'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = FloorWalker;

},{"../../domain/character-repository":23,"../../ui/sprite/char-sprite":40,"spn":12,"traits-decorator":21}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

var FLOORBOARD_MOVE_DUR = 400;
var HEIGHT_RATE = 0.35;

/**
 * Floor class handles the behaviour of floor of the Map view
 */
var Floorboard = (_dec = component('floorboard'), _dec(_class = function (_Being) {
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

            return (0, _spn.wait)(FLOORBOARD_MOVE_DUR);
        }
    }, {
        key: 'willHide',
        value: function willHide() {

            this.elem.css('transform', 'scale(1, 0)');

            return (0, _spn.wait)(FLOORBOARD_MOVE_DUR);
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
}(_spn.Being)) || _class);
exports.default = Floorboard;

},{"spn":12}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class;

var _stayRunSprite = require('../../ui/sprite/stay-run-sprite');

var _stayRunSprite2 = _interopRequireDefault(_stayRunSprite);

var _traitsDecorator = require('traits-decorator');

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */

var FrogSprite = (_dec = (0, _traitsDecorator.traits)(_stayRunSprite2.default), _dec2 = component('frog'), _dec(_class = _dec2(_class = function (_GridWalker) {
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
            return new _spn.Animation('foo', 400);
        }
    }, {
        key: 'width',
        value: function width() {
            return 100;
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
    }]);

    return FrogSprite;
}(_spn.GridWalker)) || _class) || _class);
exports.default = FrogSprite;

},{"../../ui/sprite/stay-run-sprite":43,"spn":12,"traits-decorator":21}],35:[function(require,module,exports){
'use strict';

require('./camera');

require('./door');

require('./floor-asset-collection');

require('./floor-walker');

require('./floorboard');

require('./frog-sprite');

require('./staircase');

},{"./camera":28,"./door":29,"./floor-asset-collection":30,"./floor-walker":32,"./floorboard":33,"./frog-sprite":34,"./staircase":36}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _spn = require('spn');

var _floorAsset = require('./floor-asset');

var _floorAsset2 = _interopRequireDefault(_floorAsset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

var STAIRCASE_ANIMATION_DUR = 400;

/**
 * Staircase class represents the staircases in the map view.
 */
var Staircase = (_dec = component('staircase'), _dec(_class = function (_FloorAsset) {
    _inherits(Staircase, _FloorAsset);

    _createClass(Staircase, [{
        key: 'showAnim',
        value: function showAnim() {
            return new _spn.Animation('door-appear', STAIRCASE_ANIMATION_DUR);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {
            return new _spn.Animation('door-disappear', STAIRCASE_ANIMATION_DUR);
        }
    }]);

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
}(_floorAsset2.default)) || _class);
exports.default = Staircase;

},{"./floor-asset":31,"spn":12}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2;

var _sceneContext = require('../ui/scene-context');

var _sceneContext2 = _interopRequireDefault(_sceneContext);

var _backgroundService = require('../ui/common/background-service');

var _backgroundService2 = _interopRequireDefault(_backgroundService);

var _userRepository = require('../domain/user-repository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _characterRepository = require('../domain/character-repository');

var _characterRepository2 = _interopRequireDefault(_characterRepository);

var _spn = require('spn');

require('./component');

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
 * MapScene handles the scene of map
 *
 * Responsibility:
 * - interaction between services
 * - interaction between view and model
 * - sequence of multi agents perfomance
 */

var MapScene = (_dec = component('map-scene'), _dec2 = event('scene-start'), _dec3 = event('goToLevel'), _dec4 = event('sceneReload'), _dec5 = event('assetUnlock'), _dec(_class = (_class2 = function (_SceneContext) {
    _inherits(MapScene, _SceneContext);

    function MapScene() {
        _classCallCheck(this, MapScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MapScene).apply(this, arguments));
    }

    _createClass(MapScene, [{
        key: 'main',
        value: function main() {

            _get(Object.getPrototypeOf(MapScene.prototype), 'main', this).call(this);
        }

        /**
         * Gets the floor asset collection.
         *
         * @return {FloorAssetCollection}
         */

    }, {
        key: 'getFloorAssets',
        value: function getFloorAssets() {

            return this.get('floor-asset-collection');
        }

        /**
         * Gets the camera.
         *
         * @return {Camera}
         */

    }, {
        key: 'getCamera',
        value: function getCamera() {

            return this.getAtElem('camera');
        }

        /**
         * Gets the floor walker.
         *
         * @return {FloorWalker}
         */

    }, {
        key: 'getWalker',
        value: function getWalker() {

            return this.get('floor-walker');
        }

        /**
         * Gets the floorboard.
         *
         * @return {Floorboard}
         */

    }, {
        key: 'getFloorboard',
        value: function getFloorboard() {

            return this.get('floorboard');
        }

        /**
         * Loads the data for the scene.
         */

    }, {
        key: 'load',
        value: function load() {
            var _this2 = this;

            return this.loadUserAndCharacter().then(function () {
                return _this2.loadFloorData();
            });
        }

        /**
         * Loads the user data and character data
         */

    }, {
        key: 'loadUserAndCharacter',
        value: function loadUserAndCharacter() {
            var _this3 = this;

            return new _userRepository2.default().get().then(function (user) {
                return new _characterRepository2.default().getById(user.charId);
            }).then(function (character) {
                return _this3.character = character;
            });
        }

        /**
         * Loads the floor data.
         *
         * @return {Promise<string>}
         */

    }, {
        key: 'loadFloorData',
        value: function loadFloorData() {
            var _this4 = this;

            return Promise.resolve($.get(this.getFloorDataURL())).then(function (data) {
                return _this4.floorData = data;
            });
        }

        /**
         * Gets the floor data url.
         *
         * @return {string}
         */

    }, {
        key: 'getFloorDataURL',
        value: function getFloorDataURL() {

            return 'data/floor/' + this.character.position.floorId + '.html';
        }

        /**
         * Sets up the components
         */

    }, {
        key: 'setUp',
        value: function setUp() {

            this.spawnFloorWalker(this.character);

            this.initFloorAssets(this.character);

            this.getCamera().setUp();
        }

        /**
         * Initializes the floor walker.
         *
         * @param {Character} character
         */

    }, {
        key: 'spawnFloorWalker',
        value: function spawnFloorWalker(character) {

            $('<img />', {

                addClass: 'sub-door-knock sub-character-goto',
                appendTo: this.elem.find('.floor-asset-collection'),
                data: { character: character }

            }).cc.init('floor-walker');
        }

        /**
         * Initializes the floor assets.
         *
         * @param {Character} character
         */

    }, {
        key: 'initFloorAssets',
        value: function initFloorAssets(character) {

            this.getFloorAssets().loadAssetsFromData(this.floorData);

            this.getFloorAssets().updateAssetsByLocksAndHistories(character.locks, character.histories);

            var currentFloorAsset = this.getFloorAssets().findById(character.position.floorObjectId);

            if (currentFloorAsset) {

                currentFloorAsset.locked = false;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this5 = this;

            this.getMenuButton().show();

            _backgroundService2.default.turnWhite();

            return this.getFloorboard().show().then(function () {
                return _this5.getFloorAssets().show();
            }).then(function () {

                var floorAsset = _this5.getFloorAssets().findById(_this5.getWalker().getPosition().floorObjectId);

                return _this5.getWalker().appearAt(floorAsset);
            });
        }
    }, {
        key: 'fadeOut',
        value: function fadeOut() {
            var _this6 = this;

            this.getMenuButton().hide();

            return this.getFloorAssets().hide().then(function () {

                _this6.getFloorboard().hide();

                return _backgroundService2.default.turnBlack();
            });
        }
    }, {
        key: 'walkerFadeIntoDoor',
        value: function walkerFadeIntoDoor() {
            var _this7 = this;

            return this.getWalker().getIntoDoor().then(function () {
                return _this7.fadeOut();
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
                return location.href = 'level.html';
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
         * Unlocks the asset specified at the event object.
         *
         * @param {Event} e The event
         * @return {Promise}
         */

    }, {
        key: 'assetUnlock',
        value: function assetUnlock(e) {
            var _this8 = this;

            var asset = e.floorAsset;

            return this.getCamera().scrollTo(asset.centerX(), 500).then(function () {

                asset.removeFrog();
                asset.locked = false;
                asset.enableDoorKnock();

                return (0, _spn.wait)(500);
            }).then(function () {
                return _this8.getCamera().scrollTo(_this8.getWalker().x, 500);
            });
        }
    }]);

    return MapScene;
}(_sceneContext2.default), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'goToLevel', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'goToLevel'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'sceneReload', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'sceneReload'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'assetUnlock', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'assetUnlock'), _class2.prototype)), _class2)) || _class);
exports.default = MapScene;

},{"../domain/character-repository":23,"../domain/user-repository":25,"../ui/common/background-service":38,"../ui/scene-context":39,"./component":35,"spn":12}],38:[function(require,module,exports){
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

},{"spn":12}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./ma":41,"./sprite":42,"spn":12,"traits-decorator":21}],41:[function(require,module,exports){
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

},{"spn":12}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _traitsDecorator = require('traits-decorator');

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The sprite class for stay-run creatures.
 *
 * Trait.
 */
var StayRunSprite = (_dec = (0, _traitsDecorator.traits)(_sprite2.default), _dec(_class = function () {
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

            this.dirStateImage = new _spn.DirStateImageMap();

            this.dirStateImage.addImageByDirState(new _spn.Image(this.leftStayImage()), 'left', 'stay');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.leftRunImage()), 'left', 'run');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.leftStayImage(), true), 'right', 'stay');
            this.dirStateImage.addImageByDirState(new _spn.Image(this.leftRunImage(), true), 'right', 'run');
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

            return (0, _spn.wait)(this.awayDur()).then(function () {
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
exports.default = StayRunSprite;

},{"./sprite":42,"spn":12,"traits-decorator":21}]},{},[22]);
