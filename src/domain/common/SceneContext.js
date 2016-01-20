/**
 * SceneContext is the base class for scene classes. This defines the for phases of the scene.
 *
 * @abstract
 * @class
 */
export default class SceneContext extends domain.common.Role {

    main() {

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
    load() {}

    /**
     * Sets up the services necessary for the scene.
     *
     * This must be a sync process.
     *
     * @abstract
     */
    setUp() {}

    /**
     * Starts the scene.
     *
     * @abstract
     */
    start() {}

    /**
     * Gets the class component of the given name inside the element.
     */
    get(className) {

        return this.elem.find('.' + className).cc.get(className)
    }

    /**
     * Gets the class component of the given name at the element.
     */
    getAtElem(className) {

        return this.elem.cc.get(className)

    }

    /**
     * Gets the class component of the given name at the given selector
     */
    getGlobal(selector, className) {

        return $(selector).cc.get(className)

    }

}
