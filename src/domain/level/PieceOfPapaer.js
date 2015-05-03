
/**
 * @class
 * @extends domain.common.CharSprite
 * PieceOfPaper represents a piece of paper which is on the floor of each room (level).
 *
 * On a piece of paper, the instruction for clearing the level is written down,
 * and ma will take it up & read it,
 * then the level will start.
 */
domain.level.PieceOfPaper = subclass(domain.common.CharSprite, function (pt) {
    'use strict';

    pt.x = 0;
    pt.y = 0;
    pt.w = 50;
    pt.h = 50;

    pt.image = 'images/paper.svg';
    pt.cssClass = 'sprite piece-of-paper';

    pt.appearAnim = 'paper-appear';

    pt.disappearAnim = 'paper-disappear';

});
