(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  Import support https://stackoverflow.com/questions/13673346/supporting-both-commonjs-and-amd
(function(name, definition) {
    if (typeof module !== "undefined") { module.exports = definition(); }
    else if (typeof define === "function" && typeof define.amd === "object") { define(definition); }
    else { this[name] = definition(); }
}("clipboard", function() {
  if (!document.addEventListener) {
    return null;
  }

  var clipboard = {};

  clipboard.copy = (function() {
    var _intercept = false;
    var _data = null; // Map from data type (e.g. "text/html") to value.
    var _bogusSelection = false;

    function cleanup() {
      _intercept = false;
      _data = null;
      if (_bogusSelection) {
        window.getSelection().removeAllRanges();
      }
      _bogusSelection = false;
    }

    document.addEventListener("copy", function(e) {
      if (_intercept) {
        for (var key in _data) {
          e.clipboardData.setData(key, _data[key]);
        }
        e.preventDefault();
      }
    });

    // Workaround for Safari: https://bugs.webkit.org/show_bug.cgi?id=156529
    function bogusSelect() {
      var sel = document.getSelection();
      // If "nothing" is selected...
      if (!document.queryCommandEnabled("copy") && sel.isCollapsed) {
        // ... temporarily select the entire body.
        //
        // We select the entire body because:
        // - it's guaranteed to exist,
        // - it works (unlike, say, document.head, or phantom element that is
        //   not inserted into the DOM),
        // - it doesn't seem to flicker (due to the synchronous copy event), and
        // - it avoids modifying the DOM (can trigger mutation observers).
        //
        // Because we can't do proper feature detection (we already checked
        // document.queryCommandEnabled("copy") , which actually gives a false
        // negative for Blink when nothing is selected) and UA sniffing is not
        // reliable (a lot of UA strings contain "Safari"), this will also
        // happen for some browsers other than Safari. :-()
        var range = document.createRange();
        range.selectNodeContents(document.body);
        sel.addRange(range);
        _bogusSelection = true;
      }
    };

    return function(data) {
      return new Promise(function(resolve, reject) {
        _intercept = true;
        if (typeof data === "string") {
          _data = {"text/plain": data};
        } else if (data instanceof Node) {
          _data = {"text/html": new XMLSerializer().serializeToString(data)};
        } else {
          _data = data;
        }
        try {
          bogusSelect();
          if (document.execCommand("copy")) {
            // document.execCommand is synchronous: http://www.w3.org/TR/2015/WD-clipboard-apis-20150421/#integration-with-rich-text-editing-apis
            // So we can call resolve() back here.
            cleanup();
            resolve();
          }
          else {
            throw new Error("Unable to copy. Perhaps it's not available in your browser?");
          }
        } catch (e) {
          cleanup();
          reject(e);
        }
      });
    };
  })();

  clipboard.paste = (function() {
    var _intercept = false;
    var _resolve;
    var _dataType;

    document.addEventListener("paste", function(e) {
      if (_intercept) {
        _intercept = false;
        e.preventDefault();
        var resolve = _resolve;
        _resolve = null;
        resolve(e.clipboardData.getData(_dataType));
      }
    });

    return function(dataType) {
      return new Promise(function(resolve, reject) {
        _intercept = true;
        _resolve = resolve;
        _dataType = dataType || "text/plain";
        try {
          if (!document.execCommand("paste")) {
            _intercept = false;
            reject(new Error("Unable to paste. Pasting only works in Internet Explorer at the moment."));
          }
        } catch (e) {
          _intercept = false;
          reject(new Error(e));
        }
      });
    };
  })();

  // Handle IE behaviour.
  if (typeof ClipboardEvent === "undefined" &&
      typeof window.clipboardData !== "undefined" &&
      typeof window.clipboardData.setData !== "undefined") {

    /*! promise-polyfill 2.0.1 */
    (function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void j(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=c.immediateFn||"function"==typeof setImmediate&&setImmediate||function(a){setTimeout(a,1)},k=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&k(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},"undefined"!=typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)})(this);

    clipboard.copy = function(data) {
      return new Promise(function(resolve, reject) {
        // IE supports string and URL types: https://msdn.microsoft.com/en-us/library/ms536744(v=vs.85).aspx
        // We only support the string type for now.
        if (typeof data !== "string" && !("text/plain" in data)) {
          throw new Error("You must provide a text/plain type.");
        }

        var strData = (typeof data === "string" ? data : data["text/plain"]);
        var copySucceeded = window.clipboardData.setData("Text", strData);
        if (copySucceeded) {
          resolve();
        } else {
          reject(new Error("Copying was rejected."));
        }
      });
    };

    clipboard.paste = function() {
      return new Promise(function(resolve, reject) {
        var strData = window.clipboardData.getData("Text");
        if (strData) {
          resolve(strData);
        } else {
          // The user rejected the paste request.
          reject(new Error("Pasting was rejected."));
        }
      });
    };
  }

  return clipboard;
}));

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

console.log('DEBUG MODE');

