/* jshint quotmark: false */
var h = 100;
var w = 70;
window.woList = [
    {"type": "l", "name": "0", level: "0", "pos": [100, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "1", level: "1", "pos": [300, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "2", level: "2", "pos": [500, -h], "size": [w, h], "star": 3, "score": 5000, },
    {"type": "l", "name": "3", level: "3", "pos": [700, -h], "size": [w, h], "star": 3, "score": 5000, },
];

/**
 * @class
 * Wall class handles the position of wall (scrolling of wall div ('.floor-wrapper')) and objects on wall.
 */
domain.map.Wall = (function ($) {
    'use strict';

    var exports = function () {
        this.wos = [];
        this.groundLevel = $(window).height() * (1 - domain.map.Floor.HEIGHT_RATE);
        this.wallWidth = $(window).width();
        this.$dom = $('.floor-wrapper');
    };

    var wallPt = exports.prototype;

    wallPt.loadFromObjectList = function (woList) {
        var that = this;

        this.wos = woList.map(function (wo) {

            that.transformCoordinates(wo);

            return domain.map.Door.createFromObject(wo).setParent(that.$dom);

        });

        this.expandRightLimit(100);
    };

    wallPt.transformCoordinates = function (wo) {
        wo.pos[1] += this.groundLevel;
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

            that.scrollSetToDoor(cls.position.level);
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
            console.log(wo);
            p = p.then(function () {
                wo.disappear();

                return wait(100);
            });
        });

        return p;
    };

    wallPt.scrollSetToDoor = function (level) {
        var door = this.findDoorByLevel(level);

        if (door == null) {
            console.error('door not found (level = ' + level + ')');
        }

        return this.scrollSet(door.centerX());
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
     * @param {domain.common.CharSprite} chr
     * @returns {Boolean}
     */
    wallPt.visible = function (chr) {
        return chr.rightLimit() > this.$dom.scrollLeft() && chr.leftLimit() < this.$dom.scrollLeft() + this.wallWidth;
    };

    /**
     * Find the door object on the wall
     *
     * @param {String} level The level of the door to find
     * @returns {domain.map.Door}
     */
    wallPt.findDoorByLevel = function (level) {
        return this.wos.filter(function (wo) {
            return wo.level === level;
        })[0];
    };

    return exports;

}(window.jQuery));
