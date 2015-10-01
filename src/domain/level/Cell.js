/**
 * Cell class represents a unit (nim and neef) on the field of the level.
 *
 * This class can move along the given grid which is specified as the dimension object.
 *
 * @class
 */
domain.level.Cell = subclass(domain.common.Being, function (pt, parent) {
    'use strict';

    /**
     * @constructor
     * @param {String} gene The gene string
     * @param {String|HTMLElement} parent The parent dom
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.gene = elem.data('gene');

        this.__isLastOne = false;
        this.__isEvolved = false;

        pt.constructor.allList.push(this);
    };

    pt.constructor.allList = [];

    pt.constructor.disappear = function () {

        return pt.constructor.allList.map(function (cell, i) {

            wait(40 * i).then(function () {

                return cell.disappear();

            });

        }).pop();

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


    pt.transDur = 300;

    /**
     * Sets the transition duration.
     *
     * @param {Number} dur The duration
     * @return {Promise}
     */
    pt.setTransitionDuration = function (dur) {

        this.transDur = dur;

        this.elem.css('transition-duration', this.transDur + 'ms');

        return wait(0);

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
    pt.willShow = function () {

        var that = this;

        var elem = this.elem;

        elem.css({
            'position': 'absolute',
            'width': this.width + 'px',
            'height': this.width + 'px'
        });

        elem.attr('data', this.selectImage());

        return elem.once('load').then(function () {

            that.updateDomDimension();

            that.setTransitionDuration(300);

            var genes = that.gene.split('');

            var $svg = $(elem[0].contentDocument);

            for (var i = 0; i < genes.length; i++) {
                $('#' + i, $svg).attr('class', genes[i]);
            }

        });

    };


    /**
     * Reset the shape of the cell.
     *
     * For example, change the size of the dom.
     */
    pt.resetShapeAndLocate = function () {

        return this.updateDomDimension();

    };

    pt.showAnim = 'bom-appear';
    pt.showAnimDur = 500;

    pt.hideAnim = 'bom-disappear';
    pt.hideAnimDur = 500;

    pt.didAppear = function () {

        return this;

    };

    pt.anim = function (animationName, duration) {

        return this.elem.anim(animationName, duration);

    };

    pt.updateDomRect = function () {

        this.elem.css({
            'width': this.width + 'px',
            'height': this.width + 'px'
        });

        return wait(this.transDur);

    };

    pt.updateDomPosition = function () {

        this.elem.css('top', this.dimension.top + this.dimension.unit * this.y + this.gutter + 'px');
        this.elem.css('left', this.dimension.left + this.dimension.unit * this.x + this.gutter + 'px');

        return wait(this.transDur);

    };

    pt.updateDomDimension = function () {

        this.updateDomRect();

        return this.updateDomPosition();

    };

    pt.remove = function () {

        this.elem.remove();

        pt.constructor.allList.splice(pt.constructor.allList.indexOf(this), 1);

    };

    pt.move = function (x, y) {

        this.x += x;
        this.y += y;

        return this.updateDomPosition();

    };

    pt.up = function () { return this.move(0, -1); };
    pt.down = function () { return this.move(0, 1); };
    pt.left = function () { return this.move(-1, 0); };
    pt.right = function () { return this.move(1, 0); };

});


$.cc.assign('cell', domain.level.Cell);
