import Actor from '../common/Actor'

const event = $.cc.event

/**
 * TitleScene class handles the motions sequences of the title scene.
 */
class TitleScene extends domain.common.SceneContext {

    /**
     * Gets the menu button.
     *
     * @return {MenuButton}
     */
    getMenuBtn() {

        return $('.menu-button-root').cc.get('menu-button')

    }

    /**
     * Entry point of the title scene.
     */
    @event('scene-start')
    start() {

        loadImage('images/title-logo.svg', 'title-logo elem', this.elem)

        .then(($img) => $img.anim('title-appear', 2000).then(() => $img.animation('float 6000ms infinite')))

        wait(500).then(() => {

            this.getMenuBtn().show()

            $('<p />')
                .text('GET UP')
                .addClass('touch-here elem')
                .appendTo(this.elem)
                .click(() => this.goToMap())
                .anim('title-appear', 1000)
                .then((p) => p.animation('float 1000ms infinite'))

        })

    }

    /**
     * Fades out the scene.
     */
    fadeOut() {

        return Promise.all([this.getMenuBtn().hide(), $('.elem').css('opacity', 0).anim('disappear', 500).then(() => {

            $('.elem').remove()

            return wait(100)

        })])

    }

    /**
     * Transions to the map scene.
     */
    goToMap() {

        this.fadeOut()

        .then(() => ui.common.BackgroundService.turnBlack())

        .then(() => {

            location.href = 'map.html'

        })

    }

}

$.cc.assign('title-scene', TitleScene)
