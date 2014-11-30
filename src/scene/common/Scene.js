window.scene = window.scene || {};
scene.common = scene.common || {};

/**
 * @class
 * Scene class represents each unit activity on a page.
 *
 * A scene starts with play method and it returns promise which resolves with actors in the scene when the scene finished
 */
scene.common.Scene = (function () {
    'use strict';

    var exports = function () {
        this.actors = {};
    };

    var scenePrototype = exports.prototype;

    scenePrototype.play = function () {
        var that = this;

        setTimeout(function () {
            that.start();
        });

        return new Promise(function (resolve) {
            that.__resolve = resolve;
        });
    };

    scenePrototype.finish = function () {
        this.__resolve(this.actors);
    };

    return exports;

}());
