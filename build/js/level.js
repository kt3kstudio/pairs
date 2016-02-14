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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var Animation = (function () {

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
})();

exports.default = Animation;
},{"./if-num-else":11,"./reflow":16,"./wait":19}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */

var Being = (function (_$$cc$Actor) {
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
})($.cc.Actor);

exports.default = Being;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _being = require('./being');

var _being2 = _interopRequireDefault(_being);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DimensionalBeing = (function (_Being) {
  _inherits(DimensionalBeing, _Being);

  function DimensionalBeing() {
    _classCallCheck(this, DimensionalBeing);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DimensionalBeing).apply(this, arguments));
  }

  return DimensionalBeing;
})(_being2.default);

exports.default = DimensionalBeing;
},{"./being":3}],5:[function(require,module,exports){
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

var CharSprite = (function (_Sprite) {
  _inherits(CharSprite, _Sprite);

  function CharSprite() {
    _classCallCheck(this, CharSprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CharSprite).apply(this, arguments));
  }

  return CharSprite;
})(_sprite2.default);

exports.default = CharSprite;
},{"./sprite":17}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DimensionFactory = (function (_Rect) {
  _inherits(DimensionFactory, _Rect);

  function DimensionFactory() {
    _classCallCheck(this, DimensionFactory);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DimensionFactory).apply(this, arguments));
  }

  return DimensionFactory;
})(_rect2.default);

exports.default = DimensionFactory;
},{"./rect":15}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirStateImageMap = function DirStateImageMap() {
  _classCallCheck(this, DirStateImageMap);
};

exports.default = DirStateImageMap;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridWalker = (function (_Body) {
  _inherits(GridWalker, _Body);

  function GridWalker() {
    _classCallCheck(this, GridWalker);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GridWalker).apply(this, arguments));
  }

  return GridWalker;
})(_body2.default);

exports.default = GridWalker;
},{"./body":4}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function Grid() {
  _classCallCheck(this, Grid);
};

exports.default = Grid;
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function Image() {
  _classCallCheck(this, Image);
};

exports.default = Image;
},{}],13:[function(require,module,exports){
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

var _dimensionFactory = require('./dimension-factory');

var _dimensionFactory2 = _interopRequireDefault(_dimensionFactory);

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
exports.LayoutFactory = _dimensionFactory2.default;
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
},{"./animation":2,"./being":3,"./body":4,"./char-sprite":5,"./dimension-factory":6,"./dir-state-image-map":7,"./dirs":8,"./grid":10,"./grid-walker":9,"./if-num-else":11,"./image":12,"./posture":14,"./rect":15,"./reflow":16,"./sprite":17,"./static-sprite":18,"./wait":19}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ifNumElse = require('./if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Posture is the model of the information about how the Body is placed and arranged to its position.
 *
 * @class
 */

var Posture = (function () {

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
         * Returns an posture of the similar rectangle which is the inner tangent of the rectangle of the given width and height.
         *
         * @param {Number} width The width of the target outer rectangle
         * @param {Number} height The height of the target outer rectangle
         * @return {Posture}
         */

    }, {
        key: 'similarInnerTangent',
        value: function similarInnerTangent(width, height) {

            if (width / height > this.width / this.height) {

                width = height * this.width / this.height;
            } else {

                height = width * this.height / this.width;
            }

            return new Posture({

                width: width,
                height: height,
                ratioX: this.ratioX,
                ratioY: this.ratioY,
                marginX: this.marginX,
                marginY: this.marginY,
                marginTop: this.marginTop,
                marginRight: this.marginRight,
                marginBottom: this.marginBottom,
                marginLeft: this.marginLeft

            });
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

            var innerTangent = this.similarInnerTangent(width, height);

            this.width = innerTangent.width;
            this.height = innerTangent.height;
        }
    }]);

    return Posture;
})();

exports.default = Posture;
},{"./if-num-else":11}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function Rect() {
  _classCallCheck(this, Rect);
};

exports.default = Rect;
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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

var Sprite = (function (_GridWalker) {
  _inherits(Sprite, _GridWalker);

  function Sprite() {
    _classCallCheck(this, Sprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).apply(this, arguments));
  }

  return Sprite;
})(_gridWalker2.default);

exports.default = Sprite;
},{"./grid-walker":9}],18:[function(require,module,exports){
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

var StaticSprite = (function (_Sprite) {
  _inherits(StaticSprite, _Sprite);

  function StaticSprite() {
    _classCallCheck(this, StaticSprite);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StaticSprite).apply(this, arguments));
  }

  return StaticSprite;
})(_sprite2.default);

exports.default = StaticSprite;
},{"./sprite":17}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
'use strict';

require('arrowkeys');

require('swipe-event/swipe-event');

require('swipe-event/swipe-cross');

require('../../src/domain/level');

require('../../src/scene/level/intro-scene');

require('../../src/scene/level/play-scene');

require('../../src/scene/level/outro-scene');

require('../../src/ui/level');

},{"../../src/domain/level":52,"../../src/scene/level/intro-scene":56,"../../src/scene/level/outro-scene":57,"../../src/scene/level/play-scene":59,"../../src/ui/level":64,"arrowkeys":1,"swipe-event/swipe-cross":20,"swipe-event/swipe-event":21}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _dirStateImageMap = require('./dir-state-image-map');

var _dirStateImageMap2 = _interopRequireDefault(_dirStateImageMap);

var _Ma = require('./Ma');

var _Ma2 = _interopRequireDefault(_Ma);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHR_TABLE = {
    ma: _Ma2.default
};

/**
 * CharSprite class handles the character sprite.
 *
 * Component
 */

var CharSprite = function (_Sprite) {
    _inherits(CharSprite, _Sprite);

    _createClass(CharSprite, [{
        key: 'upImage',

        /** sprite's image when going up */
        value: function upImage() {
            return '';
        }

        /** sprite's image when going down */

    }, {
        key: 'downImage',
        value: function downImage() {
            return '';
        }

        /** sprite's image when going left */

    }, {
        key: 'leftImage',
        value: function leftImage() {
            return '';
        }

        /** sprite's image when going right */

    }, {
        key: 'rightImage',
        value: function rightImage() {
            return '';
        }
    }]);

    function CharSprite(elem) {
        _classCallCheck(this, CharSprite);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CharSprite).call(this, elem));

        _this.character = elem.data('character');

        CHR_TABLE[_this.character.id].call(_this);

        var dirStateImage = new _dirStateImageMap2.default([['up', 'default', new _Image2.default(_this.upImage())], ['down', 'default', new _Image2.default(_this.downImage())], ['left', 'default', new _Image2.default(_this.leftImage())], ['right', 'default', new _Image2.default(_this.rightImage())]]);

        _this.dirStateImage = dirStateImage;

        return _this;
    }

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {string} dir The direction (one of up, down, left or right)
     */

    _createClass(CharSprite, [{
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

        /**
         * Moves a unit upward along the grid.
         *
         * @return {Promise}
         */

    }, {
        key: 'moveUpOnGrid',
        value: function moveUpOnGrid() {

            this.turn('up');

            return _get(Object.getPrototypeOf(CharSprite.prototype), 'moveUpOnGrid', this).call(this);
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

            return _get(Object.getPrototypeOf(CharSprite.prototype), 'moveRightOnGrid', this).call(this);
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

            return _get(Object.getPrototypeOf(CharSprite.prototype), 'moveDownOnGrid', this).call(this);
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

            return _get(Object.getPrototypeOf(CharSprite.prototype), 'moveLeftOnGrid', this).call(this);
        }
    }]);

    return CharSprite;
}(_Sprite3.default);

