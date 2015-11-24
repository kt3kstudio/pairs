window.Promise = window.Promise || window.ES6Promise.Promise

if (!window.Function.prototype.bind) {
    window.Function.prototype.bind = function (oThis) {
        'use strict'

        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
        }

        var aArgs = Array.prototype.slice.call(arguments, 1)
        var fToBind = this
        var FNOP = function () {}
        var FBound = function () {
            return fToBind.apply(this instanceof FNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)))
        }

        FNOP.prototype = this.prototype
        FBound.prototype = new FNOP()

        return FBound
    }
}
