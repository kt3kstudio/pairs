
infrastructure.storage = (function () {
    'use strict';

    var exports = {};

    exports.get = function (key, defaultValue) {
        var value = localStorage.getItem(key);

        return Promise.resolve(value != null ? JSON.parse(value) : defaultValue);
    };

    exports.set = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));

        return Promise.resolve(true);
    };

    return exports;
}());
