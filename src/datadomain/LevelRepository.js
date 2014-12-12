
/**
 * @class
 * LevelRepository handles persistence of Level objects.
 */
datadomain.LevelRepository = (function () {
    'use strict';

    var exports = function () {
    };

    var lvRepoPt = exports.prototype;

    lvRepoPt.loadByLevel = function (level) {
        var that = this;

        return new Promise(function (resolve) {
            $.getJSON(that.levelUrl(level)).then(function (data) {
                resolve(datadomain.Level.createFromObject(data));
            });
        });
    };

    lvRepoPt.levelUrl = function (level) {
        return 'level/' + level + '.json';
    };

    return exports;

}());
