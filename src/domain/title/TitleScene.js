import Actor from '../common/Actor'

const event = $.cc.event

/**
 * TitleScene class handles the motions sequences of the title scene.
 */
class TitleScene extends Actor {

    getMenuBtn() {
        return $('.menu-button-root').cc.get('menu-button')
    }

    /**
     * Entry point of the title scene.
     */
    @event('scene-start')
    start() {

        loadImage('images/title-logo.svg', 'title-logo elem', this.elem).then(($img) => $img.anim('title-appear', 2000).then(() => $img.animation('float 6000ms infinite')))

        wait(500).then(() => {

            that.getMenuBtn().show()

            $('<p />')
                .text('GET UP')
                .addClass('touch-here elem')
                .appendTo(that.elem)
                .click(() => this.goToMap())
                .anim('title-appear', 1000)
                .then((p) => p.animation('float 1000ms infinite'))

        })

    }

    @event('scene-reset')
    reset() {

        this.fadeOut().then(() => location.reload())

    }

    fadeOut() {

        var p = this.getMenuBtn().hide()

        var q = $('.elem').css('opacity', 0).anim('disappear', 500).then(() => {

            $('.elem').remove()

            return wait(100)

        })

        return Promise.all([p, q])

    }

    goToMap() {

        this.fadeOut()

        .then(() => ui.common.BackgroundService.turnBlack())

        .then(() => {

            location.href = 'map.html'

        })

    }

}

$.cc.assign('title-scene', TitleScene)
