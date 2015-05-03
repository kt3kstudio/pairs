
/**
 * @class
 * Wall class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * @domClass wall
 */
domain.map.Wall = subclass(function (pt) {
    'use strict';

    /**
     * @constructor
     */
    pt.constructor = function (elem) {
        this.groundLevel = $(window).height() * (1 - domain.map.Floor.HEIGHT_RATE);
        this.wallWidth = $(window).width();

        this.elem = elem;

        this.walker = elem.getActor('.floor-walker');

        elem.registerActor(this);
    };


    pt.init = function () {

        this.wos = this.elem.getActorList('.staircase, .door');

        this.wos.forEach(function (wo) {

            this.transformCoordinates(wo);

        }, this);

        this.expandRightLimit(180);

    };


    /**
     * Transforms the y coordinate to fit to the floor level.
     *
     * @param {domain.map.WallObject} wo The target WallObject
     */
    pt.transformCoordinates = function (wo) {

        wo.y *= -1;
        wo.y += this.groundLevel;
        wo.y -= wo.h;

    };


    /**
     * Expands the right limit of the wall div.
     *
     * @private
     */
    pt.expandRightLimit = function (val) {
        var x = this.rightLimit() + val;

        this.elem.width(x);
    };

    pt.rightLimit = function () {
        return Math.max.apply(Math, this.wos.map(function (wo) { return wo.rightLimit(); }));
    };

    pt.appear = function () {

        this.init();

        var p = Promise.resolve();

        this.wos.forEach(function (wo) {
            p = p.then(function () {
                wo.appear();

                return wait(100);
            });
        });

        return p;
    };

    pt.disappear = function () {
        var p = Promise.resolve();

        this.wos.forEach(function (wo) {

            p = p.then(function () {
                wo.disappear();

                return wait(100);
            });

        });

        return p;
    };

    pt.scrollSet = function (x) {
        this.elem.scrollLeft(x - this.wallWidth / 2);

        return this;
    };

    pt.scroll = function (x, dur) {
        this.elem.animate({scrollLeft: this.elem.scrollLeft() + x}, dur);

        return wait(dur);
    };

    pt.scrollTo = function (x, dur) {
        this.elem.animate({scrollLeft: x - this.wallWidth / 2}, dur);

        return wait(dur);
    };

    /**
     * Check if the character is visible on the wall.
     *
     * @param {domain.common.CharSprite} chr The character
     * @returns {Boolean}
     */
    pt.visible = function (chr) {
        return chr.rightLimit() > this.elem.scrollLeft() && chr.leftLimit() < this.elem.scrollLeft() + this.wallWidth;
    };

    /**
     * Find the wall object of the given id.
     *
     * @param {String} id The id of the wall object
     * @returns {domain.map.Door}
     */
    pt.findById = function (id) {
        return this.wos.filter(function (wo) {
            return wo.id === id;
        })[0];
    };

});



$.assignClass('wall', domain.map.Wall);
