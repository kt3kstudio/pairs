
/**
 * PieceOfPaper represents a piece of paper which is on the floor of each room (obsolete).
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.level.Paper = subclass(domain.common.StaticSprite, function (pt) {
    'use strict';

    pt.x = 0;
    pt.y = 0;
    pt.w = 50;
    pt.h = 50;

    pt.image = 'images/paper.svg';

    pt.showAnim = 'paper-appear';
    pt.hideAnimDur = 500;

    pt.hideAnim = 'paper-disappear';
    pt.hideAnimDur = 500;

});


$.cc.assign('paper', domain.level.Paper);
