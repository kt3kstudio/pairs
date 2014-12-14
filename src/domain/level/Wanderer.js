/**
 * @class
 * Wanderer class represents a bom (nim and neef).
 *
 * This class can move along the given grid which is specified as the metrics (left, top, unit).
 */
domain.level.Wanderer = (function ($) {
    'use strict';

    var exports = function (x, y, gene, left, top, unit) {
        this.x = x;
        this.y = y;
        this.width = Math.floor(unit / 2);
        this.gutter = Math.floor(unit / 4);

        this.$dom = $('<object type="image/svg+xml" />').css({
            'position': 'absolute',
            'width': this.width + 'px',
            'height': this.width + 'px',
        });

        this.setTransitionDuration(window.NUDUR);
        this.setGene(gene);
        this.setMetrics(left, top, unit);

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

    var wPrototype = exports.prototype;

    wPrototype.setTransitionDuration = function (dur) {
        this.transDur = dur;

        this.$dom.css('transition-duration', dur + 'ms');

        return wait(0, this);
    };

    wPrototype.setGene = function (gene) {
        this.gene = gene;

        if (gene === 'm') {
            return this.setMaleColor();
        } else if (gene === 'f') {
            return this.setFemaleColor();
        }
    };

    wPrototype.setFemaleColor = function () {
        this.$dom.attr('data', 'images/neef.svg');

        return this;
    };

    wPrototype.setMaleColor = function () {
        this.$dom.attr('data', 'images/nim.svg');

        return this;
    };

    wPrototype.appear = function (dom) {

        return this.$dom.prependTo(dom || document.body).anim('bom-appear', 500);
    };

    wPrototype.disappear = function () {
        var that = this;

        this.$dom.css('visibility', 'hidden');

        return this.$dom.anim('bom-disappear', 500).then(function () {
            that.remove();
        });
    };

    wPrototype.setMetrics = function (left, top, unit) {
        this.offsetX = left;
        this.offsetY = top;
        this.unit = unit;

        return this;
    };

    wPrototype.locate = function () {
        this.$dom.css('top', this.offsetY + this.unit * this.y + this.gutter + 'px');
        this.$dom.css('left', this.offsetX + this.unit * this.x + this.gutter + 'px');

        return wait(this.transDur, this);
    };

    wPrototype.remove = function () {
        this.$dom.remove();

        exports.allList.splice(exports.allList.indexOf(this), 1);
    };

    wPrototype.move = function (x, y) {
        this.x += x;
        this.y += y;

        return this.locate();
    };

    wPrototype.up = function () { return this.move(0, -1); };
    wPrototype.down = function () { return this.move(0, 1); };
    wPrototype.left = function () { return this.move(-1, 0); };
    wPrototype.right = function () { return this.move(1, 0); };

    return exports;

}(window.jQuery));