exports.default = CharSprite;

},{"./Image":31,"./Ma":32,"./Sprite":36,"./dir-state-image-map":39,"spn":13}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spn = require('spn');

var Dimension = _spn.Posture;

exports.default = Dimension;

},{"spn":13}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Rect = require('./Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Dimension = require('./Dimension');

var _Dimension2 = _interopRequireDefault(_Dimension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */

var DimensionFactory = function () {

  /**
   * Calculates things which are needed for providing the dimensions of the objects in the level scene.
   *
   * @protected
   * @param {number} marginLeft The left margin for the main area
   * @param {number} marginTop The top margin for the main area
   * @param {number} marginRight The right margin for the main area
   * @param {number} marginBottom The bottom margin for the main area
   * @param {widthRate} widthRate The rate of the width relative to the height rate
   * @param {heightRate} heightRate The rate of the height relative to the width rate
   */

  function DimensionFactory() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var marginLeft = _ref.marginLeft;
    var marginTop = _ref.marginTop;
    var marginRight = _ref.marginRight;
    var marginBottom = _ref.marginBottom;
    var widthRate = _ref.widthRate;
    var heightRate = _ref.heightRate;

    _classCallCheck(this, DimensionFactory);

    /**
     * @property {number} marginLeft The left margin for the main area.
     */
    this.marginLeft = marginLeft || 0;

    /**
     * @property {number} marginTop The top margin for the main area.
     */
    this.marginTop = marginTop || 0;

    /**
     * @property {number} marginRight The right margin for the main area.
     */
    this.marginRight = marginRight || 0;

    /**
     * @property {number} marginBottom The bottom margin for the main area.
     */
    this.marginBottom = marginBottom || 0;

    /**
     * @property {number} heightRate The rate of the width relative to the height rate
     */
    this.widthRate = widthRate || 1;

    /**
     * @property {number} heightRate The rate of the height relative to the width rate
     */
    this.heightRate = heightRate || 1;

    var available = this.getAvailableDimension($(window).width(), $(window).height());

    var bestDim = this.getBestDimension(available);

    var top = this.marginTop + (available.actualHeight() - bestDim.actualHeight()) / 2;
    var left = this.marginLeft + (available.actualWidth() - bestDim.actualWidth()) / 2;

    this.main = new _Rect2.default({
      top: top,
      left: left,
      bottom: top + bestDim.actualHeight(),
      right: left + bestDim.actualWidth()
    });
  }

  /**
   * Gets the available dimension in the play scene.
   *
   * @private
   * @param {Number} width The width of the target area
   * @param {Number} height The height of the target area
   * @return {Dimension}
   */

  _createClass(DimensionFactory, [{
    key: 'getAvailableDimension',
    value: function getAvailableDimension(width, height) {

      return new _Dimension2.default({
        width: width,
        height: height,
        marginTop: this.marginTop,
        marginRight: this.marginRight,
        marginBottom: this.marginBottom,
        marginLeft: this.marginLeft
      });
    }

    /**
     * Gets the best fitting playable area for the level scene.
     *
     * @private
     * @param {Dimension}
     * @return {Dimension}
     */

  }, {
    key: 'getBestDimension',
    value: function getBestDimension(available) {

      return new _Dimension2.default({

        width: this.widthRate,
        height: this.heightRate

      }).similarInnerTangent(available.actualWidth(), available.actualHeight());
    }

    /**
     * Creates a grid with the given options.
     *
     * @param {Object} options The options
     * @return {Grid}
     */

  }, {
    key: 'grid',
    value: function grid(options) {

      return new _Grid2.default(options);
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

      return new _Rect2.default(options);
    }
  }]);

  return DimensionFactory;
}();

exports.default = DimensionFactory;

},{"./Dimension":26,"./Grid":29,"./Rect":33}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _body = require('./body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DimensionalBeing = _body2.default;

exports.default = DimensionalBeing;

},{"./body":38}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Rect = require('./Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _ifNumElse = require('spn/lib/if-num-else');

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
 *
 * @class
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

    function Grid() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
        key: 'translated',
        value: function translated(x, y) {

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

            return this.translated(this.unitWidth * m, this.unitHeight * n);
        }

        /**
         * Returns the subgrid devided by the given horizontal and vertical numbers.
         *
         * @deprecated
         * @param {Number} [m=1] The horizontal division number
         * @param {Number} [n=1] The vertical division number
         */

    }, {
        key: 'subgrid',
        value: function subgrid() {
            var m = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            return this.scaleX(1 / m).scaleY(1 / n);
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
        value: function override() {
            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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

            return new _Rect2.default({

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

},{"./Rect":33,"spn/lib/if-num-else":11}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

},{"./body":38}],31:[function(require,module,exports){
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
   * @param {String} src The url of the image
   * @param {Boolean} mirrorX If the image is mirrored by x-axis
   * @param {Boolean} mirrorY If the image is mirrored by y-axis
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
     * @return {String}
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

},{}],32:[function(require,module,exports){
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

},{"spn":13}],33:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _ifNumElse = require('spn/lib/if-num-else');

var _ifNumElse2 = _interopRequireDefault(_ifNumElse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Rect model represents the static rectangle in a screen.
 *
 * @class
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

        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    /**
     * Gets the width.
     *
     * @return {Number}
     */

    _createClass(Rect, [{
        key: 'width',
        value: function width() {

            return this.right - this.left;
        }

        /**
         * Gets the height.
         *
         * @return {Number}
         */

    }, {
        key: 'height',
        value: function height() {

            return this.bottom - this.top;
        }

        /**
         * Gets the horizontal center.
         */

    }, {
        key: 'centerX',
        value: function centerX() {

            return (this.left + this.right) / 2;
        }

        /**
         * Gets the vertical center.
         */

    }, {
        key: 'centerY',
        value: function centerY() {

            return (this.top + this.bottom) / 2;
        }

        /**
         * Returns a new rect whose parameters are overrided by the given object.
         *
         * @param {number} [top] The top
         * @param {number} [left] The left
         * @param {number} [right] The right
         * @param {number} [bottom] The bottom
         * @return {Rect}
         */

    }, {
        key: 'override',
        value: function override() {
            var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var top = _ref2.top;
            var left = _ref2.left;
            var right = _ref2.right;
            var bottom = _ref2.bottom;

            return new Rect({
                top: (0, _ifNumElse2.default)(top, this.top),
                left: (0, _ifNumElse2.default)(left, this.left),
                right: (0, _ifNumElse2.default)(right, this.right),
                bottom: (0, _ifNumElse2.default)(bottom, this.bottom)
            });
        }

        /**
         * Returns a sub rectangular divided by the given partition numbers and of the given position.
         *
         *  rect.subrect({
         *      partition: [3, 4],
         *      get: [0, 2]
         *  })
         *
         * @deprecated Use scale{Direction} and shift{Direction} methods
         * @param {number[]} partition The horizontal partition number and vertical number.
         * @param {number[]} get The horizontal position and vertical position
         * @return {Rect}
         */

    }, {
        key: 'subrect',
        value: function subrect() {
            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var partition = _ref3.partition;
            var get = _ref3.get;

            partition = partition || [];
            get = get || [];

            var partX = (0, _ifNumElse2.default)(partition[0], 1);
            var partY = (0, _ifNumElse2.default)(partition[1], 1);
            var getX = (0, _ifNumElse2.default)(get[0], 0);
            var getY = (0, _ifNumElse2.default)(get[1], 0);

            return this.sub(partX, partY).shift(getX, getY);
        }

        /**
         * Returns a sub rectangular divided by the given partition numbers.
         *
         * @deprecated Use scale{Direction} methods
         * @param {number} partX  The horizontal number
         * @param {number} partY  The vertical number
         * @return {Rect}
         */

    }, {
        key: 'sub',
        value: function sub() {
            var partX = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var partY = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            return this.scaleRight(1 / partX).scaleBottom(1 / partY);
        }

        /**
         * Returns a new rect which scales the top side
         *
         * @param {number} scale The scale rate
         * @return {Rect}
         */

    }, {
        key: 'scaleTop',
        value: function scaleTop() {
            var scale = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

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
        value: function scaleLeft() {
            var scale = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

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
        value: function scaleRight() {
            var scale = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

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
        value: function scaleBottom() {
            var scale = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            return this.cutTop(this.height() * scale);
        }

        /**
         * Returns a shifted rect by the given horizontal and vertical numbers.
         *
         * @param {number} [m=0] The horizontal number
         * @param {number} [n=0] The vertical number
         * @return {Rect}
         */

    }, {
        key: 'shift',
        value: function shift() {
            var m = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var n = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var width = this.width();
            var height = this.height();

            return this.override({
                top: this.top + n * height,
                left: this.left + m * width,
                right: this.right + m * width,
                bottom: this.bottom + n * height
            });
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

            return this.shift(0, -n);
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

            return this.shift(-n, 0);
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

            return this.shift(n, 0);
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

            return this.shift(0, n);
        }

        /**
         * Cuts out the given height from the top.
         *
         * @param {number} [height=0] The height
         * @return {Rect}
         */

    }, {
        key: 'cutTop',
        value: function cutTop() {
            var height = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            return this.override({ bottom: this.top + height });
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

            return this.override({ right: this.left + width });
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

            return this.override({ left: this.right - width });
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

            return this.override({ top: this.bottom - height });
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

            return new _Grid2.default({
                x: this.centerX(),
                y: this.centerY(),
                unitWidth: this.width(),
                unitHeight: this.height()
            });
        }

        /**
         * Returns a dual grid
         *
         * @return {Grid}
         */

    }, {
        key: 'dual',
        value: function dual() {

            return this.toGrid();
        }
    }]);

    return Rect;
}();

exports.default = Rect;

},{"./Grid":29,"spn/lib/if-num-else":11}],34:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 *
 * @abstract
 * @class
 */

var SceneContext = function (_$$cc$Coelement) {
  _inherits(SceneContext, _$$cc$Coelement);

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
}($.cc.Coelement);

exports.default = SceneContext;

},{}],35:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SPEECH_TIMEOUT = 5000;

/**
 * Speaker is a trait of the component which is able to "speak".
 *
 * Trait
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
         * @param {jQuery} cancelDom The dom for closing the speech
         * @param {number} timeout The timeout of showing speech bubble
         */
        value: function speak(speech) {
            var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var cancelDom = _ref.cancelDom;
            var timeout = _ref.timeout;

            cancelDom = cancelDom || this.elem;
            timeout = timeout || DEFAULT_SPEECH_TIMEOUT;

            var bubble = this.elem.multiflipBubble(speech, {
                width: $(window).width() * 0.8,
                height: 50,
                color: '#328DE5',
                m: 14,
                n: 2
            });

            bubble.elem.addClass(this.name + '-speech');

            this.speechEndPromise = bubble.show().then(function () {
                return Promise.race([(0, _spn.wait)(timeout), $(cancelDom).once('click touchstart')]);
            }).then(function () {
                return $(cancelDom).off('click touchstart');
            }).then(function () {
                return bubble.hide();
            });

            return bubble;
        }
    }]);

    return Speaker;
}();

