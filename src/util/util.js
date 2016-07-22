const {img} = require('dom-gen')

/**
 * Load image and returns promise which resolves when the image loaded.
 */
exports.loadImage = (path, cls, dom) => new Promise(resolve => {
  const $img = img()
    .attr('src', path)
    .addClass(cls)
    .appendTo(dom)
    .on('load', () => resolve($img))
})

/**
 * Add a comma to separate each group of three digits in a text.
 *
 * @param {Number} number The number
 * @return {String}
 */
exports.commaNumber = number => number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

/**
 * Chains elements of the array as promise chain using the promise generating function.
 *
 * @param {Array} array The array
 * @param {Function} createPromise The function for creating promise
 */
exports.chainPromise = (array, createPromise) => array.reduce((promise, item) => promise.then(() => createPromise(item)), Promise.resolve())
