
/**
 * Load image and returns promise which resolves when the image loaded.
 */
const loadImage = (path, cls, dom) => new Promise((resolve) => {

    const $img = $('<img />')
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
const commaNumber = number => number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

/**
 * Chains elements of the array as promise chain using the promise generating function.
 *
 * @param {Array} array The array
 * @param {Function} createPromise The function for creating promise
 */
const chainPromise = (array, createPromise) => array.reduce((promise, item) => promise.then(() => createPromise(item)), Promise.resolve())

export {loadImage, commaNumber, chainPromise}