exports.default = Speaker;

},{"spn":13}],36:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _GridWalker2 = require('./GridWalker');

var _GridWalker3 = _interopRequireDefault(_GridWalker2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sprite class changes its image according to its direction and state.
 */

var Sprite = function (_GridWalker) {
  _inherits(Sprite, _GridWalker);

  _createClass(Sprite, [{
    key: 'ratioX',

    /**
     * @override
     * @return {Number} originX
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */
    value: function ratioX() {
      return 0.5;
    }

    /**
     * @override
     * @return {Number} originY
     *
     * The image sprite's center is at the center(x=0.5) bottom(y=1) of the image.
     */

  }, {
    key: 'ratioY',
    value: function ratioY() {
      return 1;
    }

    /**
     * @return { Object<Object<Image>>} stateImage The map of state to image url.
     */

  }, {
    key: 'dirStateImage',
    value: function dirStateImage() {
      return null;
    }

    /**
     * Returns the default direction.
     *
     * @abstract
     */

  }, {
    key: 'defaultDir',
    value: function defaultDir() {
      return 'down';
    }

    /**
     * Returns the default state.
     *
     * @abstract
     */

  }, {
    key: 'defaultState',
    value: function defaultState() {
      return 'default';
    }
  }]);

  function Sprite(elem) {
    _classCallCheck(this, Sprite);

    /**
     * @property {String} dir The direction
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this, elem));

    _this.dir = _this.defaultDir();

    /**
     * @property {String} state The state
     */
    _this.state = _this.defaultState();

    return _this;
  }

  /**
   * Adds the src attr of the elem if the default state dir image exists.
   *
   * @override
   * @param {number} dur The duration
   */

  _createClass(Sprite, [{
    key: 'willShow',
    value: function willShow(dur) {

      this.updateElemByDirState();

      return _get(Object.getPrototypeOf(Sprite.prototype), 'willShow', this).call(this, dur);
    }

    /**
     * Changes the direction and state.
     *
     * @param {String} dir The direction
     * @param {String} state The state
     */

  }, {
    key: 'setDirState',
    value: function setDirState(dir, state) {

      this.dir = dir;
      this.state = state;

      this.updateElemByDirState();
    }

    /**
     * Updates the element by the dir and state.
     */

  }, {
    key: 'updateElemByDirState',
    value: function updateElemByDirState() {

      this.dirStateImage.get(this.dir, this.state).apply(this.elem);
    }

    /**
     * Keeps the direction and sets the given state.
     *
     * @param {String} state The state
     */

  }, {
    key: 'setState',
    value: function setState(state) {

      this.state = state;

      this.updateElemByDirState();
    }

    /**
     * Sets the direction.
     *
     * @param {String} dir The direction
     */

  }, {
    key: 'setDir',
    value: function setDir(dir) {

      this.dir = dir;

      this.updateElemByDirState();
    }
  }]);

  return Sprite;
}(_GridWalker3.default);

exports.default = Sprite;

},{"./GridWalker":30}],37:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _Sprite2 = require('./Sprite');

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _dirStateImageMap = require('./dir-state-image-map');

