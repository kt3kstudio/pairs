import './Logo'

/**
 * SplashScene controls the splash screen.
 */
@$.cc.Component('splash-scene')
class SplashScene extends $.cc.Coelement {

    @$.cc.event('scene-start')
    main() {

        return this.performSplash('studio')

        .then(() => this.performSplash('straw'))

        .then(() => this.goToTitle())

    }

    /**
     * Performs splash scene animation for the give class name element.
     *
     * @param {String} className The class name to animate
     * @return {Promise}
     */
    performSplash(className) {

        return this.elem.find('.splash-logo.' + className).cc.get('splash-logo').perform()

    }

    /**
     * The scene goes to the title.
     */
    @$.cc.event('click', '.splash-logo')
    goToTitle() {

        location.replace('title.html')

    }

}
