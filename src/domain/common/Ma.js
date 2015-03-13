
/**
 * The sprite class of Ma (the protagonist).
 *
 * @class
 * @extends domain.common.CharSprite
 */
domain.common.Ma = subclass(domain.common.CharSprite, function (pt) {
    'use strict';

    pt.id = 'ma';
    pt.name = 'ma';

    pt.x = 0;
    pt.y = 0;
    pt.w = 40;
    pt.h = 60;

    pt.upImage = 'images/ma-B.svg';
    pt.downImage = 'images/ma-F.svg';
    pt.leftImage = 'images/ma-L.svg';
    pt.rightImage = 'images/ma-R.svg';

    pt.appearAnim = 'char-appear';
    pt.appearDur = 1000;
    pt.disappearAnim = 'char-disappear';
    pt.disappearDur = 1000;

});