var _dirStateImageMap2 = _interopRequireDefault(_dirStateImageMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * StaticSprite is Sprite without dir-state change.
 */

var StaticSprite = function (_Sprite) {
    _inherits(StaticSprite, _Sprite);

    _createClass(StaticSprite, [{
        key: 'image',

        /**
         * @abstract
         */
        value: function image() {
            return null;
        }
    }]);

    function StaticSprite(elem) {
        _classCallCheck(this, StaticSprite);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StaticSprite).call(this, elem));

        _this.dirStateImage = new _dirStateImageMap2.default([['down', 'default', new _Image2.default(_this.image())]]);

        return _this;
    }

    return StaticSprite;
}(_Sprite3.default);

exports.default = StaticSprite;

},{"./Image":31,"./Sprite":36,"./dir-state-image-map":39}],38:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _spn = require('spn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Body has width, height, position and information about how it put at the postion.
 *
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
    _this.posture = new _spn.Posture({
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

      return this.posture.actualHeight();
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
     * Creates the dom of the character.
     *
     * @override
     */

  }, {
    key: 'willShow',
    value: function willShow() {

      this.updateElem();
    }

    /**
     * Gets the elem's right limit in px.
     *
     * @return {Number} x value of the right limit of sprite
     */

  }, {
    key: 'rightLimit',
    value: function rightLimit() {

      return this.posture.rightLimit(this.x);
    }

    /**
     * Gets the elem's left limit in px.
     *
     * @return {Number} x value of the left limit of sprite
     */

  }, {
    key: 'leftLimit',
    value: function leftLimit() {

      return this.posture.leftLimit(this.x);
    }

    /**
     * Gets the elem's top limit in px.
     */

  }, {
    key: 'topLimit',
    value: function topLimit() {

      return this.posture.topLimit(this.y);
    }

    /**
     * Gets the elem's bottom limit in px.
     */

  }, {
    key: 'bottomLimit',
    value: function bottomLimit() {

      return this.posture.bottomLimit(this.y);
    }

    /**
     * Gets the x of the center.
     *
     * @return {Number}
     */

  }, {
    key: 'centerX',
    value: function centerX() {

      return this.posture.centerX(this.x);
    }

    /**
     * Gets the y of the center.
     *
     * @return {Number}
     */

  }, {
    key: 'centerY',
    value: function centerY() {

      return this.posture.centerY(this.y);
    }

    /**
     * Updates the elem's offset according to current position.
     *
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
     *
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
     *
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

      return (0, _spn.wait)(this.transitionDuration);
    }

    /**
     * Moves the elem to the given y position.
     *
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
     *
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
     *
     * @param {Number} dur The transition duration
     */

  }, {
    key: 'setTransitionDuration',
    value: function setTransitionDuration(dur) {

      this.transitionDuration = dur;

      this.elem.css('transition-duration', dur + 'ms');

      (0, _spn.reflow)(this.elem);
    }

    /**
     * Sets the guiding rect and update the x, y and posture to fit into the given rect.
     *
     * @param {Rect} rect
     */

  }, {
    key: 'setRect',
    value: function setRect(rect) {

      this.rect = rect;

      this.x = rect.left + rect.width() * this.posture.ratioX;
      this.y = rect.top + rect.height() * this.posture.ratioY;

      this.posture.width = rect.width();
      this.posture.height = rect.height();
    }
  }]);

  return Body;
}(_spn.Being);

exports.default = Body;

},{"spn":13}],39:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The model of the mapping from the direction and state to its corresponding image.
 */

