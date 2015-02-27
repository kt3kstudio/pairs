
/**
 * @class
 * Wall class handles the position of wall (scrolling of wall div ('.floor-wrapper')) and objects on wall.
 */
domain.map.Wall = (function ($) {
    'use strict';

    /**
     * @constructor
     */
    var exports = function () {
        this.wos = [];
        this.groundLevel = $(window).height() * (1 - domain.map.Floor.HEIGHT_RATE);
        this.wallWidth = $(window).width();
        this.$dom = $('.floor-wrapper');
    };

    var wallPt = exports.prototype;

    /**
     * Loads floorObjects from the array of FloorObjects
     *
     * @param {Array} objects The array of floorObjects
     */
    wallPt.loadFromObjectList = function (objects) {
        var that = this;

        this.wos = objects.map(function (floorObject) {

            that.transformCoordinates(floorObject);

            return domain.map.WallObjectFactory.createFromObject(floorObject).setParent(that.$dom);

        });

        this.expandRightLimit(100);
    };

    wallPt.transformCoordinates = function (floorObject) {
        floorObject.offset.y += this.groundLevel;
    };

    wallPt.expandRightLimit = function (val) {
        var x = this.rightLimit() + val;

        $('<div />')
            .appendTo(this.$dom)
            .css({width: '1px', height: '1px', 'position': 'absolute'})
            .offset({left: x, top: this.groundLevel});
    };

    wallPt.rightLimit = function () {
        return Math.max.apply(Math, this.wos.map(function (wo) { return wo.rightLimit(); }));
    };

    wallPt.appear = function () {
        var that = this;

        var p = this.cls.load().then(function (cls) {

            // load Floor data
            // load wo list

            that.scrollSetToPosition(cls.position.floorObjectId);
        });

        this.wos.forEach(function (wo) {
            p = p.then(function () {
                wo.appear();

                return wait(100);
            });
        });

        return p;
    };

    wallPt.disappear = function () {
        var p = Promise.resolve();

        this.wos.forEach(function (wo) {

            p = p.then(function () {
                wo.disappear();

                return wait(100);
            });

        });

        return p;
    };

    wallPt.scrollSetToPosition = function (id) {
        var wo = this.findById(id);

        if (wo == null) {
            console.error('wall object not found (position = ' + position + ')');

            return;
        }

        return this.scrollSet(wo.centerX());
    };

    wallPt.scrollSet = function (x) {
        this.$dom.scrollLeft(x - this.wallWidth / 2);

        return this;
    };

    wallPt.scroll = function (x, dur) {
        this.$dom.animate({scrollLeft: this.$dom.scrollLeft() + x}, dur);

        return wait(dur);
    };

    wallPt.scrollTo = function (x, dur) {
        this.$dom.animate({scrollLeft: x - this.wallWidth / 2}, dur);

        return wait(dur);
    };

    wallPt.setCharLocateService = function (cls) {
        this.cls = cls;

        this.wos.forEach(function (wo) {
            wo.setCharLocateService(cls);
        });

        return this;
    };

    /**
     * Check if the character is visible on the wall.
     *
     * @param {domain.common.CharSprite} chr The character
     * @returns {Boolean}
     */
    wallPt.visible = function (chr) {
        return chr.rightLimit() > this.$dom.scrollLeft() && chr.leftLimit() < this.$dom.scrollLeft() + this.wallWidth;
    };

    /**
     * Find the wall object of the given name.
     *
     * @param {String} name The name of the wall object
     * @returns {domain.map.Door}
     */
    wallPt.findById = function (id) {
        return this.wos.filter(function (wo) {
            return wo.id === id;
        })[0];
    };

    return exports;

}(window.jQuery));
