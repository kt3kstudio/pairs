/**
 * @class
 * WallObject is an abstract class which represents the something on the wall in the map view.
 */
domain.map.WallObject = subclass(function (pt) {
    'use strict';

    pt.setParent = function (parent) {
        this.parent = parent;

        return this;
    };

    /**
     * @param {datadomain.Offset} offset The offset
     */
    pt.setPos = function (offset) {
        this.x = offset.x;
        this.y = offset.y;

        return this;
    };

    pt.rightLimit = function () {
        return this.x + this.w;
    };

    pt.centerX = function () {
        return this.x + this.w / 2;
    };

    pt.centerY = function () {
        return this.y + this.h;
    };


    /**
     * Sets the size of the wall object.
     *
     * @param {datadomain.Size} size The size
     */
    pt.setSize = function (size) {
        this.w = size.width;
        this.h = size.height;

        return this;
    };

    pt.setCharLocateService = function (cls) {
        this.cls = cls;

        return this;
    };

    pt.createDom = function () {
        return $('<div />').css({
            backgroundColor: 'black',
            opcaity: 0,
        });
    };

    pt.appear = function () {
        this.$dom = this.$dom || this.createDom().width(this.w).height(this.h).offset({left: this.x, top: this.y}).appendTo(this.parent);

        return this.$dom.anim(this.appearAnim, this.appearDur);
    };

    pt.disappear = function () {
        var that = this;

        return this.$dom.anim(this.disappearAnim, this.disappearDur).then(function () {
            that.$dom.remove();
        });
    };

    pt.open = function () {
        return Promise.resolve();
    };

    pt.close = function () {
        return Promise.resolve();
    };

});