var DirStateImageMap = function () {

    /**
     * @param {Array<Array>}
     */

    function DirStateImageMap(items) {
        _classCallCheck(this, DirStateImageMap);

        this.imageMap = {};

        this.addItems(items);
    }

    /**
     * Adds the items.
     *
     * @private
     * @param {Array<Array>}
     */

    _createClass(DirStateImageMap, [{
        key: 'addItems',
        value: function addItems(items) {
            var _this = this;

            items.forEach(function (item) {
                return _this.addItem(item);
            });
        }

        /**
         * Adds the item.
         *
         * @private
         * @param {string} dir The direction
         * @param {string} state The state
         * @param {Image} image The image
         */

    }, {
        key: 'addItem',
        value: function addItem(_ref) {
            var _ref2 = _slicedToArray(_ref, 3);

            var dir = _ref2[0];
            var state = _ref2[1];
            var image = _ref2[2];

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

},{}],40:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

},{}],41:[function(require,module,exports){
'use strict';

var _spn = require('spn');

var _GridWalker = require('../common/GridWalker');

var _GridWalker2 = _interopRequireDefault(_GridWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ball class represents the ball inside the field of the level.
 *
 * @class
 */
domain.level.Ball = subclass(_GridWalker2.default, function (pt, parent) {
    'use strict';

    var TRANS_DUR = 150;

    var MAX = 3;

    pt.constructor = function (elem) {

        parent.constructor.apply(this, arguments);

        var pos = elem.data('pos') || { m: 1, n: 1 };

        this.setGrid(elem.data('grid'), pos.m, pos.n);
        this.setTransitionDuration(TRANS_DUR);
    };

    pt.maxX = MAX;
    pt.maxY = MAX;

    pt.showAnim = function () {
        return new _spn.Animation('ball-appear', TRANS_DUR);
    };

    pt.hideAnim = function () {
        return new _spn.Animation('ball-disappear', TRANS_DUR);
    };

    pt.willShow = function () {

        var elem = this.elem;

        return parent.willShow.apply(this, arguments).then(function () {

            elem.css('display', 'inline');
        });
    };

    /**
     * Moves the ball to the direction.
     *
     * @param {String} dir
     * @return {Promise}
     */
    pt.move = function (dir) {

        return this.setPos(this.posAhead(dir));
    };

    /**
     * Moves to the center in x dir.
     *
     * @return {Promise}
     */
    pt.goCenterX = function () {

        return this.moveToM(1);
    };

    /**
     * Moves to the center in y dir.
     *
     * @return {Promise}
     */
    pt.goCenterY = function () {

        return this.moveToN(1);
    };

    pt.posAhead = function (dir) {

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
    };

    pt.relativePos = function (m, n) {

        return { m: (this.m + m + this.maxX) % this.maxX, n: (this.n + n + this.maxY) % this.maxY };
    };

    pt.setPos = function (pos) {

        this.moveToGridPosition(pos.m, pos.n);
    };

    /**
     * Gets the current grid position.
     *
     * @return {Object}
     */
    pt.pos = function () {

        return { m: this.m, n: this.n };
    };

    pt.refuseToMove = function (dir) {

        if (dir === 'up' || dir === 'down') {

            return this.elem.anim('ball-refuse-y', TRANS_DUR);
        } else {

            return this.elem.anim('ball-refuse-x', TRANS_DUR);
        }
    };
});

$.cc.assign('ball', domain.level.Ball);

},{"../common/GridWalker":30,"spn":13}],42:[function(require,module,exports){
'use strict';

var _PossibleMoveDetectionService = require('./PossibleMoveDetectionService');

var _PossibleMoveDetectionService2 = _interopRequireDefault(_PossibleMoveDetectionService);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * BallMoveMobLeaveService provides the function to move ball and process field boms collectly.
 * @class
 */
domain.level.BallMoveMobLeaveService = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {domain.level.Ball} ball The ball
     * @param {domain.level.CellCollection} cells The cells
     */

    pt.constructor = function (ball, cells) {

        this.ball = ball;
        this.mobs = new Mobs(cells);

        this.pmds = new _PossibleMoveDetectionService2.default(this.ball, cells);
    };

    /**
     * Processes the stream of direction and returns the stream of cells.
     *
     * @param {Rx.Observable<String>} dirStream The stream of directions
     * @return {Rx.Observable<domain.level.Cell>}
     */
    pt.processDirStream = function (dirStream) {

        var self = this;

        return dirStream.pipe(function (dir) {

            return self.ballMoveAndLeaveOne(dir);
        }).filterNull();
    };

    /**
     * Makes the ball move to the specified direction and a mob leave the field.
     *
     * @param {String} dir The direction the ball moves (up|down|right|left)
     * @returns {domain.level.Cell|Rx.Observable} A promise which resolves when the mob(bom) left the field
     */
    pt.ballMoveAndLeaveOne = function (dir) {

        var pos = this.ball.posAhead(dir);

        if (this.mobs.find(pos) == null) {

            this.ball.refuseToMove(dir);

            return null;
        }

        this.ball.move(dir);

        return this.leaveAtPos(pos);
    };

    /**
     * Make the mob at the ball leave the field.
     *
     * @return {domain.level.Cell}
     */
    pt.leaveLastOneAtBall = function () {

        return this.mobs.leave(this.ball.pos()).setLastOne();
    };

    /**
     * Make a mob at the specified position leave the field.
     *
     * @param {Object} pos The position
     * @return {domain.level.Cell|Rx.Observable}
     */
    pt.leaveAtPos = function (pos) {

        var that = this;

        var mob = this.mobs.leave(pos);

        if (this.pmds.possible()) {

            return mob;
        }

        console.log('no more move!');

        if (this.pmds.cellRemainsAtBall()) {

            console.log('cell remains at ball');

            return [mob, (0, _spn.wait)(600).then(function () {

                return that.leaveLastOneAtBall();
            })].toFlatStream();
        }

        console.log('no cell left');

        return mob.setLastOne();
    };

    /**
     * Mobs is the role class which represents the collection of cells on and below the field.
     *
     * Mobs is the adaptor class of domain.level.FieldCells class into the BallMoveMobLeaveService context.
     *
     * @class domain.level.BallMoveMobLeaveService.Mobs
     * @private
     */
    var Mobs = subclass(function (pt) {

        /**
         * @constructor
         * @param {domain.level.CellCollection} cells The collection of cells
         */
        pt.constructor = function (cells) {

            this.cells = cells;
        };

        /**
         * Check if the field is empty of cells.
         *
         * @return {Boolean}
         */
        pt.isEmpty = function () {

            return this.cells.isEmpty();
        };

        /**
         * Makes the cell at the position leave the field.
         *
         * @param {Object} pos The position
         */
        pt.leave = function (pos) {

            var w = this.cells.select(pos);

            this.cells.remove(w);

            w = w[0];

            this.cells.selectRange(pos).forEach(function (cell) {

                cell.up();
            });

            return w;
        };

        /**
         * Finds the cell at the position.
         *
         * @param {Object} pos The position
         */
        pt.find = function (pos) {

            return this.cells.find(pos);
        };
    });
});

},{"./PossibleMoveDetectionService":51,"spn":13}],43:[function(require,module,exports){
'use strict';

var _spn = require('spn');

var _BomTable = require('../common/BomTable');

var _BomTable2 = _interopRequireDefault(_BomTable);

var _GridWalker = require('../common/GridWalker');

var _GridWalker2 = _interopRequireDefault(_GridWalker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
domain.level.Cell = subclass(_GridWalker2.default, function (pt, parent) {
    'use strict';

    pt.cellRatioX = function () {
        return 0.65;
    };
    pt.cellRatioY = function () {
        return 0.65;
    };

    /**
     * @constructor
     * @param {String} gene The gene string
     * @param {String|HTMLElement} parent The parent dom
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.gene = elem.data('gene');

        this.__isLastOne = false;
        this.__isEvolved = false;

        pt.constructor.allList.push(this);
    };

    pt.constructor.allList = [];

    pt.constructor.disappear = function () {

        return pt.constructor.allList.map(function (cell, i) {

            (0, _spn.wait)(40 * i).then(function () {

                return cell.disappear();
            });
        }).pop();
    };

    /**
     * Sets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.setLastOne = function () {

        this.__isLastOne = true;

        return this;
    };

    /**
     * Unsets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.unsetLastOne = function () {

        this.__isLastOne = false;

        return this;
    };

    /**
     * Returns true if it's the last one of the round.
     *
     * @return {Boolean}
     */
    pt.isLastOne = function () {

        return this.__isLastOne;
    };

    /**
     * Sets the flag of being evolved from the parents.
     */
    pt.setEvolved = function () {

        this.__evolved = true;

        return this;
    };

    /**
     * Unsets the flag of being evolved.
     */
    pt.unsetEvolved = function () {

        this.__evolved = false;

        return this;
    };

    /**
     * Returns true if it's evolved from its parents, otherwise false.
     *
     * @return {Boolean}
     */
    pt.isEvolved = function () {

        return this.__evolved;
    };

    /**
     * Chooses the image for the gene.
     *
     * @private
     * @return {String}
     */
    pt.selectImage = function () {

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

        var cellKind = _BomTable2.default[this.gene.length];

        return 'img/' + cellKind + '.svg';
    };

    /**
     * Creates the dom for this
     *
     * @return {jQuery}
     */
    pt.willShow = function () {

        var that = this;

        var elem = this.elem;

        return parent.willShow.apply(this, arguments).then(function () {

            elem.attr('data', that.selectImage());

            that.setTransitionDuration(300);

            return elem.once('load');
        }).then(function () {

            that.fitToGrid();

            var genes = that.gene.split('');

            var $svg = $(elem[0].contentDocument);

            for (var i = 0; i < genes.length; i++) {

                $('#' + i, $svg).attr('class', genes[i]);
            }
        });
    };

    /**
     * Reset the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    pt.resetShapeAndLocate = function () {

        return this.fitToGrid();
    };

    pt.showAnim = function () {
        return new _spn.Animation('bom-appear', 500);
    };

    pt.hideAnim = function () {
        return new _spn.Animation('bom-disappear', 500);
    };

    pt.didAppear = function () {

        return this;
    };

    pt.anim = function (animationName, duration) {

        return this.elem.anim(animationName, duration);
    };

    pt.remove = function () {

        this.elem.remove();

        pt.constructor.allList.splice(pt.constructor.allList.indexOf(this), 1);
    };

    pt.up = function () {
        return this.moveUpOnGrid();
    };
    pt.down = function () {
        return this.moveDownOnGrid();
    };
    pt.left = function () {
        return this.moveLeftOnGrid();
    };
    pt.right = function () {
        return this.moveRightOnGrid();
    };
});

$.cc.assign('cell', domain.level.Cell);

},{"../common/BomTable":24,"../common/GridWalker":30,"spn":13}],44:[function(require,module,exports){
'use strict';

var _FieldIndexGenerator = require('../../util/FieldIndexGenerator');

var _FieldIndexGenerator2 = _interopRequireDefault(_FieldIndexGenerator);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CellCollection class represents the grid positioned queues of cells around the field.
 */
domain.level.CellCollection = subclass($.cc.Coelement, function (pt, parent) {
    'use strict';

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.cells = [];
    };

    /**
     * @param {Grid} grid
     */
    pt.setGrid = function (grid) {

        this.grid = grid;

        return this;
    };

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} obj The bom object
     * @return {domain.level.Cell}
     */
    pt.createCellFromObject = function (obj) {

        return $('<object />', {
            data: { gene: obj.gene },
            prependTo: this.elem
        }).cc.init('cell');
    };

    /**
     * Checks if the field is empty.
     *
     * @return {Boolean}
     */
    pt.isEmpty = function () {

        return this.cells.length === 0;
    };

    /**
     * Loads field cells from object list.
     *
     * @param {Array} list The list of cells (Object)
     * @return {domain.level.CellCollection}
     */
    pt.loadFromObjectList = function (list) {

        return this.loadList(list.map(function (obj) {

            return this.createCellFromObject(obj);
        }, this));
    };

    /**
     * Loads field cells from cell list.
     *
     * @param {Array} list The list of cells (domain.level.Cell)
     */
    pt.loadList = function (list) {

        var indices = new _FieldIndexGenerator2.default().generate(list.length, this.usedIndices());

        list.forEach(function (cell, i) {

            var nm = indices[i];

            cell.setGrid(this.grid, nm[1], nm[0]);
            cell.unsetLastOne();

            this.cells.push(cell);
        }, this);
    };

    /**
     * Processes the stream of released cells from the exit queue.
     *
     * @param {Rx.Observable<domain.level.Cell[]>}
     * @return {Rx.Observable}
     */
    pt.processCellStream = function (releasedCellStream) {

        var self = this;

        return releasedCellStream.pipe(function (releasedCells) {

            self.loadList(releasedCells);

            return self.resetShapeAndLocate();
        });
    };

    /**
     * Appears all the cells
     *
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */
    pt.appear = function () {

        return this.cells.map(function (cell, i) {

            return (0, _spn.wait)(i * 56).then(function () {

                cell.show();
            });
        }).pop();
    };

    /**
     * Reset the shapes of the cells and locate them.
     *
     * @return {Promise}
     */
    pt.resetShapeAndLocate = function () {

        return this.cells.map(function (cell, i) {

            return (0, _spn.wait)(i * 56).then(function () {

                return cell.resetShapeAndLocate();
            });
        }).pop();
    };

    /**
     * Selects all the cells at the position.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.select = function (pos) {

        return this.cells.filter(function (cell) {

            return cell.m === pos.m && cell.n === pos.n;
        });
    };

    /**
     * Finds a cell at the position.
     *
     * @param {Object} pos The position.
     * @return {domain.level.Cell}
     */
    pt.find = function (pos) {

        var candidates = this.select(pos);

        if (candidates.length === 0) {

            return null;
        }

        return candidates[0];
    };

    /**
     * Selects the cells below the given postion.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    pt.selectRange = function (pos) {

        return this.cells.filter(function (cell) {

            return cell.m === pos.m && cell.n > pos.n;
        });
    };

    /**
     * Removes the given cells.
     *
     * @param {Array} cells The cells
     */
    pt.remove = function (cells) {

        this.cells = this.cells.filter(function (cell) {

            return cells.indexOf(cell) < 0;
        });
    };

    /**
     * Returns the list of used position indices.
     *
     * @return {Array}
     */
    pt.usedIndices = function () {

        return this.cells.map(function (cell) {

            return [cell.m, cell.n];
        });
    };
});

$.cc.assign('cell-collection', domain.level.CellCollection);

},{"../../util/FieldIndexGenerator":65,"spn":13}],45:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _CharSprite2 = require('../common/CharSprite');

var _CharSprite3 = _interopRequireDefault(_CharSprite2);

var _Speaker = require('../common/Speaker');

var _Speaker2 = _interopRequireDefault(_Speaker);

var _traitsDecorator = require('traits-decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * The main character on the level scene.
 */

var Character = (_dec = (0, _traitsDecorator.traits)(_Speaker2.default), _dec2 = component('character-on-level'), _dec(_class = _dec2(_class = function (_CharSprite) {
  _inherits(Character, _CharSprite);

  function Character() {
    _classCallCheck(this, Character);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Character).apply(this, arguments));
  }

  _createClass(Character, [{
    key: 'willShow',

    /**
     * @param {number} dur The duration
     */
    value: function willShow(dur) {

      _get(Object.getPrototypeOf(Character.prototype), 'willShow', this).call(this, dur);

      this.elem.css('display', 'inline');
    }

    /**
     * @param {number} dur The duration
     */

  }, {
    key: 'didHide',
    value: function didHide(dur) {

      _get(Object.getPrototypeOf(Character.prototype), 'didHide', this).call(this, dur);

      this.elem.css('display', 'none');
    }
  }]);

  return Character;
}(_CharSprite3.default)) || _class) || _class);
exports.default = Character;

},{"../common/CharSprite":25,"../common/Speaker":35,"traits-decorator":22}],46:[function(require,module,exports){
'use strict';

var _spn = require('spn');

/**
 * ExitQueue class represents the exit queue at the level view.
 *
 * @class
 */
domain.level.ExitQueue = subclass(function (pt) {
    'use strict';

    /**
     * @param {Grid} grid The grid
     */

    pt.constructor = function (grid) {

        this.grid = grid;
        this.queue = [];
    };

    /**
     * Processes the new cell stream and returns a stream of arrays of exiting cells.
     *
     * @param {Rx.Observable<domain.level.Cell>} newCellStream The stream of the new cells
     * @return {Rx.Observable<domain.level.Cell[]>}
     */
    pt.processNewCellStream = function (newCellStream) {

        var self = this;

        return newCellStream.pipe(function (newCell) {

            return self.enqueue(newCell).then(function () {

                return newCell;
            });
        }).filter(function (newCell) {

            return newCell.isLastOne();
        }).map(function () {

            if (self.theLastOneIsEvolved()) {

                return self.releaseCells();
            }

            // this finishes the stream
            return null;
        }).takeWhile(function (releasedCells) {

            return releasedCells != null;
        });
    };

    /**
     * Enqueues the cell.
     *
     * @param {domain.level.Cell} cell The cell
     * @return {Promise} The promise resolves with the cell.
     */
    pt.enqueue = function (cell) {

        this.queue.push(new Queuee(cell, this.grid));

        return this.goForward();
    };

    /**
     * Release cells.
     *
     * @return {Array}
     */
    pt.releaseCells = function () {

        return this.queue.splice(0).map(function (queuee) {

            return queuee.cell;
        });
    };

    /**
     * Makes the entire queue go forward.
     *
     * @private
     * @return {Promise}
     */
    pt.goForward = function () {

        var d = 200 / this.queue.length;

        return this.queue.map(function (queuee, i) {

            return (0, _spn.wait)(i * d).then(function () {

                return queuee.goForward();
            });
        }).pop();
    };

    /**
     * Checks if the queue is finished and has the last cell evolving.
     *
     * @return {Boolean}
     */
    pt.theLastOneIsEvolved = function () {

        if (this.queue.length === 0) {

            return false;
        }

        var cell = this.queue[this.queue.length - 1].cell;

        return cell.isLastOne() && cell.isEvolved();
    };

    /**
     * Queuee class is the role of the cell which is queued in the ExitQueue.
     *
     * @class domain.level.ExitQueue.Queuee
     * @private
     */
    var Queuee = subclass(function (pt) {
        /*
         * @constructor
         * @param {domain.level.Cell} cell The queueing cell
         * @param {Grid} grid The grid
         */
        pt.constructor = function (cell, grid) {

            this.cell = cell;
            this.cell.setGrid(grid, -1, 0);
            this.cell.setTransitionDuration(500);
        };

        /**
         * Goes forward in the queue.
         */
        pt.goForward = function () {

            if (this.cell.m < 4) {

                this.cell.m += 1;
            } else {

                this.cell.n += 1;
            }

            return this.cell.updateElemOnGrid();
        };
    });
});

},{"spn":13}],47:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _spn = require('spn');

