import Sprite from './Sprite'

/**
 * CharSprite class handles the character sprite.
 *
 * Component
 */
domain.common.CharSprite = subclass(Sprite, function (pt, parent) {
    'use strict'

    var defaultSpeechTimeout = 5000

    /** sprite's image when going up */
    pt.upImage = ''

    /** sprite's image when going down */
    pt.downImage = ''

    /** sprite's image when going left */
    pt.leftImage = ''

    /** sprite's image when going right */
    pt.rightImage = ''

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem)

        this.character = elem.data('character')

        this.characterRepository = new datadomain.CharacterRepository()

        CHAR_SPRITE_SELECTOR(this.character.id).call(this)

        const dirStateImage = {
            up: {default: new domain.common.Image(this.upImage)},
            down: {default: new domain.common.Image(this.downImage)},
            left: {default: new domain.common.Image(this.leftImage)},
            right: {default: new domain.common.Image(this.rightImage)}
        }

        this.dirStateImage = () => dirStateImage

    }

    var CHAR_SPRITE_SELECTOR = function (charId) {

        var THE_TABLE = {
            ma: domain.common.Ma
        }

        return THE_TABLE[charId]

    }

    /**
     * Changes the direction the character currently heading for.
     *
     * @param {String} dir The direction (one of up, down, left or right)
     */
    pt.turn = function (dir) {

        this.setDirState(dir, 'default')

    }

    pt.getDirection = function (coordinate, to) {

        if (coordinate === 'x') {

            return to > this.x ? 'right' : 'left'

        }

        return to > this.y ? 'down' : 'up'

    }

    pt.moveTo = function (coordinate, to, dur) {

        var dir = this.getDirection(coordinate, to)

        this.turn(dir)

        this.setTransitionDuration(dur)

        if (dir === 'up' || dir === 'down') {

            this.moveToY(to)

        } else {

            this.moveToX(to)

        }

        return wait(dur)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveUpOnGrid = function () {

        this.turn('up')

        return parent.moveUpOnGrid.apply(this, arguments)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveRightOnGrid = function () {

        this.turn('right')

        return parent.moveRightOnGrid.apply(this, arguments)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveDownOnGrid = function () {

        this.turn('down')

        return parent.moveDownOnGrid.apply(this, arguments)

    }

    /**
     * Moves a unit upward along the grid.
     *
     * @return {Promise}
     */
    pt.moveLeftOnGrid = function () {

        this.turn('left')

        return parent.moveLeftOnGrid.apply(this, arguments)

    }

    /**
     * Speaks the phrase
     */
    pt.speak = function (speech, opts) {

        opts = opts || {}

        var cancelDom = opts.cancelDom || this.elem
        var timeout = opts.timeout || defaultSpeechTimeout

        var bubbleShown = this.elem.speechBubble(speech, {
            width: $(window).width() * 0.8,
            height: 50,
            color: '#328DE5',
            cssClass: this.name + '-speech',
            partitionY: 2,
            partitionX: 10,
            duration: 600
        }).show()

        this.speechEndPromise = bubbleShown.then(function (sb) {

            return new Promise(function (resolve) {

                setTimeout(resolve, timeout)

                $(cancelDom).one('click touchstart', resolve)

            }).then(function () {

                $(cancelDom).off('click touchstart')

                return sb.hide()

            })

        })

        return bubbleShown

    }

})
