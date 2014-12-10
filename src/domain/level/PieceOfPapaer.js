
/**
 * @class
 * PieceOfPaper represents a piece of paper which is on the floor of each room (level).
 *
 * On a piece of paper, the instruction for clearing the level is written down,
 * and ma will take it up & read it,
 * then the level will start.
 */
domain.level.PieceOfPaper = (function () {
    'use strict';

    var exports = function () {
    };

    var popPt = exports.prototype = new domain.common.CharSprite();

    popPt.x = 0;
    popPt.y = 0;
    popPt.w = 50;
    popPt.h = 50;

    popPt.image = 'images/paper.svg';
    popPt.cssClass = 'sprite piece-of-paper';

    popPt.appearAnim = 'paper-appear';

    popPt.disappearAnim = 'paper-disappear';

    return exports;

}());
