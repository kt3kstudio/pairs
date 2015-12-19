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

    /**
     * Gets the class component of the given name inside the element.
     */
    pt.get = function (className) {

        return this.elem.find('.' + className).cc.get(className)
    }

    /**
     * Gets the class component of the given name at the element.
     */
    pt.getAtElem = function (className) {

        return this.elem.cc.get(className)

    }

    /**
     * Gets the class component of the given name at the given selector
     */
    pt.getGlobal = function (selector, className) {

        return $(selector).cc.get(className)

    }

})

