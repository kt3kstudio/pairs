/**
 * RxJS
 *
 * @class Rx
 * @singleton
 */
;(function (Rx) {
  'use strict'

  /**
   * Rx.helpers
   *
   * @class Rx.helpers
   * @singleton
   */

  /**
   * Checks if it's flatMappable or not.
   *
   * @param {Object} x Testing object
   * @return {Boolean}
   */
  Rx.helpers.isObservableLike = function (x) {
    return x instanceof Rx.Observable || Rx.helpers.isPromise(x)
  }

  var wrapUnobservable = function (x) {
    return Rx.helpers.isObservableLike(x) ? x : [x]
  }

  /**
   * Rx.Observable
   * @class Rx.Observable
   */

  /**
   * Maps it and flatMap it only when it's possible.
   *
   * @param {Function} f Mapping function
   * @return {Rx.Observable}
   */
  Rx.Observable.prototype.pipe = function (f) {
    return this.map(f).flattenObservable()

  }

  /**
   * Flattens it.
   *
   * @return {Rx.Observable}
   */
  Rx.Observable.prototype.flattenObservable = function () {
    return this.map(wrapUnobservable).flatMap(function (x) {
      return x

    })

  }

  /**
   * Filters null equivalent element.
   *
   * @return {Rx.Observable}
   */
  Rx.Observable.prototype.filterNull = function () {
    return this.filter(function (x) {
      return x != null

    })

  }

  /**
   * Returns promise which resolves the last value of the stream when the stream completed.
   *
   * @return {Promise}
   */
  Rx.Observable.prototype.getPromise = function () {
    var source = this

    return new Promise(function (resolve, reject) {
      source.takeLast(1).subscribe(function (x) {
        resolve(x)

      }, function (error) {
        reject(error)

      }, function () {
        resolve()

      })

    })

  }

  /**
   * Emit to the given dom element. assume the observable is a stream of the event.
   *
   * @param {jQuery|HTMLElement|String} dom The dom to emit event
   * @return {Rx.Observer}
   */
  Rx.Observable.prototype.emitInto = function (dom) {
    dom = $(dom)

    var source = this

    return source.forEach(function (event) {
      dom.trigger(event)

    })

  }

  /**
   * Rx.Observer
   *
   * @class Rx.Observer
   */
  Rx.Observer

  /**
   * Array.
   *
   * @class Array
   */
  /**
   * Makes into flattenned stream.
   *
   * @return {Rx.Observable}
   */
  Array.prototype.toFlatStream = function () {
    return Rx.Observable.of.apply(null, this).flattenObservable()

  }

}(Rx))
