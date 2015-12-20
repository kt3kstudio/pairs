/**
 * The main character on the level scene.
 *
 * @class
 */
domain.level.Character = subclass(domain.common.CharSprite, function (pt, parent) {
    'use strict'

    pt.willShow = function () {

        parent.willShow.apply(this, arguments)

        this.elem.css('display', 'inline')

    }

    pt.didHide = function () {

        parent.didHide.call(this)

        this.elem.css('display', 'none')

    }

})

$.cc.assign('character-on-level', domain.level.Character)