var _body = require('../common/body');

var _body2 = _interopRequireDefault(_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}(_body2.default)) || _class);
exports.default = Field;

},{"../common/body":38,"spn":13}],48:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _MeioticService = require('../genetics/MeioticService');

var _MeioticService2 = _interopRequireDefault(_MeioticService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var meiosis = new _MeioticService2.default();
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
     * @param {domain.level.Cell} left The left cell
     * @param {domain.level.Cell} right The right cell
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

},{"../genetics/MeioticService":40}],49:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _FusionPair = require('./FusionPair');

var _FusionPair2 = _interopRequireDefault(_FusionPair);

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
     * @param {Rx.Observable<domain.level.Cell>} cellStream
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
         * @param {domain.level.Cell} cell The cell
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
                return new _FusionPair2.default(left, right);
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
     * @param {domain.level.Cell} cell The cell
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
         * @param {domain.level.Cell} cell The cell
         * @param {Number} index The index
         * @return {Promise<domain.level.Cell>}
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
         * @return {Array<Promise<domain.level.Cell>>}
         */

    }, {
        key: 'popAll',
        value: function popAll() {

            return this.stack.splice(0);
        }
    }]);

    return PreparationStack;
}();

},{"./FusionPair":48}],50:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
         * @return {Rx.Observable<domain.level.Cell>}
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
         * @return {Promise} {Promise<domain.level.Cell>} The new cell
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
         * @return {Promise} The new cell {Promise<domain.level.Cell>}
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

},{}],51:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * PossibleMoveDetectionService provides the functionality of detecting the possible moves in the play field.
 */

