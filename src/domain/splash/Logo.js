import Being from '../common/Being'

/**
 * Logo animation componenent in the splash screen.
 */
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

    get showAnim() {

        return new domain.common.Animation('logo-show', 350)

    }

    get hideAnim() {

        return new domain.common.Animation('logo-hide', 350)

    }

}

$.cc.assign('splash-logo', Logo)
