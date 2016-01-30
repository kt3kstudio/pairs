import {Animation} from 'spn'

/**
 * The sprite modifier of Ma (the protagonist).
 *
 * @class
 */
domain.common.Ma = subclass(function (pt) {
    'use strict'

    pt.constructor = function () {

        this.id = 'ma'
        this.name = 'ma'

        this.x = 0
        this.y = 0

        this.posture.width = 40
        this.posture.height = 60

        this.upImage = () => 'images/ma-B.svg'
        this.downImage = () => 'images/ma-F.svg'
        this.leftImage = () => 'images/ma-L.svg'
        this.rightImage = () => 'images/ma-R.svg'

        this.showAnim = () => new Animation('char-appear', 1000)
        this.hideAnim = () => new Animation('char-disappear', 1000)

    }

})
