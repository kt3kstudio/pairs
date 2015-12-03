/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.level.Paper = subclass(domain.common.StaticSprite, function (pt) {
    'use strict'

    pt.x = 0
    pt.y = 0
    pt.width = 50
    pt.height = 50

    pt.image = 'images/paper.svg'

    pt.showAnim = new domain.common.Animation('paper-appear', 500)

    pt.hideAnim = new domain.common.Animation('paper-disappear', 500)

})

$.cc.assign('paper', domain.level.Paper)