var PossibleMoveDetectionService = function () {

  /**
   * @constructor
   * @param {domain.level.Ball} ball The ball
   * @param {domain.level.CellCollection} cells The field cells
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

},{}],52:[function(require,module,exports){
'use strict';

require('./Ball');

require('./BallMoveMobLeaveService');

require('./Cell');

require('./CellCollection');

require('./Character');

require('./ExitQueue');

require('./Field');

require('./FusionPair');

require('./FusionPreparationService');

require('./FusionService');

require('./paper');

},{"./Ball":41,"./BallMoveMobLeaveService":42,"./Cell":43,"./CellCollection":44,"./Character":45,"./ExitQueue":46,"./Field":47,"./FusionPair":48,"./FusionPreparationService":49,"./FusionService":50,"./paper":53}],53:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _spn = require('spn');

var _StaticSprite2 = require('../common/StaticSprite');

var _StaticSprite3 = _interopRequireDefault(_StaticSprite2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 */

var Paper = (_dec = component('paper'), _dec(_class = function (_StaticSprite) {
    _inherits(Paper, _StaticSprite);

    function Paper() {
        _classCallCheck(this, Paper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).apply(this, arguments));
    }

    _createClass(Paper, [{
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
}(_StaticSprite3.default)) || _class);
exports.default = Paper;

},{"../common/StaticSprite":37,"spn":13}],54:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _SceneContext2 = require('../../domain/common/SceneContext');

var _SceneContext3 = _interopRequireDefault(_SceneContext2);

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
     * @return {domain.level.Field}
     */
    value: function getField() {

      return this.get('field-grid');
    }

    /**
     * Gets the character.
     *
     * @return {domain.level.Character}
     */

  }, {
    key: 'getCharacter',
    value: function getCharacter() {

      return this.get('character-on-level');
    }

    /**
     * Gets the ball
     *
     * @return {domain.level.Ball}
     */

  }, {
    key: 'getBall',
    value: function getBall() {

      return this.get('ball');
    }

    /**
     * Gets the paper.
     *
     * @return {domain.level.Paper}
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
  }]);

  return Context;
}(_SceneContext3.default);

exports.default = Context;

},{"../../domain/common/SceneContext":34}],55:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _DimensionFactory2 = require('../../domain/common/DimensionFactory');

var _DimensionFactory3 = _interopRequireDefault(_DimensionFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BOTTOM_AD_SAFETY_HEIGHT = 50; // The ad safety zone
/**
 * The layout manager for intro scene
 */

var IntroSceneLayout = function (_DimensionFactory) {
    _inherits(IntroSceneLayout, _DimensionFactory);

    function IntroSceneLayout() {
        _classCallCheck(this, IntroSceneLayout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(IntroSceneLayout).call(this, {
            marginBottom: BOTTOM_AD_SAFETY_HEIGHT,
            widthRate: 2,
            heightRate: 3
        }));
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
}(_DimensionFactory3.default);

exports.default = IntroSceneLayout;

},{"../../domain/common/DimensionFactory":27}],56:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class, _desc, _value, _class2;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _introSceneLayout = require('./intro-scene-layout');

