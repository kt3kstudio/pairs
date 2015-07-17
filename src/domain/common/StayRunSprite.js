

/**
 * The sprite class for stay-run creatures.
 *
 * @extends domain.common.Sprite
 */
domain.common.StayRunSprite = subclass(domain.common.Sprite, function (pt, parent) {
    'use strict';

    pt.awayDur = 400;
    pt.awayAnim = '';
    pt.awayAnimDur = 400;

    pt.defaultDir = 'left';
    pt.defaultState = 'stay';

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.defaultImage = new domain.common.Image(this.leftStayImage);

        this.dirStateImage = {

            left: {
                stay: new domain.common.Image(this.leftStayImage),
                run: new domain.common.Image(this.leftRunImage)
            },
            right: {
                stay: new domain.common.Image(this.leftStayImage, true),
                run: new domain.common.Image(this.leftRunImage, true)
            }

        };

    };

    pt.runAway = function (dir) {

        this.setDirState(dir, 'run');

        var isRight = dir === 'right';

        this.elem.css('transition-property', 'left, opacity');
        this.elem.css('transition-timing-function', 'ease-in');

        this.setTransitionDuration(this.awayDur);

        var awayDistance = 170;

        this.moveToX(this.x - awayDistance + isRight * awayDistance * 2);

        var that = this;

        return wait(this.awayDur).then(function () {

            that.setTransitionDuration(that.awayAnimDur);

            that.elem.css('opacity', 0);

            return wait(that.awayAnimDur);

        }).then(function () {

            that.elem.remove();

        });

    };

    pt.runAwayRight = function () {

        return this.runAway('right');

    };

    pt.runAwayLeft = function () {

        return this.runAway('left');

    };

});

