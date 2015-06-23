/**
 * @class
 * Ball class represents the ball inside the field of the level.
 */
domain.level.Ball = (function () {
    'use strict';

    var TRANS_DUR = 300;

    var MAX = 3;

    var exports = function (dimension, pos, parent) {
        this.x = pos.x;
        this.y = pos.y;

        this.dimension = dimension;

        this.setParent(parent);
    };

    var ballPt = exports.prototype = new domain.common.Sprite($('<img />'));

    ballPt.maxX = MAX;
    ballPt.maxY = MAX;

    ballPt.createDom = function () {
        this.$dom = $($('#tpl-ball').text()).css({
            width: this.dimension.unit + 'px',
            height: this.dimension.unit + 'px'
        });

        this.locate();

        return this.$dom;
    };

    ballPt.appearAnim = 'ball-appear';
    ballPt.appearDur = TRANS_DUR;

    ballPt.disappearAnim = 'ball-disappear';
    ballPt.disappearDur = TRANS_DUR;

    ballPt.locateDur = TRANS_DUR;

    ballPt.move = function (dir) {
        return this.setPos(this.posAhead(dir));
    };

    ballPt.pos = function () {
        return {x: this.x, y: this.y};
    };

    ballPt.posAhead = function (dir) {
        switch (dir) {
            case 'up': return this.relativePos(0, -1);
            case 'down': return this.relativePos(0, 1);
            case 'left': return this.relativePos(-1, 0);
            case 'right': return this.relativePos(1, 0);
        }
    };

    ballPt.relativePos = function (x, y) {
        return {x: (this.x + x + this.maxX) % this.maxX, y: (this. y + y + this.maxY) % this.maxY};
    };

    ballPt.setPos = function (pos) {
        this.x = pos.x;
        this.y = pos.y;

        return this.locate();
    };

    ballPt.locate = function () {
        this.$dom.css('top', this.dimension.top + this.y * this.dimension.unit + 'px');
        this.$dom.css('left', this.dimension.left + this.x * this.dimension.unit + 'px');

        return wait(this.locateDur);
    };

    ballPt.refuseToMove = function (dir) {
        if (dir === 'up' || dir === 'down') {

            return this.$dom.anim('ball-refuse-y', this.locateDur);

        } else {

            return this.$dom.anim('ball-refuse-x', this.locateDur);

        }
    };

    return exports;

}());
