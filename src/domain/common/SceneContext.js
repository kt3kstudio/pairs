/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 *
 * @abstract
 * @class
 */
domain.common.SceneContext = subclass(domain.common.Role, function (pt) {
    'use strict'

    pt.main = function () {

        var self = this

        return Promise.resolve(self.load()).then(function () {

            self.setUp()

            return self.start()

        })

    }

    /**
     * Loads the data necessary for the scene.
     *
     * @abstract
     */
    pt.load = function () {}

    /**
     * Sets up the services necessary for the scene.
     *
     * This must be a sync process.
     *
     * @abstract
     */
    pt.setUp = function () {}

    /**
     * Starts the scene.
     *
     * @abstract
     */
    pt.start = function () {}

})

