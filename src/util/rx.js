const Rx = window.Rx

/**
 * Checks if it's flatMappable or not.
 *
 * @param {object} x The param
 * @return {boolean}
 */
Rx.helpers.isObservableLike = x => x instanceof Rx.Observable || Rx.helpers.isPromise(x)

/**
 * Wraps the object if it doesn't seem an observable.
 * @param {object} x The thing
 * @return {object}
 */
const wrapUnobservable = x => Rx.helpers.isObservableLike(x) ? x : [x]

/**
 * Maps it and flatMap it only when it's possible.
 *
 * @param {Function} f Mapping function
 * @return {Rx.Observable}
 */
Rx.Observable.prototype.pipe = function (f) {
  return exports.flatten(this.map(f))
}

/**
 * Flattens the asynchronous types in the observable.
 * @param {Rx.Observable} source The source
 * @return {Rx.Observable}
 */
exports.flatten = source => source.map(wrapUnobservable).flatMap(x => x)

/**
 * Filters null equivalent element.
 *
 * @return {Rx.Observable}
 */
Rx.Observable.prototype.filterNull = function () {
  return this.filter(x => x != null)
}

/**
 * Returns promise which resolves the last value of the stream when the stream completed.
 * @param {Rx.Observable} source The source observable
 * @return {Promise}
 */
exports.toPromise = source => new Promise((resolve, reject) => source.takeLast(1).subscribe(x => resolve(x), err => reject(err), () => resolve()))

/**
 * Emit to the given dom element. assume the observable is a stream of the event.
 *
 * @param {jQuery|HTMLElement|String} dom The dom to emit event
 * @return {Object}
 */
Rx.Observable.prototype.emitInto = function (dom) {
  return this.forEach(event => $(dom).trigger(event))
}

/**
 * Makes into flattenned stream.
 *
 * @return {Rx.Observable}
 */
window.Array.prototype.toFlatStream = function () {
  return exports.flatten(Rx.Observable.of.apply(null, this))
}
