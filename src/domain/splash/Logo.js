import Being from '../common/Being'

/**
 * Logo animation componenent in the splash screen.
 */
domain.splash.Logo = $.cc.subclass(Being, function (pt) {
    'use strict'

    /**
     * Performs splash screen's logo animation.
     *
     * @return {Promise}
     */
    pt.perform = function () {

        var self = this

        return this.show().then(function () {

            return wait(700)

        }).then(function () {

            return self.hide()

        })

    }

    pt.willShow = function () {

        return this.elem.imageLoaded()

    }

    pt.didShow = function () {

        this.elem.css('opacity', 1)

    }

    pt.didHide = function () {

        this.elem.css('opacity', 0)

    }

    pt.showAnim = new domain.common.Animation('logo-show', 350)

    pt.hideAnim = new domain.common.Animation('logo-hide', 350)

})

$.cc.assign('splash-logo', domain.splash.Logo)
