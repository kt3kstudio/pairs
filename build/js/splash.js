(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./if-num-else":16,"./reflow":24,"./wait":25}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./area":2,"./being":3,"./if-num-else":16,"./point":21,"./posture":22,"./reflow":24,"./wait":25}],5:[function(require,module,exports){
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
},{"../animation":1}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
'use strict';

exports.animation = require('./animation');
exports.ratio = require('./ratio');
exports.transition = require('./transition');
exports.width = require('./width');
exports.height = require('./height');
exports.margin = require('./margin');
},{"./animation":5,"./height":6,"./margin":8,"./ratio":9,"./transition":10,"./width":11}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
"use strict";

exports.UP = 0;
exports.TOP = 0;
exports.LEFT = 1;
exports.RIGHT = 2;
exports.BOTTOM = 3;
exports.DOWN = 3;
},{}],14:[function(require,module,exports){
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
},{"./body":4}],15:[function(require,module,exports){
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
},{"./if-num-else":16,"./rect":23}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{"./animation":1,"./area":2,"./being":3,"./body":4,"./decorators":7,"./dir-state-image-map":12,"./dirs":13,"./grid":15,"./grid-walker":14,"./if-num-else":16,"./image":17,"./layout-factory":20,"./point":21,"./posture":22,"./rect":23,"./reflow":24,"./wait":25}],19:[function(require,module,exports){
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
},{"./rect":23}],20:[function(require,module,exports){
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
},{"./grid":15,"./rect":23}],21:[function(require,module,exports){
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
},{"./dirs":13}],22:[function(require,module,exports){
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
},{"./if-num-else":16,"./rect":23}],23:[function(require,module,exports){
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
},{"./area":2,"./grid":15,"./if-num-else":16,"./interval":19}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
'use strict';

require('../../src/splash/splash-scene');

},{"../../src/splash/splash-scene":28}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn');

var wait = _require.wait;
var Being = _require.Being;
var Animation = _require.Animation;
var component = $.cc.component;

/**
 * Logo animation componenent in the splash screen.
 */

var Logo = (_dec = component('splash-logo'), _dec(_class = function (_Being) {
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
      return new Animation('logo-show', 350);
    }
  }, {
    key: 'hideAnim',
    value: function hideAnim() {
      return new Animation('logo-hide', 350);
    }
  }]);

  return Logo;
}(Being)) || _class);

module.exports = Logo;

},{"spn":18}],28:[function(require,module,exports){
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

require('./logo');
var scene = require('../ui/scene');

var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

/**
 * SplashScene controls the splash screen.
 */

var SplashScene = (_dec = scene.primary, _dec2 = on('click').at('.splash-logo'), _dec(_class = component(_class = (_class2 = function () {
  function SplashScene() {
    _classCallCheck(this, SplashScene);
  }

  _createClass(SplashScene, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return this.performSplash('studio').then(function () {
        return _this.performSplash('straw');
      }).then(function () {
        return _this.goToTitle();
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
}(), (_applyDecoratedDescriptor(_class2.prototype, 'goToTitle', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'goToTitle'), _class2.prototype)), _class2)) || _class) || _class);

module.exports = SplashScene;

},{"../ui/scene":30,"./logo":27}],29:[function(require,module,exports){
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

},{"spn":18}],30:[function(require,module,exports){
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

},{"./common/background-service":29}]},{},[26]);
