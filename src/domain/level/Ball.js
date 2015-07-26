/**
 * Ball class represents the ball inside the field of the level.
 *
 * @class
 */
domain.level.Ball = subclass(domain.common.Being, function (pt, parent) {
    'use strict';

    var TRANS_DUR = 300;

    var MAX = 3;

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        var pos = elem.data('pos');

        this.x = pos.x;
        this.y = pos.y;

        this.dimension = elem.data('dimension'); 

    };

    pt.willShow = function () {

        this.elem.css('display', 'inline');
        this.elem.css('position', 'absolute');

        this.elem.width(this.dimension.unit);
        this.elem.height(this.dimension.unit);

        this.locate();

    }

    pt.maxX = MAX;
    pt.maxY = MAX;

    pt.showAnim = 'ball-appear';
    pt.showAnimDur = TRANS_DUR;

    pt.hideAnim = 'ball-disappear';
    pt.hideAnimDur = TRANS_DUR;

    pt.locateDur = TRANS_DUR;

    /**
     * Moves the ball to the direction.
     *
     * @param {String} dir
     * @return {Promise}
     */
    pt.move = function (dir) {

        return this.setPos(this.posAhead(dir));

    };

    pt.pos = function () {

        return {x: this.x, y: this.y};

    };

    pt.posAhead = function (dir) {

        switch (dir) {
            case 'up': return this.relativePos(0, -1);
            case 'down': return this.relativePos(0, 1);
            case 'left': return this.relativePos(-1, 0);
            case 'right': return this.relativePos(1, 0);
        }

    };

    pt.relativePos = function (x, y) {

        return {x: (this.x + x + this.maxX) % this.maxX, y: (this. y + y + this.maxY) % this.maxY};

    };

    pt.setPos = function (pos) {

        this.x = pos.x;
        this.y = pos.y;

        return this.locate();

    };

    /**
     * @private
     */
    pt.locate = function () {

        this.elem.css('top', this.dimension.top + this.y * this.dimension.unit + 'px');
        this.elem.css('left', this.dimension.left + this.x * this.dimension.unit + 'px');

        return wait(this.locateDur);

    };

    pt.refuseToMove = function (dir) {

        if (dir === 'up' || dir === 'down') {

            return this.elem.anim('ball-refuse-y', this.locateDur);

        } else {

            return this.elem.anim('ball-refuse-x', this.locateDur);

        }

    };

});

$.CC.assign('ball', domain.level.Ball);
