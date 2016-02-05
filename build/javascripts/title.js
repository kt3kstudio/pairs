(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../../src/domain/title/TitleScene');

},{"../../src/domain/title/TitleScene":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _SceneContext2 = require('../common/SceneContext');

var _SceneContext3 = _interopRequireDefault(_SceneContext2);

var _BackgroundService = require('../../ui/common/BackgroundService');

var _BackgroundService2 = _interopRequireDefault(_BackgroundService);

var _util = require('../../util/util');

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

var event = $.cc.event;

/**
 * TitleScene class handles the motions sequences of the title scene.
 */
var TitleScene = (_dec = $.cc.Component('title-scene'), _dec2 = event('scene-start'), _dec(_class = (_class2 = function (_SceneContext) {
    _inherits(TitleScene, _SceneContext);

    function TitleScene() {
        _classCallCheck(this, TitleScene);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TitleScene).apply(this, arguments));
    }

    _createClass(TitleScene, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            (0, _util.loadImage)('images/title-logo.svg', 'title-logo elem', this.elem).then(function ($img) {
                return $img.anim('title-appear', 2000).then(function () {
                    return $img.animation('float 6000ms infinite');
                });
            });

            wait(500).then(function () {

                _this2.getMenuButton().show();

                $('<p />').text('GET UP').addClass('touch-here elem').appendTo(_this2.elem).click(function () {
                    return _this2.goToMap();
                }).anim('title-appear', 1000).then(function (p) {
                    return p.animation('float 1000ms infinite');
                });
            });
        }

        /**
         * Fades out the scene.
         */

    }, {
        key: 'fadeOut',
        value: function fadeOut() {

            return Promise.all([this.getMenuButton().hide(), $('.elem').css('opacity', 0).anim('disappear', 500).then(function () {

                $('.elem').remove();

                return wait(100);
            })]);
        }

        /**
         * Transions to the map scene.
         */

    }, {
        key: 'goToMap',
        value: function goToMap() {

            this.fadeOut().then(function () {
                return _BackgroundService2.default.turnBlack();
            }).then(function () {

                location.href = 'map.html';
            });
        }
    }]);

    return TitleScene;
}(_SceneContext3.default), (_applyDecoratedDescriptor(_class2.prototype, 'start', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'start'), _class2.prototype)), _class2)) || _class);

},{"../../ui/common/BackgroundService":4,"../../util/util":5,"../common/SceneContext":2}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      return wait(dur);
    }
  }]);

  return BackgroundService;
}();

exports.default = BackgroundService;

},{}],5:[function(require,module,exports){
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

},{}]},{},[1]);
