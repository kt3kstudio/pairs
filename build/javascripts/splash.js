(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

var _reflow = require('./reflow');

var _reflow2 = _interopRequireDefault(_reflow);

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
   * @return {Promise}
   */

  _createClass(Animation, [{
    key: 'apply',
    value: function apply(elem) {

      elem.css(ANIMATION_PROP_NAME, '');

      (0, _reflow2.default)(elem);

      elem.css(ANIMATION_PROP_NAME, this.name + ' ' + this.duration + 'ms');

      return (0, _wait2.default)(this.duration);
    }
  }]);

  return Animation;
})();

exports.default = Animation;
},{"./reflow":13,"./wait":16}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Being = function Being() {
  _classCallCheck(this, Being);
};

exports.default = Being;
},{}],3:[function(require,module,exports){
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
},{"./being":2}],4:[function(require,module,exports){
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
},{"./sprite":14}],5:[function(require,module,exports){
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
},{"./rect":12}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"./body":3}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function Grid() {
  _classCallCheck(this, Grid);
};

exports.default = Grid;
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function Image() {
  _classCallCheck(this, Image);
};

exports.default = Image;
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRS = exports.StaticSprite = exports.CharSprite = exports.Sprite = exports.Image = exports.Animation = exports.GridWalker = exports.Grid = exports.Rect = exports.DimensionFactory = exports.Posture = exports.wait = undefined;

var _wait = require('./wait');

var _wait2 = _interopRequireDefault(_wait);

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
exports.Posture = _posture2.default;
exports.DimensionFactory = _dimensionFactory2.default;
exports.Rect = _rect2.default;
exports.Grid = _grid2.default;
exports.GridWalker = _gridWalker2.default;
exports.Animation = _animation2.default;
exports.Image = _image2.default;
exports.Sprite = _sprite2.default;
exports.CharSprite = _charSprite2.default;
exports.StaticSprite = _staticSprite2.default;
exports.DIRS = DIRS;
},{"./animation":1,"./char-sprite":4,"./dimension-factory":5,"./dirs":6,"./grid":8,"./grid-walker":7,"./image":9,"./posture":11,"./rect":12,"./sprite":14,"./static-sprite":15,"./wait":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Posture = function Posture() {
  _classCallCheck(this, Posture);
};

exports.default = Posture;
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function Rect() {
  _classCallCheck(this, Rect);
};

exports.default = Rect;
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
},{"./grid-walker":7}],15:[function(require,module,exports){
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
},{"./sprite":14}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
'use strict';

require('../../src/domain/splash/SplashScene');

},{"../../src/domain/splash/SplashScene":21}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Actor is the base class for the class components which has its visual representation.
 */

var Actor = function (_$$cc$Actor) {
  _inherits(Actor, _$$cc$Actor);

  function Actor() {
    _classCallCheck(this, Actor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Actor).apply(this, arguments));
  }

  return Actor;
}($.cc.Actor);

exports.default = Actor;

},{}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Actor2 = require('./Actor');

