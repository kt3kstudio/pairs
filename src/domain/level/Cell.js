/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
domain.level.Cell = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {String} gene The gene string
     * @param {String|HTMLElement} parent The parent dom
     */
    pt.constructor = function (gene, parent) {

        this.setGene(gene);
        this.setTransitionDuration(300);

        this.parent = parent || 'body';

        this.__isLastOne = false;
        this.__isEvolved = false;

        pt.constructor.allList.push(this);
    };

    pt.constructor.allList = [];

    pt.constructor.disappear = function () {
        var p = Promise.resolve();

        pt.constructor.allList.forEach(function (cell) {
            p = p.then(function () {
                cell.disappear();

                return wait(10);
            });
        });

        return p.then(function () {
            return wait(500);
        });
    };


    /**
     * Sets the dimension.
     *
     * @param {Object} dimension The dimension
     * @return {domain.level.Cell}
     */
    pt.setDimension = function (dimension) {
        this.dimension = dimension;
        this.width = Math.floor(dimension.unit / 2);
        this.gutter = Math.floor(dimension.unit / 4);

        return this;
    };


    /**
     * Sets the transition duration.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */
    pt.setTransitionDuration = function (dur) {
        this.locateDur = dur;

        return this.setTransitionDuration_();
    };


    pt.setTransitionDuration_ = function () {
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
    pt.setGene = function (gene) {
        this.gene = gene;

        return this;
    };


    /**
     * Sets the coordinate
     *
     * @param {Array} yx The array of [y, x]
     * @return {domain.level.Cell}
     */
    pt.setXY = function (yx) {
        this.x = yx[1];
        this.y = yx[0];

        return this;
    };


    /**
     * Sets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.setLastOne = function () {
        this.__isLastOne = true;

        return this;
    };


    /**
     * Unsets the flag of the last one.
     *
     * @return {domain.level.Cell}
     */
    pt.unsetLastOne = function () {
        this.__isLastOne = false;

        return this;
    };


    /**
     * Returns true if it's the last one of the round.
     *
     * @return {Boolean}
     */
    pt.isLastOne = function () {
        return this.__isLastOne;
    };

    /**
     * Sets the flag of being evolved from the parents.
     */
    pt.setEvolved = function () {
        this.__evolved = true;

        return this;
    };


    /**
     * Unsets the flag of being evolved.
     */
    pt.unsetEvolved = function () {
        this.__evolved = false;

        return this;
    };


    /**
     * Returns true if it's evolved from its parents, otherwise false.
     *
     * @return {Boolean}
     */
    pt.isEvolved = function () {

        return this.__evolved;

    };


    /**
     * Chooses the image for the gene.
     *
     * @private
     * @return {String}
     */
    pt.selectImage = function () {
        if (this.gene === 'f') {
            return 'images/neef.svg';
        }

        if (this.gene === 'm') {
            return 'images/nim.svg';
        }

        if (this.gene === 'a') {
            return 'images/ankh.svg';
        }

        if (this.gene === 'w') {
            return 'images/wheel.svg';
        }

        if (this.gene === 'b') {
            return 'images/box.svg';
        }

        var cellKind = domain.common.BomTable[this.gene.length];

        return 'images/' + cellKind + '.svg';
    };

    /**
     * Creates the dom for this
     *
     * @return {jQuery}
     */
    pt.createDom = function () {
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
     * Reset the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    pt.resetShapeAndLocate = function () {

        this.$dom.css({
            'width': this.width + 'px',
            'height': this.width + 'px'
        });

        return this.locate();

    };

    pt.appearDur = 500;

    pt.appear = function () {

        var that = this;

        return Promise.resolve(this.createDom()).then(function () {

            return Promise.all([that.locate(), that.$dom.anim('bom-appear', that.appearDur)]);

        }).then(function () {

            return that;

        });

    };

    pt.disappearDur = 500;

    pt.disappear = function () {
        var that = this;

        this.$dom.css('visibility', 'hidden');

        return this.$dom.anim('bom-disappear', this.disappearDur).then(function () {

            that.remove();

        });
    };

    pt.locate = function () {
        this.$dom.css('top', this.dimension.top + this.dimension.unit * this.y + this.gutter + 'px');
        this.$dom.css('left', this.dimension.left + this.dimension.unit * this.x + this.gutter + 'px');

        return wait(this.locateDur, this);
    };

    pt.remove = function () {

        this.$dom.remove();

        pt.constructor.allList.splice(pt.constructor.allList.indexOf(this), 1);

    };

    pt.move = function (x, y) {

        this.x += x;
        this.y += y;

        return this.locate();

    };

    pt.up = function () { return this.move(0, -1); };
    pt.down = function () { return this.move(0, 1); };
    pt.left = function () { return this.move(-1, 0); };
    pt.right = function () { return this.move(1, 0); };

});
