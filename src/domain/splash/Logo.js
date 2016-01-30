import Being from '../common/Being'
import {Animation} from 'spn'

/**
 * Logo animation componenent in the splash screen.
 */
@$.cc.Component('splash-logo')
class Logo extends Being {

    /**
     * Performs splash screen's logo animation.
     *
     * @return {Promise}
     */
    perform() {

        return this.show()

        .then(() => wait(700))

        .then(() => this.hide())

    }

    willShow() {

        return this.elem.imageLoaded()

    }

    didShow() {

        this.elem.css('opacity', 1)

    }

    didHide() {

        this.elem.css('opacity', 0)

    }

    showAnim() {

        return new Animation('logo-show', 350)

    }

    hideAnim() {

        return new Animation('logo-hide', 350)

    }

}