var _Actor3 = _interopRequireDefault(_Actor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Actor with visual representation which has the phases, such as show/hide, appear/disappear.
 */

var Being = function (_Actor) {
  _inherits(Being, _Actor);

  function Being() {
    _classCallCheck(this, Being);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Being).apply(this, arguments));
  }

  _createClass(Being, [{
    key: 'showAnim',

    /**
     * @abstract
     */
    value: function showAnim() {
      return null;
    }

    /**
     * @abstract
     */

  }, {
    key: 'hideAnim',
    value: function hideAnim() {
      return null;
    }

    /**
     * @abstract
     */

  }, {
    key: 'willShow',
    value: function willShow() {}

    /**
     * @abstract
     */

  }, {
    key: 'didShow',
    value: function didShow() {}

    /**
     * 表示時アニメーションプロパティ (showAnim) に従ってアニメーションさせる。
     *
     * 事前に willShow hook, 事後に didShow hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: 'show',
    value: function show(dur) {
      var _this2 = this;

      return Promise.resolve(this.willShow()).then(function () {

        var anim = _this2.showAnim();

        return anim != null && anim.apply(_this2.elem);
      }).then(function () {
        return _this2.didShow();
      });
    }

    /**
     * @abstract
     */

  }, {
    key: 'willHide',
    value: function willHide() {}

    /**
     * @abstract
     */

  }, {
    key: 'didHide',
    value: function didHide() {}

    /**
     * 非表示時アニメーションプロパティ (hideAnim) に従ってアニメーションさせる。
     *
     * 事前に willHide hook, 事後に didHide hook を呼び出す。
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: 'hide',
    value: function hide(dur) {
      var _this3 = this;

      return Promise.resolve(this.willHide()).then(function () {

        var anim = _this3.hideAnim();

        return anim != null && anim.apply(_this3.elem);
      }).then(function () {
        return _this3.didHide();
      });
    }

    /**
     * Hides and removes the component.
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */

  }, {
    key: 'disappear',
    value: function disappear(dur) {
      var _this4 = this;

      return this.hide(dur).then(function () {
        return _this4.elem.remove();
      });
    }
  }]);

  return Being;
}(_Actor3.default);

exports.default = Being;

},{"./Actor":18}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _Being2 = require('../common/Being');

var _Being3 = _interopRequireDefault(_Being2);

var _spn = require('spn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Logo animation componenent in the splash screen.
 */
var Logo = (_dec = $.cc.Component('splash-logo'), _dec(_class = function (_Being) {
    _inherits(Logo, _Being);

    function Logo() {
        _classCallCheck(this, Logo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Logo).apply(this, arguments));
    }

    _createClass(Logo, [{
        key: 'perform',

        /**
         * Performs splash screen's logo animation.
         *
         * @return {Promise}
         */
        value: function perform() {
            var _this2 = this;

            return this.show().then(function () {
                return wait(700);
            }).then(function () {
                return _this2.hide();
            });
        }
    }, {
        key: 'willShow',
        value: function willShow() {

            return this.elem.imageLoaded();
        }
    }, {
        key: 'didShow',
        value: function didShow() {

            this.elem.css('opacity', 1);
        }
    }, {
        key: 'didHide',
        value: function didHide() {

            this.elem.css('opacity', 0);
        }
    }, {
        key: 'showAnim',
        value: function showAnim() {

            return new _spn.Animation('logo-show', 350);
        }
    }, {
        key: 'hideAnim',
        value: function hideAnim() {

            return new _spn.Animation('logo-hide', 350);
        }
    }]);

    return Logo;
}(_Being3.default)) || _class);

},{"../common/Being":19,"spn":10}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

require('./Logo');

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

/**
 * SplashScene controls the splash screen.
 */
var SplashScene = (_dec = $.cc.Component('splash-scene'), _dec2 = $.cc.event('scene-start'), _dec3 = $.cc.event('click', '.splash-logo'), _dec(_class = (_class2 = function (_$$cc$Coelement) {
    _inherits(SplashScene, _$$cc$Coelement);

    function SplashScene() {
        _classCallCheck(this, SplashScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SplashScene).apply(this, arguments));
    }

    _createClass(SplashScene, [{
        key: 'main',
        value: function main() {
            var _this2 = this;

            return this.performSplash('studio').then(function () {
                return _this2.performSplash('straw');
            }).then(function () {
                return _this2.goToTitle();
            });
        }

        /**
         * Performs splash scene animation for the give class name element.
         *
         * @param {String} className The class name to animate
         * @return {Promise}
         */

    }, {
        key: 'performSplash',
        value: function performSplash(className) {

            return this.elem.find('.splash-logo.' + className).cc.get('splash-logo').perform();
        }

        /**
         * The scene goes to the title.
         */

    }, {
        key: 'goToTitle',
        value: function goToTitle() {

            location.replace('title.html');
        }
    }]);

    return SplashScene;
}($.cc.Coelement), (_applyDecoratedDescriptor(_class2.prototype, 'main', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'main'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'goToTitle', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'goToTitle'), _class2.prototype)), _class2)) || _class);

},{"./Logo":20}]},{},[17]);
