var Color = (function () {
    var exports = function (h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    };

    var colorPrototype = exports.prototype;

    exports.random = function () {
        return new exports(dice(360), dice(100), dice(100), Math.random());
    };

    exports.black = function () {
        return new exports(0, 0, 0, 1);
    };

    colorPrototype.alpha = function (a) { this.a = a; return this; };
    colorPrototype.hue = function (h) { this.h = h; return this; };
    colorPrototype.saturation = function (s) { this.s = s; return this; };
    colorPrototype.light = function (l) { this.l = l; return this; };

    colorPrototype.css = function () {
        return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
    };

    return exports;
}());