var _introSceneLayout2 = _interopRequireDefault(_introSceneLayout);

var _playSceneLayout = require('./play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _BackgroundService = require('../../ui/common/BackgroundService');

var _BackgroundService2 = _interopRequireDefault(_BackgroundService);

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

            return new datadomain.UserRepository().get().then(function (user) {
                return new datadomain.CharacterRepository().getById(user.charId);
            }).then(function (character) {
                return _this2.character = character;
            }).then(function (character) {
                return new datadomain.LevelRepository().getById(_this2.character.position.floorObjectId);
            }).then(function (level) {
                return _this2.level = level;
            });
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
        }

        /**
         * Starts the scene
         *
         * @return {Promise}
         */

    }, {
        key: 'start',
        value: function start() {
            var _this3 = this;

            this.getPaper().show();

            return _BackgroundService2.default.turnWhite().then(function () {
                return _this3.getCharacter().moveUpOnGrid(600);
            }).then(function () {

                // the character takes the paper in the room.
                _this3.getPaper().disappear();

                var goals = $('<p />').text(_this3.level.goal.toString());

                // the character read up the goals of the room
                return _this3.getCharacter().speak(goals, { cancelDom: '.wrapper' });
            }).then(function () {

                _this3.getCharacter().hide();

                return _this3.getBall().show();
            }).then(function () {
                return _this3.elem.trigger('main.play-scene');
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

},{"../../ui/common/BackgroundService":60,"./context":54,"./intro-scene-layout":55,"./play-scene-layout":58}],57:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _class, _desc, _value, _class2;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _playSceneLayout = require('./play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _BackgroundService = require('../../ui/common/BackgroundService');

var _BackgroundService2 = _interopRequireDefault(_BackgroundService);

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

                domain.level.Cell.disappear();

                _this2.getMenuButton().hide();

                _this2.getScoreboard().disappear();

                return _this2.getField().disappear();
            }).then(function () {
                return _this2.getBall().goCenterX();
            }).then(function () {
                return _this2.getBall().goCenterY();
            }).then(function () {
                return Promise.all([_this2.getCharacter().show(400), _this2.getBall().disappear()]);
            }).then(function () {
                return _this2.getCharacter().moveTo('y', 800, 1000);
            }).then(function () {
                return _BackgroundService2.default.turnBlack();
            }).then(function () {
                return history.back();
            });
        }
    }]);

    return OutroScene;
}(_context2.default), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype)), _class2)) || _class);
exports.default = OutroScene;

},{"../../ui/common/BackgroundService":60,"./context":54,"./play-scene-layout":58}],58:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _DimensionFactory2 = require('../../domain/common/DimensionFactory');

var _DimensionFactory3 = _interopRequireDefault(_DimensionFactory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PlaySceneLayout = function (_DimensionFactory) {
    _inherits(PlaySceneLayout, _DimensionFactory);

    /**
     * @constructor
     */

    function PlaySceneLayout() {
        _classCallCheck(this, PlaySceneLayout);

        var _this // The unit rect on the left top corner.
        = _possibleConstructorReturn(this, Object.getPrototypeOf(PlaySceneLayout).call(this, {
            marginTop: TOP_UI_HEIGHT,
            marginBottom: BOTTOM_AD_SAFETY_HEIGHT,
            widthRate: 2,
            heightRate: 3
        }));

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
}(_DimensionFactory3.default);

exports.default = PlaySceneLayout;

},{"../../domain/common/DimensionFactory":27}],59:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _playSceneLayout = require('./play-scene-layout');

var _playSceneLayout2 = _interopRequireDefault(_playSceneLayout);

var _spn = require('spn');

var _FusionPreparationService = require('../../domain/level/FusionPreparationService');

var _FusionPreparationService2 = _interopRequireDefault(_FusionPreparationService);

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
            this.fps = new _FusionPreparationService2.default(layout.evalRoomGrid());
            this.fusionService = this.getAtElem('fusion-service').setGrid(layout.fusionBoxGrid());
            this.exitQueue = new domain.level.ExitQueue(layout.queueGrid());

            // ball move service
            this.bms = new domain.level.BallMoveMobLeaveService(this.getBall(), this.cells);

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

            this.getScoreboard().show();
            this.getMenuButton().show();

            return this.getField().show().then(function () {
                return _this5.getCharacter().speechEndPromise;
            }).then(function () {
                return _this5.character.reloadPlayingState();
            }).then(function () {
                return _this5.cells.appear();
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

},{"../../domain/level/FusionPreparationService":49,"./context":54,"./play-scene-layout":58,"spn":13}],60:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

},{"spn":13}],61:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _body = require('../../domain/common/body');

var _body2 = _interopRequireDefault(_body);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

            $('<div />', {
                addClass: 'result-content',
                text: 'score = ' + this.score,
                css: {
                    opacity: 0,
                    position: 'relative'
                },
                appendTo: this.elem
            });

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
}(_body2.default)) || _class);
exports.default = ResultPane;

},{"../../domain/common/body":38,"spn":13}],62:[function(require,module,exports){
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _spn = require('spn');

var _DimensionalBeing2 = require('../../domain/common/DimensionalBeing');

var _DimensionalBeing3 = _interopRequireDefault(_DimensionalBeing2);

var _util = require('../../util/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = $.cc.component;

/**
 * Scoreboard handles the behaviour of the score board of the level view.
 */

var Scoreboard = (_dec = component('scoreboard'), _dec(_class = function (_DimensionalBeing) {
    _inherits(Scoreboard, _DimensionalBeing);

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
}(_DimensionalBeing3.default)) || _class);
exports.default = Scoreboard;

},{"../../domain/common/DimensionalBeing":28,"../../util/util":66,"spn":13}],63:[function(require,module,exports){
'use strict';

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

},{}],64:[function(require,module,exports){
'use strict';

require('./ResultPane');

require('./Scoreboard');

require('./SwipeField');

},{"./ResultPane":61,"./Scoreboard":62,"./SwipeField":63}],65:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

},{}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Load image and returns promise which resolves when the image loaded.
 */
var loadImage = function loadImage(path, cls, dom) {
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
var commaNumber = function commaNumber(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

/**
 * Chains elements of the array as promise chain using the promise generating function.
 *
 * @param {Array} array The array
 * @param {Function} createPromise The function for creating promise
 */
var chainPromise = function chainPromise(array, createPromise) {
  return array.reduce(function (promise, item) {
    return promise.then(function () {
      return createPromise(item);
    });
  }, Promise.resolve());
};

exports.loadImage = loadImage;
exports.commaNumber = commaNumber;
exports.chainPromise = chainPromise;

},{}]},{},[23]);
