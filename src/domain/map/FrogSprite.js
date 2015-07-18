



/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */
domain.map.FrogSprite = subclass(domain.common.StayRunSprite, function (pt) {
    'use strict';

    pt.leftStayImage = 'images/frog-stay.out.svg';
    pt.leftRunImage = 'images/frog-run.out.svg';

    pt.w = 100;
    pt.h = 50;

    pt.x = 30;
    pt.y = 100;

    pt.awayDur = 400;
    pt.awayAnimDur = 400;

});

$.CC.assign('frog', domain.map.FrogSprite);
