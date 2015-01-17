/**
 * @class
 * Scene class represents each unit activity on a page.
 *
 * A scene starts with `play` method and it returns promise which resolves with itself when the scene `finish`ed
 */
scene.common.Scene = (function () {
    'use strict';

    var exports = function () {
    };

    var scenePrototype = exports.prototype;

    /**
     * This method is to be called by `play` method.
     *
     * The heirs of this class should override this method and any starting sequence should be here.
     */
    scenePrototype.start = function () {
    };

    /**
     * This method is to be called by `finish` method.
     *
     * @protected
     */
    scenePrototype.end = function () {
    };

    /**
     * This method starts the scene and returns a promise which resolves with itself when the scene is finished.
     *
     * @returns {Promise}
     *
     * [final]
     */
    scenePrototype.play = function () {
        var that = this;

        setTimeout(function () {
            that.start();
        });

        return new Promise(function (resolve) {
            that.__resolve = resolve;
        });
    };

    /**
     * This method resolves the promise which was created by `play` method.
     *
     * This method should be called when the scene is finished.
     *
     * [final]
     */
    scenePrototype.finish = function () {

        var that = this;

        setTimeout(function () {
            that.end();
        });

        this.__resolve(this);
    };

    return exports;

}());