require('../../../src/debug/debug-panel');
require('../../../src/debug/ls-switch/component');
require('../../../src/debug/level-unlock');
require('../../../src/debug/asset-unlock-all');

},{"../../../src/debug/asset-unlock-all":4,"../../../src/debug/debug-panel":5,"../../../src/debug/level-unlock":6,"../../../src/debug/ls-switch/component":7}],4:[function(require,module,exports){
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

var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var AssetUnlockAll = (_dec = on('click'), component(_class = (_class2 = function () {
  function AssetUnlockAll() {
    _classCallCheck(this, AssetUnlockAll);
  }

  _createClass(AssetUnlockAll, [{
    key: 'getFloorAssets',

    /**
     * @return {FloorAssetCollection}
     */
    value: function getFloorAssets() {
      return $('.floor-asset-collection').cc.get('floor-asset-collection');
    }

    /**
     * Unlocks all the assets in the floor.
     * @param {object} e The event
     */

  }, {
    key: 'unlockAll',
    value: function unlockAll() {
      var floorAssets = this.getFloorAssets();

      floorAssets.items.forEach(function (item) {
        floorAssets.unlockById(item.id);
      });
    }
  }]);

  return AssetUnlockAll;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'unlockAll', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'unlockAll'), _class2.prototype)), _class2)) || _class);


module.exports = AssetUnlockAll;

},{}],5:[function(require,module,exports){
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

var div = _require.div;
var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;
var DebugPanel = (_dec = on('click').at('.toggle'), _dec2 = on('click').at('h2'), component(_class = (_class2 = function () {
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
    key: 'onToggle',
    value: function onToggle() {
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
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onToggle', [_dec, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onToggle'), _class2.prototype)), _class2)) || _class);


module.exports = DebugPanel;

},{"dom-gen":2}],6:[function(require,module,exports){
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

var _$$cc = $.cc;
var component = _$$cc.component;
var on = _$$cc.on;

/**
 * Unlocks the level in the debug panel.
 */

var LevelUnlock = (_dec = on('click'), component(_class = (_class2 = function () {
  function LevelUnlock() {
    _classCallCheck(this, LevelUnlock);
  }

  _createClass(LevelUnlock, [{
    key: 'getFloorAssets',

    /**
     * Gets the floor assets.
     * @return {FloorAssetCollection}
     */
    value: function getFloorAssets() {
      return $('.floor-asset-collection').cc.get('floor-asset-collection');
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var _this = this;

      var assetIds = window.prompt('Unlock which level?');

      assetIds.split(/,| +/).forEach(function (assetId) {
        return _this.unlockById(assetId);
      });
    }
  }, {
    key: 'unlockById',
    value: function unlockById(assetId) {
      var asset = this.getFloorAssets().findById(assetId);

      if (!asset) {
        window.alert('Sorry, could not find level ' + assetId + ' in this floor');
        return;
      }

      this.getFloorAssets().unlockById(assetId).then(function () {
        console.log('Unlocked: ' + assetId);
      });
    }
  }]);

  return LevelUnlock;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onClick', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'onClick'), _class2.prototype)), _class2)) || _class);


module.exports = LevelUnlock;

},{}],7:[function(require,module,exports){
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

var _$$cc = $.cc;
var on = _$$cc.on;
var component = _$$cc.component;

var _require = require('dom-gen');

var button = _require.button;


var ls = window.localStorage;
var copy = require('clipboard-js').copy;

var LsSwitch = (_dec = on('click').at('.apply'), _dec2 = on('click').at('.copy'), component(_class = (_class2 = function () {
  _createClass(LsSwitch, null, [{
    key: 'getData',
    value: function getData() {
      var dump = {};

      Object.keys(ls).forEach(function (key) {
        dump[key] = JSON.parse(ls[key]);
      });

      return dump;
    }
  }, {
    key: 'getJSON',
    value: function getJSON() {
      return JSON.stringify(LsSwitch.getData(), null, 2);
    }
  }, {
    key: 'copyJSON',
    value: function copyJSON() {
      copy(LsSwitch.getJSON());
    }
  }, {
    key: 'apply',
    value: function apply(data) {
      ls.clear();

      Object.keys(data).forEach(function (key) {
        ls[key] = JSON.stringify(data[key]);
      });
    }
  }]);

  function LsSwitch(elem) {
    _classCallCheck(this, LsSwitch);

    var source = window.presets;

    elem.append(button('COPY').addClass('copy'), '|');

    Object.keys(source).forEach(function (name) {
      elem.append(button(name).addClass('apply').data('data', source[name]));
    });
  }

  _createClass(LsSwitch, [{
    key: 'apply',
    value: function apply(e) {
      var data = $(e.target).data('data');

      console.log('LsSwitch: Applying the preset data to localStorage.');
      console.log(JSON.stringify(data));

      LsSwitch.apply(data);
    }
  }, {
    key: 'copy',
    value: function copy() {
      console.log('LsSwitch: Copying the localStorage to the clipboard.');

      LsSwitch.copyJSON();
    }
  }]);

  return LsSwitch;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'apply', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'apply'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'copy', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'copy'), _class2.prototype)), _class2)) || _class);


window.LsSwitch = LsSwitch;

module.exports = LsSwitch;

},{"clipboard-js":1,"dom-gen":2}]},{},[3]);
