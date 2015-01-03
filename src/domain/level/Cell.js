/**
 * @class
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 */
domain.level.Cell = (function () {
    'use strict';

    var exports = function (x, y, gene, left, top, unit, parent) {
        this.x = x;
        this.y = y;
        this.width = Math.floor(unit / 2);
        this.gutter = Math.floor(unit / 4);

        this.setGene(gene);
        this.setTransitionDuration(300);
        this.setMetrics(left, top, unit);

        this.parent = parent;

        exports.allList.push(this);
    };

    exports.allList = [];

    exports.disappear = function () {
        var p = Promise.resolve();

        exports.allList.forEach(function (cell) {
            p = p.then(function () {
                cell.disappear();

                return wait(10);
            });
        });

        return p.then(function () {
            return wait(500);
        });
    };

    var cellPt = exports.prototype;

    cellPt.setTransitionDuration = function (dur) {
        this.locateDur = dur;

        return this.setTransitionDuration_();
    };

    cellPt.setTransitionDuration_ = function () {
        if (this.$dom) {
            this.$dom.css('transition-duration', this.locateDur + 'ms');
        }

        return wait(0, this);
    };



    cellPt.setGene = function (gene) {
        this.gene = gene;

        return this;
    };


    cellPt.setXY = function (yx) {
        this.x = yx[1];
        this.y = yx[0];

        return this;
    };

    cellPt.setIsLastOne = function (isLastOne) {
        this.__isLastOne = isLastOne;

        return this;
    };

    cellPt.selectImage = function () {
        if (this.gene === 'f') {
            return 'images/neef.svg';
        }

        if (this.gene === 'm') {
            return 'images/nim.svg';
        }

        var cellKind = domain.common.BomTable[this.gene.length];

        return 'images/' + cellKind + '.svg';
    };

    cellPt.createDom = function () {
        var that = this;

        var $dom = this.$dom = $('<object type="image/svg+xml" />').css({
            'position': 'absolute',
            'width': this.width + 'px',
            'height': this.width + 'px',
        });

        $dom.attr('data', this.selectImage()).prependTo(this.parent);

        return this.$dom.once('load').then(function () {
            that.setTransitionDuration_();
            that.locate();

            var genes = that.gene.split('');

            var $svg = $(that.$dom[0].contentDocument);

            for (var i = 0; i < genes.length; i++) {
                $('#' + i, $svg).attr('class', genes[i]);
            }

            return $dom;
        });
    };

    cellPt.appearDur = 500;

    cellPt.appear = function () {

        var that = this;

        return this.createDom().then(function ($dom) {

            return $dom.anim('bom-appear', that.appearDur);

        }).then(function () {

            return that;

        });

    };

    cellPt.disappearDur = 500;

    cellPt.disappear = function () {
        var that = this;

        this.$dom.css('visibility', 'hidden');

        return this.$dom.anim('bom-disappear', this.disappearDur).then(function () {

            that.remove();

        });
    };

    cellPt.setMetrics = function (left, top, unit) {
        this.offsetX = left;
        this.offsetY = top;
        this.unit = unit;

        return this;
    };

    cellPt.locate = function () {
        this.$dom.css('top', this.offsetY + this.unit * this.y + this.gutter + 'px');
        this.$dom.css('left', this.offsetX + this.unit * this.x + this.gutter + 'px');

        return wait(this.locateDur, this);
    };

    cellPt.remove = function () {
        this.$dom.remove();

        exports.allList.splice(exports.allList.indexOf(this), 1);
    };

    cellPt.move = function (x, y) {
        this.x += x;
        this.y += y;

        return this.locate();
    };

    cellPt.up = function () { return this.move(0, -1); };
    cellPt.down = function () { return this.move(0, 1); };
    cellPt.left = function () { return this.move(-1, 0); };
    cellPt.right = function () { return this.move(1, 0); };

    return exports;

}());
