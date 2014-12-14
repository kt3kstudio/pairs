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

        this.setGene(gene);
        this.setTransitionDuration(window.NUDUR);
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

        this.createDom();

        if (gene === 'm') {
            this.setMaleColor();
        } else if (gene === 'f') {
            this.setFemaleColor();
        } else if (gene.length >= 2) {
            this.setMultiton();
        }
    };

    wPrototype.setFemaleColor = function () {
        this.$dom.attr('data', 'images/neef.svg');
    };

    wPrototype.setMaleColor = function () {
        this.$dom.attr('data', 'images/nim.svg');
    };

    wPrototype.selectMultitonUrl = function () {
        switch (this.gene.length) {
            case 2: return 'images/deutron.svg';
            case 3: return 'images/triton.svg';
            case 4: return 'images/quatron.svg';
        }
    };

    wPrototype.setMultiton = function () {
        var that = this;

        this.$dom.attr('data', this.selectMultitonUrl());

        this.$dom.one('load', function () {
            var genes = that.gene.split('');

            var $svg = $(that.$dom[0].contentDocument);

            for (var i = 0; i < genes.length; i++) {
                $('#' + i, $svg).attr('class', genes[i]);
            }
        });
    };

    wPrototype.createDom = function () {
        this.$dom = $('<object type="image/svg+xml" />').css({
            'position': 'absolute',
            'width': this.width + 'px',
            'height': this.width + 'px',
        });

        return this.$dom;
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
