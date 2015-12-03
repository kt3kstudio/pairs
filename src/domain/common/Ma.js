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
        this.dimension.width = 40
        this.dimension.height = 60

        this.upImage = 'images/ma-B.svg'
        this.downImage = 'images/ma-F.svg'
        this.leftImage = 'images/ma-L.svg'
        this.rightImage = 'images/ma-R.svg'

        this.showAnim = new domain.common.Animation('char-appear', 1000)
        this.hideAnim = new domain.common.Animation('char-disappear', 1000)

    }

})
