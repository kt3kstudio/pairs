/**
 * @class
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 */
domain.level.Cell = (function () {
    'use strict';

    var exports = function (x, y, gene, parent) {
        this.x = x;
        this.y = y;

        this.setGene(gene);
        this.setTransitionDuration(300);

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


    /**
     * Sets the dimension.
     *
     * @param {Object} dimension The dimension
     * @return {domain.level.Cell}
     */
    cellPt.setDimension = function (dimension) {
        this.dimension = dimension;
        this.width = Math.floor(dimension.unit / 2);
        this.gutter = Math.floor(dimension.unit / 4);

        return this;
    };

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



    /**
     * Sets the gene.
     *
     * @param {String} gene The gene in string
     * @return {domain.level.Cell}
     */
    cellPt.setGene = function (gene) {
        this.gene = gene;

        return this;
    };


    /**
     * Sets the coordinate
     *
     * @param {Array} yx The array of [y, x]
     * @return {domain.level.Cell}
     */
    cellPt.setXY = function (yx) {
        this.x = yx[1];
        this.y = yx[0];

        return this;
    };

    cellPt.setIsLastOne = function (isLastOne) {
        this.__isLastOne = isLastOne;

        return this;
    };

    /**
     * Chooses the image for the gene.
     *
     * @private
     * @return {String}
     */
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

    /**
     * Creates the dom for this
     *
     * @return {jQuery}
     */
    cellPt.createDom = function () {
        var that = this;

        if (this.$dom) {
            return this.$dom;
        }

        var $dom = this.$dom = $('<object type="image/svg+xml" />').css({
            'position': 'absolute',
            'width': this.width + 'px',
            'height': this.width + 'px'
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


    /**
     * Recreates the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    cellPt.remorph = function () {
        this.$dom.css({
            'width': this.width + 'px',
            'height': this.width + 'px'
        });
    };

    cellPt.appearDur = 500;

    cellPt.appear = function () {

        var that = this;

        return Promise.resolve(this.createDom()).then(function ($dom) {

            that.remorph();

            return Promise.all([that.locate(), that.$dom.anim('bom-appear', that.appearDur)]);

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

    cellPt.locate = function () {
        this.$dom.css('top', this.dimension.top+ this.dimension.unit * this.y + this.gutter + 'px');
        this.$dom.css('left', this.dimension.left+ this.dimension.unit * this.x + this.gutter + 'px');

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


    /**
     * Returns object representation of the cell.
     *
     * @return {Object}
     */
    cellPt.toObject = function () {

        return {gene: this.gene};

    };

    return exports;

}());
