(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.spn = global.spn || {})));
}(this, (function (exports) { 'use strict';

/**
 * Returns a promise which resolves in the given milliseconds.
 *
 * @param {number} n The time in milliseconds
 * @param {object} result The value to resolve
 * @return {Promise}
 */
var wait = function (n, result) { return new Promise(function (resolve) { return setTimeout(function () { return resolve(result); }, n); }); };

var x = 0; // dummy variable for preventing lint error and unwanted optimization of uglify

/**
 * Reflows the given element
 *
 * @param {HTMLElement} el The element
 */
var reflow = function (el) {
  x = el.offsetHeight;
};

/**
 * Creates an error from the given params.
 * @param {number} code The error code
 * @param {string} message The error message
 * @return {Error}
 */
var error = function (ref) {
  var code = ref.code;
  var message = ref.message;

  var error = new Error(message);

  error.code = code;

  return error
};

/**
 * Shorthand for `typeof num === 'number' ? num : defaultValue`.
 * @param {object} num The number or anthing
 * @param {number} defaultValue The default value
 * @return {number}
 */
var ifNumElse = function (num, defaultValue) { return typeof num === 'number' ? num : defaultValue; };

/**
 * @param {any} self The self object
 * @param {any} method The method
 * @param {?Array} args The parameters
 */
var applyIfFunction = function (self, method, args) { return typeof method === 'function' ? method.apply(self, args) : null; };

/**
 * Triggers the given type of event at the given element without bubbling.
 * @param {string} type The event type
 * @param {HTMLElement} el The element
 */
var triggerNoBubble = function (type, el) {
  el.dispatchEvent(new CustomEvent(type, { bubbles: false }));
};

var ANIMATION_PROP_NAME = '-webkit-animation';

/**
 * Animation class represents the css animation.
 */
var Animation = function Animation (name, duration) {
  this.name = name;
  this.duration = duration;
};

/**
 * @param {HTMLElement} el The dom element
 * @param {number} dur The duration
 * @return {Promise}
 */
Animation.prototype.apply = function apply (el, dur) {
  var $el = $(el);
  $el.css(ANIMATION_PROP_NAME, '');

  reflow(el);

  $el.css(ANIMATION_PROP_NAME, this.name + ' ' + ifNumElse(dur, this.duration) + 'ms');

  return wait(this.duration)
};

/**
 * The model of the size of 2-dimensional rectangles.
 */
var Area = function Area (width, height) {
  this.width = width;
  this.height = height;
};

/**
 * Returns a scaled area with the given scales.
 * @param {number} scaleX The x scale
 * @param {number} [scaleY] The y scale
 */
Area.prototype.scale = function scale (scaleX, scaleY) {
  if (scaleY == null) {
    scaleY = scaleX;
  }

  return new Area(this.width * scaleX, this.height * scaleY)
};

/**
 * Returns a area of the square of the given side size.
 * @param {number} size The size of a side
 */
Area.square = function square (size) {
  return new Area(size, size)
};

var SHOWING_CLASS = 'showing';
var SHOWN_CLASS = 'shown';
var SHOWING_EVENT = 'showing';
var SHOWN_EVENT = 'shown';
var HIDING_EVENT = 'hiding';
var HIDDEN_EVENT = 'hidden';

/**
 * @param {Object} instance The instance
 * @param {Function} beforeMethod The method before the main
 * @param {Function} afterMethod The method after the main
 * @param {Function} main The main function
 * @return {Promise}
 */
var applyBeforeAfter = function (instance, beforeMethod, afterMethod, main) { return (
  Promise.resolve(applyIfFunction(instance, beforeMethod))
    .then(main)
    .then(function () { return applyIfFunction(instance, afterMethod); })
); };

/**
 * @param {HTMLElement} el The element
 * @param {string} beforeEvent The event before the func
 * @param {string} afterEvent The event after the func
 * @param {Function} func The function
 * @return {Promise}
 */
var triggerNoBubbleBeforeAfter = function (el, beforeEvent, afterEvent, func) {
  triggerNoBubble(beforeEvent, el);

  return func().then(function () { return triggerNoBubble(afterEvent, el); })
};

/**
 * @param {HTMLElement} el The element
 * @param {string} beforeClass The class which toogled before the func
 * @param {string} afterClass The class which toogled after the func
 * @param {boolean} toggleState True for adding, false for removing
 * @param {Function} func The function
 * @return {Promise}
 */
var toggleClassBeforeAfter = function (el, beforeClass, afterClass, toggleState, func) {
  el.classList.toggle(beforeClass, toggleState);

  return func().then(function () { return el.classList.toggle(afterClass, toggleState); })
};

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */
var Being = function Being () {};

Being.prototype.show = function show (dur) {
    var this$1 = this;

  return toggleClassBeforeAfter(this.el, SHOWING_CLASS, SHOWN_CLASS, true, function () { return triggerNoBubbleBeforeAfter(this$1.el, SHOWING_EVENT, SHOWN_EVENT, function () { return this$1.__show(dur); }); })
};

Being.prototype.__show = function __show (dur) {
    var this$1 = this;

  return applyBeforeAfter(this, this.willShow, this.didShow, function () {
    var anim = applyIfFunction(this$1, this$1.showAnim);

    return Promise.all([
      wait(ifNumElse(this$1.constructor.SHOW_DURATION, 0)),
      anim && anim.apply(this$1.el, dur)
    ])
  })
};

/**
 * Hides the element using the animation returned by hideAnim.
 *
 * This invokes `willHide` before and `didHide` after.
 * This removes `shown` class before and `showing` class after.
 * This emits `hiding` event before and `hidden` event after.
 *
 * @param {number} dur The duration of the animation
 * @return {Promise}
 */
Being.prototype.hide = function hide (dur) {
    var this$1 = this;

  return toggleClassBeforeAfter(this.el, SHOWN_CLASS, SHOWING_CLASS, false, function () { return triggerNoBubbleBeforeAfter(this$1.el, HIDING_EVENT, HIDDEN_EVENT, function () { return this$1.__hide(dur); }); })
};

Being.prototype.__hide = function __hide (dur) {
    var this$1 = this;

  return applyBeforeAfter(this, this.willHide, this.didHide, function () {
    var anim = applyIfFunction(this$1, this$1.hideAnim);

    return Promise.all([
      wait(ifNumElse(this$1.constructor.SHOW_DURATION, 0)),
      anim && anim.apply(this$1.el, dur)
    ])
  })
};

/**
 * Hides the component and then removes it.
 *
 * @param {Number} dur The duration of the animation
 * @return {Promise}
 */
Being.prototype.disappear = function disappear (dur) {
    var this$1 = this;

  return this.hide(dur).then(function () { return this$1.$el.remove(); })
};

var INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS = {
  code: 10001,
  message: 'Too much arguments, could not slice'
};

var INTERVAL_SLICE_ERROR_ONLY_WIDTH = {
  code: 10002,
  message: 'Only width is given, could not slice'
};

var RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_VERTICALLY = {
  code: 11001,
  message: 'Too much arguments (top, height, bottom) are given vertically, could not slice'
};

var RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_HORIZONTALLY = {
  code: 11002,
  message: 'Too much arguments (left, width, right) are given horizontally, could not slice'
};

var RECT_SLICE_ERROR_ONLY_WIDTH = {
  code: 11003,
  message: 'Only width is given horizontally, left or right is required'
};

var RECT_SLICE_ERROR_ONLY_HEIGHT = {
  code: 11004,
  message: 'Only height is given vertically, top or bottom is required'
};

var UP$1 = 0;
var TOP = 0;
var LEFT$1 = 1;
var RIGHT$1 = 2;
var BOTTOM = 3;
var DOWN$1 = 3;


var DIRS = Object.freeze({
	UP: UP$1,
	TOP: TOP,
	LEFT: LEFT$1,
	RIGHT: RIGHT$1,
	BOTTOM: BOTTOM,
	DOWN: DOWN$1
});

var DEFAULT_TRANSITION_DURATION = 500;

var UP = DIRS.UP;
var LEFT = DIRS.LEFT;
var RIGHT = DIRS.RIGHT;
var DOWN = DIRS.DOWN;

/**
 * The model of the positions of points in 2-dimensional space.
 */
var Point = function Point (x, y) {
  this.x = x;
  this.y = y;
};

/**
 * Returns the point above the given distance.
 * @param {number} distance The distance
 */
Point.prototype.up = function up (distance) {
  return new Point(this.x, this.y - distance)
};

/**
 * Returns the point left of the given distance.
 * @param {number} distance The distance
 */
Point.prototype.left = function left (distance) {
  return new Point(this.x - distance, this.y)
};

/**
* Returns the point right of the given distance.
* @param {number} distance The distance
 */
Point.prototype.right = function right (distance) {
  return new Point(this.x + distance, this.y)
};

/**
* Returns the point below the given distance.
* @param {number} distance The distance
 */
Point.prototype.down = function down (distance) {
  return new Point(this.x, this.y + distance)
};

/**
 * Gets the direction to the given point (one of '')
 * @param {Point}
 * @return {Point}
 */
Point.prototype.minus = function minus (point) {
  return new Point(this.x - point.x, this.y - point.y)
};

/**
 */
Point.prototype.getDir = function getDir () {
  if (Math.abs(this.x) >= Math.abs(this.y)) {
    if (this.x >= 0) {
      return RIGHT
    }
    return LEFT
  }

  if (this.y > 0) {
    return DOWN
  }
  return UP
};

var rePercent = /(-?[0-9]+(\.[0-9]*)?)%$/;

/**
 * @param {number|string} value The value of the margin or width
 * @param {number} length The whole length of the internval
 * @return {number}
 */
var calc = function (value, length) {
  if (value == null) {
    return value
  }

  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string' && rePercent.test(value)) {
    var match = value.match(rePercent);
    var percent = +match[1];

    return length * percent / 100
  }

  throw new Error(("The given number is invalid: '" + value + "' type: " + (typeof value)))
};

/**
 * Interval model represents the interval on the line.
 *
 * Interval is immutable.
 */
var Interval$$1 = function Interval$$1 (high, low) {
  if (high < low) {
    var assign;
    (assign = [low, high], high = assign[0], low = assign[1]);
  }

  this.high = high;
  this.low = low;
};

/**
 * Returns the width of the interval.
 *
 * @return {number}
 */
Interval$$1.prototype.width = function width () {
  return this.high - this.low
};

/**
 * Returns the middle of the interval.
 *
 * @return {number}
 */
Interval$$1.prototype.middle = function middle () {
  return (this.high + this.low) / 2
};

/**
 * Returns a product (a rect) of the intervals.
 *
 * @param {Interval} interval
 * @param {Rect}
 */
Interval$$1.prototype.by = function by (interval) {
  return Rect$$1.ofIntervals(this, interval)
};

/**
 * @param {number} width
 * @return {Interval}
 */
Interval$$1.prototype.cutHigh = function cutHigh (width$$1) {
  return new Interval$$1(this.high, this.high - width$$1)
};

/**
 * @param {number} width
 * @return {Interval}
 */
Interval$$1.prototype.cutLow = function cutLow (width$$1) {
  return new Interval$$1(this.low + width$$1, this.low)
};

/**
 * Returns an interval which is shifted the given amount.
 *
 * @param {number} shift The amount of shift, n means shift higher position by its size * n
 * @return {Interval}
 */
Interval$$1.prototype.shift = function shift (n) {
  var shiftWidth = this.width() * n;

  return new Interval$$1(this.high + shiftWidth, this.low + shiftWidth)
};

/**
 * @param {number} highMargin
 * @param {number} lowMargin
 * @return {Interval}
 */
Interval$$1.prototype.margin = function margin (highMargin, lowMargin) {
  return new Interval$$1(this.high - highMargin, this.low + lowMargin)
};

/**
 * Slices out an interval from the given parameters.
 * @param {number|string} high The higher margin
 * @param {number|string} width The width
 * @param {number|string} low The lower margin
 */
Interval$$1.prototype.slice = function slice (low, width$$1, high) {
  high = calc(high, this.width());
  width$$1 = calc(width$$1, this.width());
  low = calc(low, this.width());

  if (high != null && width$$1 != null && low != null) {
    throw error(INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS)
  }

  if (high != null && low != null) {
    return this.margin(high, low)
  }

  if (high != null && width$$1 != null) {
    return this.margin(high, 0).cutHigh(width$$1)
  }

  if (width$$1 != null && low != null) {
    return this.margin(0, low).cutLow(width$$1)
  }

  if (width$$1 != null) {
    throw error(INTERVAL_SLICE_ERROR_ONLY_WIDTH)
  }

  if (high != null) {
    return this.margin(high, 0)
  }

  if (low != null) {
    return this.margin(0, low)
  }

  return this
};

/**
 * @param {number} size The size of the interval
 * @return {Interval}
 */
Interval$$1.ofSize = function ofSize (size) {
  return new Interval$$1(size, 0)
};

/**
 * Rect model represents the static rectangle in a screen.
 *
 * Rect is immutable.
 */
var Rect$$1 = function Rect$$1 (ref) {
  var top = ref.top;
  var right = ref.right;
  var bottom = ref.bottom;
  var left = ref.left;

  this.horizontal = new Interval$$1(right, left);
  this.vertical = new Interval$$1(bottom, top);
};

var prototypeAccessors = { top: {},bottom: {},left: {},right: {} };

/**
 * Gets the top position.
 * @return {number}
 */
prototypeAccessors.top.get = function () {
  return this.vertical.low
};

/**
 * Gets the bottom position.
 * @return {number}
 */
prototypeAccessors.bottom.get = function () {
  return this.vertical.high
};

/**
 * Gets the left position.
 * @return {number}
 */
prototypeAccessors.left.get = function () {
  return this.horizontal.low
};

/**
 * Gets the right position.
 * @return {number}
 */
prototypeAccessors.right.get = function () {
  return this.horizontal.high
};

Rect$$1.ofIntervals = function ofIntervals (horizontal, vertical) {
  return new Rect$$1({
    top: vertical.low,
    bottom: vertical.high,
    left: horizontal.low,
    right: horizontal.high
  })
};

/**
 * Gets the width.
 *
 * @return {number}
 */
Rect$$1.prototype.width = function width () {
  return this.horizontal.width()
};

/**
 * Gets the height.
 *
 * @return {number}
 */
Rect$$1.prototype.height = function height () {
  return this.vertical.width()
};

/**
 * Gets the horizontal center.
 *
 * @return {number}
 */
Rect$$1.prototype.centerX = function centerX () {
  return this.horizontal.middle()
};

/**
 * Gets the vertical center.
 *
 * @return {number}
 */
Rect$$1.prototype.centerY = function centerY () {
  return this.vertical.middle()
};

/**
 * Returns a new rect which scales the top side
 *
 * @param {number} scale The scale rate
 * @return {Rect}
 */
Rect$$1.prototype.scaleTop = function scaleTop (scale) {
  return this.cutBottom(this.height() * scale)
};

/**
 * Returns a new rect which scales the left side
 *
 * @param {number} scale The scale rate
 * @return {Rect}
 */
Rect$$1.prototype.scaleLeft = function scaleLeft (scale) {
  return this.cutRight(this.width() * scale)
};

/**
 * Returns a new rect which scales the right side
 *
 * @param {number} scale The scale rate
 * @return {Rect}
 */
Rect$$1.prototype.scaleRight = function scaleRight (scale) {
  return this.cutLeft(this.width() * scale)
};

/**
 * Returns a new rect which scales the bottom side
 *
 * @param {number} scale The scale rate
 * @return {Rect}
 */
Rect$$1.prototype.scaleBottom = function scaleBottom (scale) {
  return this.cutTop(this.height() * scale)
};

/**
 * Shifts up by the given number of units.
 *
 * @param {number} n The number to shift
 * @return {Rect}
 */
Rect$$1.prototype.shiftUp = function shiftUp (n) {
    if ( n === void 0 ) n = 1;

  return this.horizontal.by(this.vertical.shift(-n))
};

/**
 * Shifts left by the given number of units.
 *
 * @param {number} n The number to shift
 * @return {Rect}
 */
Rect$$1.prototype.shiftLeft = function shiftLeft (n) {
    if ( n === void 0 ) n = 1;

  return this.horizontal.shift(-n).by(this.vertical)
};

/**
 * Shifts right by the given number of units.
 *
 * @param {number} n The number to shift
 * @return {Rect}
 */
Rect$$1.prototype.shiftRight = function shiftRight (n) {
    if ( n === void 0 ) n = 1;

  return this.horizontal.shift(n).by(this.vertical)
};

/**
 * Shifts down by the given number of units.
 *
 * @param {number} n The number to shift
 * @return {Rect}
 */
Rect$$1.prototype.shiftDown = function shiftDown (n) {
    if ( n === void 0 ) n = 1;

  return this.horizontal.by(this.vertical.shift(n))
};

/**
 * Cuts out the given height from the top.
 *
 * @param {number} [height=0] The height
 * @return {Rect}
 */
Rect$$1.prototype.cutTop = function cutTop (height$$1) {
  return this.horizontal.by(this.vertical.cutLow(height$$1))
};

/**
 * Cuts out the given height from the left.
 *
 * @param {number} [width=0] The width
 * @return {Rect}
 */
Rect$$1.prototype.cutLeft = function cutLeft (width$$1) {
  return this.horizontal.cutLow(width$$1).by(this.vertical)
};

/**
 * Cuts out the given height from the right.
 *
 * @param {number} [width=0] The width
 * @return {Rect}
 */
Rect$$1.prototype.cutRight = function cutRight (width$$1) {
  return this.horizontal.cutHigh(width$$1).by(this.vertical)
};

/**
 * Cuts out the given height from the bottom.
 *
 * @param {number} [height=0] The height
 * @return {Rect}
 */
Rect$$1.prototype.cutBottom = function cutBottom (height$$1) {
  return this.horizontal.by(this.vertical.cutHigh(height$$1))
};

/**
 * Return the next rect which shares the top side of the given height
 *
 * @param {number} height The height
 * @return {Rect}
 */
Rect$$1.prototype.extCutTop = function extCutTop (height$$1) {
  return this.shiftUp().cutBottom(height$$1)
};

/**
 * Return the next rect which shares the left side of the given width
 *
 * @param {number} width The width
 * @return {Rect}
 */
Rect$$1.prototype.extCutLeft = function extCutLeft (width$$1) {
  return this.shiftLeft().cutRight(width$$1)
};

/**
 * Return the next rect which shares the right side of the given width
 *
 * @param {number} width The width
 * @return {Rect}
 */
Rect$$1.prototype.extCutRight = function extCutRight (width$$1) {
  return this.shiftRight().cutLeft(width$$1)
};

/**
 * Return the next rect which shares the bottom side of the given height
 *
 * @param {number} height The height
 * @return {Rect}
 */
Rect$$1.prototype.extCutBottom = function extCutBottom (height$$1) {
  return this.shiftDown().cutTop(height$$1)
};

/**
 * Returns a dual grid
 *
 * @return {Grid}
 */
Rect$$1.prototype.toGrid = function toGrid () {
  return new Grid({
    x: this.centerX(),
    y: this.centerY(),
    unitWidth: this.width(),
    unitHeight: this.height()
  })
};

/**
 * Returns the similar rect which is an inner tangent of (and at the center of) the given rect.
 *
 * @param {Rect} rect The target rect
 * @return {Rect}
 */
Rect$$1.prototype.similarInnerTangent = function similarInnerTangent (rect) {
  var horizontal = rect.horizontal;
  var vertical = rect.vertical;

  if (rect.width() / rect.height() > this.width() / this.height()) {
    var horizontalMargin = (rect.width() - this.width() * rect.height() / this.height()) / 2;
    horizontal = horizontal.margin(horizontalMargin, horizontalMargin);
  } else {
    var verticalMargin = (rect.height() - this.height() * rect.width() / this.width()) / 2;
    vertical = vertical.margin(verticalMargin, verticalMargin);
  }

  return horizontal.by(vertical)
};

/**
 * Excludes the margin of the given sides.
 *
 * @param {number} top The top margin
 * @param {number} left The left margin
 * @param {number} right The right margin
 * @param {number} bottom The bottom margin
 */
Rect$$1.prototype.margin = function margin (ref) {
    var top = ref.top;
    var left = ref.left;
    var right = ref.right;
    var bottom = ref.bottom;

  return this.horizontal.margin(ifNumElse(right, 0), ifNumElse(left, 0))
    .by(this.vertical.margin(ifNumElse(bottom, 0), ifNumElse(top, 0)))
};

/**
 * Retruns the rect of the size of the current window.
 *
 * @return {Rect}
 */
Rect$$1.windowAsRect = function windowAsRect () {
  return new Rect$$1({
    top: 0,
    left: 0,
    right: document.documentElement.clientWidth,
    bottom: document.documentElement.clientHeight
  })
};

/**
 * Returns a rect which equals the size of the given element.
 * @param {HTMLElement} el The html element
 * @return {Rect}
 */
Rect$$1.fromElement = function fromElement (el) {
  return new Rect$$1({
    top: el.offsetTop,
    left: el.offsetLeft,
    right: el.offsetLeft + el.offsetWidth,
    bottom: el.offsetTop + el.offsetHeight
  })
};

/**
 * Gets the best (biggest) available rect inside this rect of the given horizontal and vertical ratio.
 *
 * @param {number} horizontal The horizontal ratio
 * @param {number} vertical The vertical ratio
 * @return {Rect}
 */
Rect$$1.prototype.getBestRect = function getBestRect (ref) {
    var horizontal = ref.horizontal;
    var vertical = ref.vertical;

  return Rect$$1.ofSize(horizontal, vertical).similarInnerTangent(this)
};

/**
 * Creates the rect of the give size.
 *
 * @param {number} width The width
 * @param {number} height The height
 */
Rect$$1.ofSize = function ofSize (width$$1, height$$1) {
  return Interval$$1.ofSize(width$$1).by(Interval$$1.ofSize(height$$1))
};

/**
 * Returns a dual grid.
 * @return {Grid}
 */
Rect$$1.prototype.dual = function dual () {
  return this.toGrid()
};

/**
 * Returns the area which this rect occupies.
 * @return {Area}
 */
Rect$$1.prototype.area = function area () {
  return new Area(this.width(), this.height())
};

/**
 * Returns the center point.
 * @return {Point}
 */
Rect$$1.prototype.center = function center () {
  return new Point(this.centerX(), this.centerY())
};

/**
 * Returns the bottom center point.
 * @return {Point}
 */
Rect$$1.prototype.bottomCenter = function bottomCenter () {
  return new Point(this.centerX(), this.bottom)
};

/**
 * Returns the top center point.
 * @return {Point}
 */
Rect$$1.prototype.topCenter = function topCenter () {
  return new Point(this.centerX(), this.top)
};

/**
 * @param {number|string} top The top margin
 * @param {number|string} height The height
 * @param {number|string} bottom The bottom margin
 */
Rect$$1.prototype.sliceVertical = function sliceVertical (top, height$$1, bottom) {
  try {
    return this.horizontal.by(this.vertical.slice(top, height$$1, bottom))
  } catch (e) {
    switch (e.code) {
      case INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS.code:
        throw error(RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_VERTICALLY)
      case INTERVAL_SLICE_ERROR_ONLY_WIDTH.code:
        throw error(RECT_SLICE_ERROR_ONLY_HEIGHT)
      default:
        throw e
    }
  }
};

/**
 * @param {number|string} left The left margin
 * @param {number|string} width The width
 * @param {number|string} right The right margin
 */
Rect$$1.prototype.sliceHorizontal = function sliceHorizontal (left, width$$1, right) {
  try {
    return this.horizontal.slice(left, width$$1, right).by(this.vertical)
  } catch (e) {
    switch (e.code) {
      case INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS.code:
        throw error(RECT_SLICE_ERROR_TOO_MUCH_ARGUMENTS_HORIZONTALLY)
      case INTERVAL_SLICE_ERROR_ONLY_WIDTH.code:
        throw error(RECT_SLICE_ERROR_ONLY_WIDTH)
      default:
        throw e
    }
  }
};

Rect$$1.prototype.slice = function slice (ref) {
    var top = ref.top;
    var left = ref.left;
    var right = ref.right;
    var bottom = ref.bottom;
    var width$$1 = ref.width;
    var height$$1 = ref.height;

  return this.sliceHorizontal(left, width$$1, right).sliceVertical(top, height$$1, bottom)
};

Object.defineProperties( Rect$$1.prototype, prototypeAccessors );

/**
 * Posture is the model of the information about how the Body is placed and arranged to its position.
 *
 * @class
 */
var Posture = function Posture (ref) {
  if ( ref === void 0 ) ref = {};
  var width = ref.width;
  var height = ref.height;
  var ratioX = ref.ratioX;
  var ratioY = ref.ratioY;
  var marginX = ref.marginX;
  var marginY = ref.marginY;
  var marginLeft = ref.marginLeft;
  var marginTop = ref.marginTop;
  var marginRight = ref.marginRight;
  var marginBottom = ref.marginBottom;

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
};

/**
 * The actual height of the rect.
 * @return {number}
 */
Posture.prototype.actualHeight = function actualHeight () {
  return this.height - this.getMarginTop() - this.getMarginBottom()
};

/**
 * @param {number} height The actual height
 */
Posture.prototype.setActualHeight = function setActualHeight (height) {
  this.height = this.getMarginTop() + this.getMarginBottom() + height;
};

/**
 * @param {number} width The actual width
 */
Posture.prototype.setActualWidth = function setActualWidth (width) {
  this.width = this.getMarginLeft() + this.getMarginRight() + width;
};

/**
 * The actual width of the rect.
 * @return {number}
 */
Posture.prototype.actualWidth = function actualWidth () {
  return this.width - this.getMarginLeft() - this.getMarginRight()
};

/**
 * Returns the top margin.
 * @return {number}
 */
Posture.prototype.getMarginTop = function getMarginTop () {
  return ifNumElse(this.marginTop, this.marginY)
};

/**
 * Returns the right margin.
 *
 * @return {number}
 */
Posture.prototype.getMarginRight = function getMarginRight () {
  return ifNumElse(this.marginRight, this.marginX)
};

/**
 * Returns the bottom margin.
 *
 * @return {number}
 */
Posture.prototype.getMarginBottom = function getMarginBottom () {
  return ifNumElse(this.marginBottom, this.marginY)
};

/**
 * Returns the left margin.
 *
 * @return {number}
 */
Posture.prototype.getMarginLeft = function getMarginLeft () {
  return ifNumElse(this.marginLeft, this.marginX)
};

/**
 * The top limit of the rect.
 *
 * @param {number} y The primary vertical position
 * @return {number}
 */
Posture.prototype.topLimit = function topLimit (y) {
  return y - this.height * this.ratioY + this.getMarginTop()
};

/**
 * The bottom limit of the rect.
 * @param {number} y The primary vertical position
 * @return {number}
 */
Posture.prototype.bottomLimit = function bottomLimit (y) {
  return this.topLimit(y) + this.actualHeight()
};

/**
 * The left limit of the rect.
 * @param {number} x The primary horizontal position
 * @return {number}
 */
Posture.prototype.leftLimit = function leftLimit (x) {
  return x - this.width * this.ratioX + this.getMarginLeft()
};

/**
 * The right limit of the rect.
 * @param {number} x The primary horizontal position
 * @return {number}
 */
Posture.prototype.rightLimit = function rightLimit (x) {
  return this.leftLimit(x) + this.actualWidth()
};

/**
 * The horizontal center of the rect.
 * @param {number} x The primary horizontal position
 * @return {number}
 */
Posture.prototype.centerX = function centerX (x) {
  return (this.leftLimit(x) + this.rightLimit(x)) / 2
};

/**
 * The vertical center of the rect.
 * @param {number} y The primary vertical position
 * @return {number}
 */
Posture.prototype.centerY = function centerY (y) {
  return (this.topLimit(y) + this.bottomLimit(y)) / 2
};

/**
 * Gets the horizontal position when it is placed in the given rect.
 * @param {Rect} rect
 * @return {number}
 */
Posture.prototype.getXInRect = function getXInRect (rect) {
  return rect.left + rect.width() * this.ratioX
};

/**
 * Gets the vertical position when it is placed in the given rect.
 * @param {Rect} rect
 * @return {number}
 */
Posture.prototype.getYInRect = function getYInRect (rect) {
  return rect.top + rect.height() * this.ratioY
};

/**
 * Fits the size to the size of the given rect.
 * @param {Rect} rect
 */
Posture.prototype.fitToRect = function fitToRect (rect) {
  this.fitToArea(rect.area());
};

/**
 * Fits the size to the given area.
 * @param {Area} area The area
 */
Posture.prototype.fitToArea = function fitToArea (area) {
  this.width = area.width;
  this.height = area.height;
};

/**
 * Scales the rectangle to fit as an inner tangent of the rectangle of the given width and height.
 * @param {number} width The width of the target outer rectangle
 * @param {number} height The height of the target outer rectangle
 */
Posture.prototype.fitInto = function fitInto (width, height) {
  var tangent = new Rect$$1({
    top: 0,
    left: 0,
    right: this.width,
    bottom: this.height
  }).similarInnerTangent(new Rect$$1({
    top: 0,
    left: 0,
    right: width,
    bottom: height
  }));

  this.width = tangent.width();
  this.height = tangent.height();
};

/**
 * Converts the pixel to the number.
 * @param {string} px The pixel
 * @return {number}
 */
var pxToNum = function (px) { return +px.slice(0, -2); };

/**
 * Prebody has width, height, position and information about how it put at the postion.
 *
 * Unlike Body, Prebody works as a treat.
 */
var Prebody$$1 = (function (Being) {
  function Prebody$$1 () {
    Being.apply(this, arguments);
  }

  if ( Being ) Prebody$$1.__proto__ = Being;
  Prebody$$1.prototype = Object.create( Being && Being.prototype );
  Prebody$$1.prototype.constructor = Prebody$$1;

  Prebody$$1.prototype.getPosture = function getPosture () {
    if (!this.posture) {
      var width$$1 = applyIfFunction(this, this.width);
      var height$$1 = applyIfFunction(this, this.height);
      var ratioX = applyIfFunction(this, this.ratioX);
      var ratioY = applyIfFunction(this, this.ratioY);
      var marginX = applyIfFunction(this, this.marginX);
      var marginY = applyIfFunction(this, this.marginY);
      var marginTop = applyIfFunction(this, this.marginTop);
      var marginLeft = applyIfFunction(this, this.marginLeft);
      var marginRight = applyIfFunction(this, this.marginRigth);
      var marginBottom = applyIfFunction(this, this.marginBottom);

      this.posture = new Posture({
        width: width$$1,
        height: height$$1,
        ratioX: ratioX,
        ratioY: ratioY,
        marginX: marginX,
        marginY: marginY,
        marginLeft: marginLeft,
        marginTop: marginTop,
        marginRight: marginRight,
        marginBottom: marginBottom
      });
    }

    return this.posture
  };

  /**
   * Returns the actual width of the elem.
   */
  Prebody$$1.prototype.actualWidth = function actualWidth () {
    return this.getPosture().actualWidth()
  };

  /**
   * Returns the actual height of the elem.
   */
  Prebody$$1.prototype.actualHeight = function actualHeight () {
    return this.getPosture().actualHeight()
  };

  /**
   * @param {number} dur The duration
   */
  Prebody$$1.prototype.show = function show (dur) {
    return Being.prototype.show.call(this, dur)
  };

  /**
   * @param {number} dur The duration
   */
  Prebody$$1.prototype.__show = function __show (dur) {
    this.updateOffset();
    this.updateRect();

    reflow(this.el);

    return Being.prototype.__show.call(this, dur)
  };

  /**
   * @param {number} dur The duration
   */
  Prebody$$1.prototype.hide = function hide (dur) {
    return Being.prototype.hide.call(this, dur)
  };

  /**
   * @param {number} dur The duration
   */
  Prebody$$1.prototype.__hide = function __hide (dur) {
    return Being.prototype.__hide.call(this, dur)
  };

  /**
   * @param {number} dur The duration
   */
  Prebody$$1.prototype.disappear = function disappear (dur) {
    return Being.prototype.disappear.call(this, dur)
  };

  /**
   * Gets the right limit in px.
   * @return {Number} x value of the right limit
   */
  Prebody$$1.prototype.rightLimit = function rightLimit () {
    return this.getPosture().rightLimit(this.x)
  };

  /**
   * Gets the left limit in px.
   * @return {Number} x value of the left limit
   */
  Prebody$$1.prototype.leftLimit = function leftLimit () {
    return this.getPosture().leftLimit(this.x)
  };

  /**
   * Gets the top limit in px.
   */
  Prebody$$1.prototype.topLimit = function topLimit () {
    return this.getPosture().topLimit(this.y)
  };

  /**
   * Gets the bottom limit in px.
   */
  Prebody$$1.prototype.bottomLimit = function bottomLimit () {
    return this.getPosture().bottomLimit(this.y)
  };

  /**
   * Gets the x of the center.
   * @return {Number}
   */
  Prebody$$1.prototype.centerX = function centerX () {
    return this.getPosture().centerX(this.x)
  };

  /**
   * Gets the y of the center.
   * @return {Number}
   */
  Prebody$$1.prototype.centerY = function centerY () {
    return this.getPosture().centerY(this.y)
  };

  /**
   * Updates the elem's offset according to current position.
   * @private
   */
  Prebody$$1.prototype.updateOffset = function updateOffset () {
    this.elem.css('top', this.topLimit());
    this.elem.css('left', this.leftLimit());
  };

  /**
   * Updates the elem's width and height.
   * @private
   */
  Prebody$$1.prototype.updateRect = function updateRect () {
    this.elem.width(this.actualWidth());
    this.elem.height(this.actualHeight());
  };

  /**
   * Stops the dom transition and update current state by the dom state.
   * @private
   */
  Prebody$$1.prototype.stop = function stop () {
    this.elem.width(this.elem.width());
    this.elem.height(this.elem.height());
    this.elem.css('top', this.elem.css('top'));
    this.elem.css('left', this.elem.css('left'));

    var posture = this.getPosture();

    posture.setActualWidth(this.elem.width());
    posture.setActualHeight(this.elem.height());

    this.x = pxToNum(this.elem.css('left')) + posture.width * posture.ratioX;
    this.y = pxToNum(this.elem.css('top')) + posture.height * posture.ratioY;
  };

  /**
   * Updates the dom with current state and returns a promise which resolves when the updates finished.
   * @param {number} [duration] The transition duration
   * @return {Promise}
   */
  Prebody$$1.prototype.engage = function engage (duration) {
    duration = ifNumElse(duration, applyIfFunction(this, this.defaultTransitionDuration) || DEFAULT_TRANSITION_DURATION);

    this.elem.css('transition-duration', duration + 'ms');

    reflow(this.el);

    this.updateRect();
    this.updateOffset();

    return wait(duration)
  };

  /**
   * Fits to the guiding rect (updates the x, y and posture to fit into the given rect. does not update the dom)
   * @param {Rect} rect
   */
  Prebody$$1.prototype.setRect = function setRect (rect) {
    var posture = this.getPosture();

    this.x = posture.getXInRect(rect);
    this.y = posture.getYInRect(rect);

    this.posture.fitToRect(rect);
  };

  /**
   * Sets the body at the given point.
   * @param {Point} point The point
   */
  Prebody$$1.prototype.setAt = function setAt (point) {
    this.x = point.x;
    this.y = point.y;
  };

  /**
   * Returns the point where this body is at.
   * @return {Point}
   */
  Prebody$$1.prototype.getPoint = function getPoint () {
    return new Point(this.x, this.y)
  };

  /**
   * @param {Area} area The area to fit
   */
  Prebody$$1.prototype.setArea = function setArea (area) {
    this.getPosture().fitToArea(area);
  };

  /**
   * Gets the area which the body occupies.
   * @return {Area}
   */
  Prebody$$1.prototype.getArea = function getArea () {
    var posture = this.getPosture();

    return new Area(posture.width, posture.height)
  };

  return Prebody$$1;
}(Being));

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */
var Body = (function (Prebody$$1) {
  function Body () {
    Prebody$$1.call(this);

    /**
     * @deprecated
     */
    this.transitionDuration = this.defaultTransitionDuration();

    /**
     * @property {Number} x sprite's x coordinate value
     */
    this.x = 0;

    /**
     * @property {Number} y sprite's y coordinate value
     */
    this.y = 0;

    this.getPosture();
  }

  if ( Prebody$$1 ) Body.__proto__ = Prebody$$1;
  Body.prototype = Object.create( Prebody$$1 && Prebody$$1.prototype );
  Body.prototype.constructor = Body;

  /**
   * Default parameters
   */
  Body.prototype.width = function width () { return 100 };
  Body.prototype.height = function height () { return 100 };
  Body.prototype.ratioX = function ratioX () { return 0 };
  Body.prototype.ratioY = function ratioY () { return 0 };
  Body.prototype.marginX = function marginX () { return 0 };
  Body.prototype.marginY = function marginY () { return 0 };
  Body.prototype.defaultTransitionDuration = function defaultTransitionDuration () { return 500 };

  /**
   * Placeholder willShow method.
   */
  Body.prototype.willShow = function willShow () {
  };

  /**
   * Updates the actual elem dom according to the current posture.
   * Returns a promise which resolves with the transitionDuration milliseconds.
   * @deprecated
   * @param {Number} [dur] The
   * @return {Promise}
   */
  Body.prototype.updateElem = function updateElem (dur) {
    if (dur) {
      this.setTransitionDuration(dur);
    }

    this.updateRect();
    this.updateOffset();

    return wait(this.transitionDuration)
  };

  /**
   * Moves the elem to the given y position.
   * @deprecated
   * @param {Number} to The y position
   */
  Body.prototype.moveToY = function moveToY (to) {
    this.y = to;

    return this.updateElem()
  };

  /**
   * Moves the elem to the given x position.
   * @deprecated
   * @param {Number} to The x position
   */
  Body.prototype.moveToX = function moveToX (to) {
    this.x = to;

    return this.updateElem()
  };

  /**
   * Sets the transition duration.
   * @deprecated
   * @param {number} dur The transition duration
   */
  Body.prototype.setTransitionDuration = function setTransitionDuration (dur) {
    this.transitionDuration = dur;

    this.elem.css('transition-duration', dur + 'ms');

    reflow(this.el);
  };

  return Body;
}(Prebody$$1));

/**
 * The model of the mapping from the direction and state to its corresponding image.
 */
var DirStateImageMap = function DirStateImageMap () {
  this.imageMap = {};
};

/**
* @param {string} dir The direction
* @param {string} state The state
* @param {Image} image The image
 */
DirStateImageMap.prototype.addImageByDirState = function addImageByDirState (image, dir, state) {
  this.imageMap[this.getMapKey(dir, state)] = image;
};

/**
 * Gets the image by the dir and state.
 *
 * @param {string} dir The direction
 * @param {string} state The state
 * @return {Image}
 */
DirStateImageMap.prototype.get = function get (dir, state) {
  var image = this.imageMap[this.getMapKey(dir, state)];

  if (!image) {
    throw new Error('illegal (dir, state): (' + this.dir + ', ' + this.state + ')')
  }

  return image
};

/**
 * Returns the key string for the dir and state.
 *
 * @private
 * @param {string} dir The direction
 * @param {string} state The state
 * @return {string}
 */
DirStateImageMap.prototype.getMapKey = function getMapKey (dir, state) {
  return (dir + "/" + state)
};

/**
 * Grid model represents the grid layout.
 *
 * The unit of a grid means the rectangle from x_0 to x_1 and from y_0 to x_1
 * The cell of a grid means the rectangle which is put on each grid point.
 * The cell size is just a recommendation of the size of cell.
 *
 * Usually cell width and height are equal to or less then unit width and height respectively.
 */
var Grid = function Grid (ref) {
  var x = ref.x;
  var y = ref.y;
  var unitWidth = ref.unitWidth;
  var unitHeight = ref.unitHeight;
  var cellWidth = ref.cellWidth;
  var cellHeight = ref.cellHeight;

  this.x = x;
  this.y = y;
  this.unitWidth = ifNumElse(unitWidth, 0);
  this.unitHeight = ifNumElse(unitHeight, 0);
  this.cellWidth = ifNumElse(cellWidth, this.unitWidth);
  this.cellHeight = ifNumElse(cellHeight, this.unitHeight);
};

/**
 * Gets the x of the given grid m position.
 *
 * @param {Number} m The m position (Integer)
 * @return {Number}
 */
Grid.prototype.getX = function getX (m) {
  return this.x + this.unitWidth * m
};

/**
 * Gets the y of the given grid n position.
 *
 * @param {Number} n The n position (Integer)
 * @return {Number}
 */
Grid.prototype.getY = function getY (n) {
  return this.y + this.unitHeight * n
};

/**
 * Returns the translated grid by the given distances.
 *
 * @param {Number} x The horizontal translate distance
 * @param {Number} y The vertical translate distance
 * @return {Grid}
 */
Grid.prototype.translate = function translate (x, y) {
  return this.override({
    x: this.x + x,
    y: this.y + y
  })
};

/**
 * Returns the shifted grid by the given grid numbers
 *
 * @param {Number} m The horizontal shift number
 * @param {Number} n The vertical shift number
 * @return {Grid}
 */
Grid.prototype.shift = function shift (m, n) {
  return this.translate(this.unitWidth * m, this.unitHeight * n)
};

/**
 * Scales the grid by the x axis.
 *
 * @param {Number} scale The scale
 * @return {Grid}
 */
Grid.prototype.scaleX = function scaleX (scale) {
  return this.override({
    unitWidth: this.unitWidth * scale,
    cellWidth: this.cellWidth * scale
  })
};

/**
 * Scales the grid by the y axis.
 *
 * @param {Number} scale The scale
 * @return {Grid}
 */
Grid.prototype.scaleY = function scaleY (scale) {
  return this.override({
    unitHeight: this.unitHeight * scale,
    cellHeight: this.cellHeight * scale
  })
};

Grid.prototype.scaleCellX = function scaleCellX (scale) {
  return this.override({cellWidth: this.cellWidth * scale})
};

Grid.prototype.scaleCellY = function scaleCellY (scale) {
  return this.override({cellHeight: this.cellHeight * scale})
};

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
Grid.prototype.override = function override (ref) {
    var x = ref.x;
    var y = ref.y;
    var unitWidth = ref.unitWidth;
    var unitHeight = ref.unitHeight;
    var cellWidth = ref.cellWidth;
    var cellHeight = ref.cellHeight;

  return new Grid({
    x: ifNumElse(x, this.x),
    y: ifNumElse(y, this.y),
    unitWidth: ifNumElse(unitWidth, this.unitWidth),
    unitHeight: ifNumElse(unitHeight, this.unitHeight),
    cellWidth: ifNumElse(cellWidth, this.cellWidth),
    cellHeight: ifNumElse(cellHeight, this.cellHeight)
  })
};

/**
 * Returns a dual rect.
 *
 * @return {Rect}
 */
Grid.prototype.toRect = function toRect () {
  var halfWidth = this.unitWidth / 2;
  var halfHeight = this.unitHeight / 2;

  return new Rect$$1({
    top: this.y - halfHeight,
    left: this.x - halfWidth,
    right: this.x + halfWidth,
    bottom: this.y + halfHeight

  })
};

/**
 * Returns a dual rect.
 *
 * @return {Rect}
 */
Grid.prototype.dual = function dual () {
  return this.toRect()
};

/**
 * A GridWalker is a Body which walks along the given Grid.
 */
var GridWalker = (function (Body) {
  function GridWalker () {
    Body.call(this);

    /**
     * @property {number} m The horizontal grid position
     */
    this.m = 0;

    /**
     * @property {number} n The vertical grid position
     */
    this.n = 0;
  }

  if ( Body ) GridWalker.__proto__ = Body;
  GridWalker.prototype = Object.create( Body && Body.prototype );
  GridWalker.prototype.constructor = GridWalker;

  /**
   * @override
   */
  GridWalker.prototype.ratioX = function ratioX () {
    return 0.5
  };

  /**
   * @override
   */
  GridWalker.prototype.ratioY = function ratioY () {
    return 0.5
  };

  /**
   * The ratio of how much the grid walker occupies the given cell width.
   *
   * @return {number}
   */
  GridWalker.prototype.cellRatioX = function cellRatioX () {
    return 1
  };

  /**
   *  The ratio of how much the grid walker occupies the given cell height.
   *
   * @return {number}
   */
  GridWalker.prototype.cellRatioY = function cellRatioY () {
    return 1
  };

  GridWalker.prototype.willShow = function willShow () {
    return this.fitToGrid()
  };

  /**
   * Sets the grid and the position in it.
   *
   * @param {Grid} grid The grid layout info
   * @param {Number} [m] The horizontal grid position
   * @param {Number} [n] The vertical grid position
   */
  GridWalker.prototype.setGrid = function setGrid (grid, m, n) {
    this.grid = grid;

    this.setGridPosition(m, n);
  };

  /**
   * Sets the grid position.
   *
   * @param {Number} [m] The horizontal grid position
   * @param {Number} [n] The vertical grid position
   */
  GridWalker.prototype.setGridPosition = function setGridPosition (m, n) {
    if (typeof m === 'number') {
      this.m = m;
    }

    if (typeof n === 'number') {
      this.n = n;
    }
  };

  /**
   * Updates the element's dom state using the current grid state info.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.updateElemOnGrid = function updateElemOnGrid (dur) {
    this.x = this.grid.getX(this.m);
    this.y = this.grid.getY(this.n);

    return this.updateElem(dur)
  };

  /**
   * Fits the posture into the (grid.cellWidth, grid.cellHeight) and moves to the current grid position.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.fitToGrid = function fitToGrid (dur) {
    this.posture.fitInto(this.grid.cellWidth * this.cellRatioX(), this.grid.cellHeight * this.cellRatioY());

    return this.updateElemOnGrid(dur)
  };

  /**
   * Moves to the horizontal grid positon m.
   *
   * @param {Number} m The horizontal grid position
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveToM = function moveToM (m, dur) {
    this.x = this.grid.getX(this.m = m);

    return this.updateElem(dur)
  };

  /**
   * Moves to the vertical grid position n.
   *
   * @param {Number} n The vertical grid position
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveToN = function moveToN (n, dur) {
    this.y = this.grid.getY(this.n = n);

    return this.updateElem(dur)
  };

  /**
   * Moves to the given grid position.
   *
   * @param {Number} m The horizontal grid position
   * @param {Number} n The vertical grid position
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveToGridPosition = function moveToGridPosition (m, n, dur) {
    this.setGridPosition(m, n);

    return this.updateElemOnGrid(dur)
  };

  /**
   * Moves along the grid.
   *
   * @param {Number} diffM The move distance along the horizontal line
   * @param {Number} diffN The move distance along the vertical line
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveOnGrid = function moveOnGrid (distM, distN, dur) {
    return this.moveToGridPosition(this.m + distM, this.n + distN, dur)
  };

  /**
   * Moves a unit upward along the grid.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveUpOnGrid = function moveUpOnGrid (dur) {
    return this.moveOnGrid(0, -1, dur)
  };

  /**
   * Moves a unit upward along the grid.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveRightOnGrid = function moveRightOnGrid (dur) {
    return this.moveOnGrid(1, 0, dur)
  };

  /**
   * Moves a unit upward along the grid.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveDownOnGrid = function moveDownOnGrid (dur) {
    return this.moveOnGrid(0, 1, dur)
  };

  /**
   * Moves a unit upward along the grid.
   *
   * @param {Number} [dur] The duration to change
   * @return {Promise}
   */
  GridWalker.prototype.moveLeftOnGrid = function moveLeftOnGrid (dur) {
    return this.moveOnGrid(-1, 0, dur)
  };

  return GridWalker;
}(Body));

/**
 * The image object
 */
var Image = function Image (src, mirrorX, mirrorY) {
  this.src = src;
  this.mirrorX = mirrorX;
  this.mirrorY = mirrorY;

  this.scaleX = this.mirrorX ? -1 : 1;
  this.scaleY = this.mirrorY ? -1 : 1;
};

/**
 * Apply the image src and style to the element.
 *
 * @param {jQuery} elem The element to apply the image info (needs to be <img> jquery object)
 */
Image.prototype.apply = function apply (elem) {
  elem.css('transform', this.makeTransform());

  elem.attr('src', this.src);
};

/**
 * Makes the transform style.
 *
 * @private
 * @return {string}
 */
Image.prototype.makeTransform = function makeTransform () {
  return 'scale(' + this.scaleX + ', ' + this.scaleY + ')'
};

/**
 * The abstact class for dimension factories of various objects in scenes.
 *
 * @abstract
 */
var LayoutFactory = function LayoutFactory () {};

LayoutFactory.prototype.grid = function grid (options) {
  return new Grid(options)
};

/**
 * Creates a rect with the given options.
 *
 * @param {Object} options The options
 * @return {Rect}
 */
LayoutFactory.prototype.rect = function rect (options) {
  return new Rect$$1(options)
};

/**
 * Adds `hideAnim` and `showAnim` methods to the decorated class with the given params.
 * @param {Array} show The show animation params
 * @param {Array} hide The hide animation params
 */
var animation = function (ref) {
  var show = ref.show;
  var hide = ref.hide;

  return function (Cls) {
  if (show) {
    var name = show[0];
    var dur = show[1];
    animation.show(name, dur)(Cls);
  }

  if (hide) {
    var name$1 = hide[0];
    var dur$1 = hide[1];
    animation.hide(name$1, dur$1)(Cls);
  }

  return Cls
};
};

/**
 * Adds `hideAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
animation.hide = function (name, dur) {
  if ( dur === void 0 ) dur = 500;

  return function (Cls) {
  Cls.prototype.hideAnim = function () { return new Animation(name, dur); };
  return Cls
};
};

/**
 * Adds `showAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
animation.show = function (name, dur) {
  if ( dur === void 0 ) dur = 500;

  var d = function (Cls) {
    Cls.prototype.showAnim = function () { return new Animation(name, dur); };
    return Cls
  };

  return d
};

/**
 * Adds `ratioX` and `ratioY` methods.
 * @param {number} x The ratioX value
 * @param {number} y The ratioY value
 */
var ratio = function (ref) {
  var x = ref.x;
  var y = ref.y;

  return function (Cls) {
  if (x) {
    ratio.x(x)(Cls);
  }

  if (y) {
    ratio.y(y)(Cls);
  }

  return Cls
};
};

/**
 * Adds ratioX method to the class.
 * @param {number} x The ratioX value
 */
ratio.x = function (x) {
  var d = function (Cls) {
    Cls.prototype.ratioX = function () { return x; };
    return Cls
  };

  return d
};

/**
 * Adds ratioY method to the class.
 * @param {number} y The ratioY value
 */
ratio.y = function (y) { return function (Cls) {
  Cls.prototype.ratioY = function () { return y; };
  return Cls
}; };

/**
 * Sets defaultTransitionDuration method to the class.
 * @param {number} duration The transition duration
 * @param {Function} Cls The class to decorate
 */
var duration = function (duration) { return function (Cls) {
  Cls.prototype.defaultTransitionDuration = function () { return duration; };
}; };


var transition = Object.freeze({
	duration: duration
});

/**
 * Adds the height method to the class.
 * @param {number} width The width
 * @param {Function} Cls The class to decorate
 */
var width = function (width) { return function (Cls) {
  Cls.prototype.width = function () { return width; };
}; };

/**
 * Adds the height method to the class.
 * @param {number} height The height
 * @param {Function} Cls The class to decorate
 */
var height = function (height) { return function (Cls) {
  Cls.prototype.height = function () { return height; };
}; };

/**
 * The decorator for adding `margin*` methods.
 */
var margin = function (ref) {
  var x = ref.x;
  var y = ref.y;
  var left = ref.left;
  var right = ref.right;
  var top = ref.top;
  var bottom = ref.bottom;

  return function (Cls) {
  var prototype = Cls.prototype;

  if (x) { prototype.marginX = function () { return x; }; }
  if (y) { prototype.marginY = function () { return y; }; }
  if (left) { prototype.marginLeft = function () { return left; }; }
  if (right) { prototype.marginRight = function () { return right; }; }
  if (top) { prototype.marginTop = function () { return top; }; }
  if (bottom) { prototype.marginBottom = function () { return bottom; }; }

  return Cls
};
};

exports.wait = wait;
exports.reflow = reflow;
exports.Animation = Animation;
exports.Area = Area;
exports.Being = Being;
exports.Body = Body;
exports.DirStateImageMap = DirStateImageMap;
exports.DIRS = DIRS;
exports.Grid = Grid;
exports.GridWalker = GridWalker;
exports.Image = Image;
exports.Interval = Interval$$1;
exports.LayoutFactory = LayoutFactory;
exports.Point = Point;
exports.Posture = Posture;
exports.Prebody = Prebody$$1;
exports.Rect = Rect$$1;
exports.animation = animation;
exports.height = height;
exports.width = width;
exports.margin = margin;
exports.ratio = ratio;
exports.transition = transition;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}],2:[function(require,module,exports){
'use strict';

require('./splash-scene');

},{"./splash-scene":4}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('spn'),
    wait = _require.wait,
    Being = _require.Being,
    Animation = _require.Animation;

var _capsid = capsid,
    component = _capsid.component;

/**
 * Logo animation componenent in the splash screen.
 */

var Logo = (_dec = component('splash-logo'), _dec(_class = function (_Being) {
  _inherits(Logo, _Being);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
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

},{"spn":1}],4:[function(require,module,exports){
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

var _capsid = capsid,
    on = _capsid.on;

/**
 * SplashScene controls the splash screen.
 */

var SplashScene = (_dec = scene.primary, _dec2 = on('click', { at: '.splash-logo' }), _dec(_class = (_class2 = function () {
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
}(), (_applyDecoratedDescriptor(_class2.prototype, 'goToTitle', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'goToTitle'), _class2.prototype)), _class2)) || _class);


module.exports = SplashScene;

},{"../ui/scene":6,"./logo":3}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('spn'),
    wait = _require.wait;

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

},{"spn":1}],6:[function(require,module,exports){
'use strict';

var BackgroundService = require('./common/background-service');
var isFunction = function isFunction(f) {
  return typeof f === 'function';
};

var _capsid = capsid,
    component = _capsid.component;


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
  capsid.on('scene-start')(Cls.prototype, 'main');
  return scene(Cls);
};

module.exports = scene;

},{"./common/background-service":5}]},{},[2]);
