
/**
 * Wall class handles the position of wall and objects on wall.
 *
 * It's also responsible for the position of the camera.
 *
 * @class
 * @extends domain.common.Actor
 */
domain.map.Wall = subclass(domain.common.Actor, function (pt, parent) {
    'use strict';

    var ONE = {};

    /**
     * @constructor
     */
    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.groundLevel = $(window).height() * (1 - domain.map.Floor.HEIGHT_RATE);

        this.elem.mapEvent(this, ONE);

        var that = this;

        this.elem.on('floor-loaded', function () {

            that.init();

        });

    };


    pt.init = function () {

        this.wos = this.elem.find('.staircase, .door').map(function () {

            return $(this).getActor();

        }).toArray();

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



$.assignClassComponent('wall', domain.map.Wall);
