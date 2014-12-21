/**
 * @class
 * @extends scene.common.Scene
 * MapScene handles the scene of map
 */
scene.map.MapScene = (function ($) {
    'use strict';

    var exports = function (prevScene) {

        // domain objects
        this.floor = new domain.map.Floor();

        this.wall = new domain.map.Wall();
        this.wall.loadFromObjectList(prevScene.floor.woList);

        this.chr = prevScene.chr;
        this.chr.setParent(this.wall.$dom);

        this.cls = new domain.map.CharLocateService(this.wall, this.chr);

        this.wall.setCharLocateService(this.cls);

        // ui
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));
        this.lifeButton = {};
    };

    var msPrototype = exports.prototype = new scene.common.Scene();

    msPrototype.start = function () {
        var that = this;

        that.menuButton.show();

        return ui.common.BackgroundService.turnWhite().then(function () {

            return that.floor.appear();

        }).then(function () {

            return that.wall.appear();

        }).then(function () {

            return that.cls.charAppear();

        });
    };

    msPrototype.fadeOut = function () {
        this.menuButton.hide();

        var that = this;

        return this.wall.disappear().then(function () {

            return that.floor.disappear();

        }).then(function () {

            return ui.common.BackgroundService.turnBlack();

        });
    };


    /**
     * Go to the specified level.
     *
     * @param {String} level
     */
    msPrototype.goToLevel = function (level) {
        var that = this;

        return this.cls.getIntoDoor().then(function () {

            return that.fadeOut();

        }).then(function () {

            location.href = 'level.html#' + level;

        });

    };

    /**
     * Go to the specified floor.
     *
     * @param {String} floor The floor name
     * @return {Promise}
     */
    msPrototype.goToFloor = function (floor) {
        var that = this;

        return this.cls.getIntoDoor().then(function () {

            return that.fadeOut();

        }).then(function () {

            location.reload();

        });
    };

    return exports;

}(window.jQuery));
