import Grid from '../common/Grid'
import Body from '../common/body'

/**
 * FloorAsset is an abstract class which represents the something on the wall in the map view.
 */
domain.map.FloorAsset = subclass(Body, function (pt, parent) {
    'use strict'

    /**
     * @override
     */
    pt.width = () => 80

    /**
     * @override
     */
    pt.height = () => 100

    /**
     * @override
     */
    pt.ratioX = () => 0.5

    /**
     * @override
     */
    pt.ratioY = () => 1

    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.x = +this.elem.attr('x')
        this.y = +this.elem.attr('y')

        this.id = this.elem.attr('id')

    }

    /**
     * Knocks the door (figuratively).
     */
    pt.doorKnock = function () {

        this.elem.trigger('door-knock', [this])

    }

    pt.open = function () {

        return Promise.resolve()

    }

    pt.close = function () {

        return Promise.resolve()

    }

    pt.onGetWalker = function () {

        return Promise.resolve()

    }

    /**
     * Spawn the frog to the front of the floor asset.
     */
    pt.spawnFrog = function () {

        var frog = $('<img />').css({zIndex: 2}).appendTo(this.elem).cc.init('frog')

        frog.setGrid(new Grid({x: 35, y: 130, unitWidth: 100, unitHeight: 100}))

        frog.show()

    }

    /**
     * Removes the frog in front of the floor asset.
     */
    pt.removeFrog = function () {

        var frogDom = this.elem.find('.frog')

        if (frogDom.length === 0) {

            return

        }

        var frog = frogDom.cc.getActor()

        if (frog == null) {

            return

        }

        frog.runAwayRight()

    }

})
