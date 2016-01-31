
const Rx = window.Rx

/**
 * Checks if it's flatMappable or not.
 *
 * @param {Object} x Testing object
 * @return {Boolean}
 */
Rx.helpers.isObservableLike = x => x instanceof Rx.Observable || Rx.helpers.isPromise(x)

const wrapUnobservable = x => Rx.helpers.isObservableLike(x) ? x : [x]

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

    return this.map(wrapUnobservable).flatMap(x => x)

}

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
 *
 * @return {Promise}
 */
Rx.Observable.prototype.getPromise = function () {

    return new Promise((resolve, reject) => this.takeLast(1).subscribe(x => resolve(x), error => reject(error), () => resolve()))

}

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
 * Hooks the function to the stream
 *
 * @param {Function} f The hooking function
 * @return {Rx.Observable}
 */
Rx.Observable.prototype.hook = function (f) {

    return this.filter(item => (f(item) || true))

}

/**
 * Makes into flattenned stream.
 *
 * @return {Rx.Observable}
 */
window.Array.prototype.toFlatStream = function () {

    return Rx.Observable.of.apply(null, this).flattenObservable()

}
