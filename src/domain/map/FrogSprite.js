



/**
 * The sprite class of the frog (Obstacle creatures in front of the doors.
 * Some people call it dog).
 *
 * @extends domain.common.StayRunSprite
 */
domain.map.FrogSprite = subclass(domain.common.StayRunSprite, function (pt, parent) {
    'use strict'

    pt.leftStayImage = 'images/frog-stay.out.svg'
    pt.leftRunImage = 'images/frog-run.out.svg'

    pt.awayDur = 400;
    pt.awayAnimDur = 400;

    pt.constructor = function () {

        parent.constructor.apply(this, arguments)

        this.x = 40
        this.y = 100

        this.dimension = new domain.common.Dimension({
            width: 100,
            height: 50,
            ratioX: 0.5,
            ratioY: 1
        })

    }

})

$.cc.assign('frog', domain.map.FrogSprite)
