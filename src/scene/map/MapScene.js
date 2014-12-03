/**
 * @class
 * MapScene handles the scene of map
 */
scene.map.MapScene = (function ($) {
    'use strict';

    var exports = function () {
        // domain objects
        this.floor = new domain.map.Floor();
        this.wall = new domain.map.Wall();
        this.wall.loadFromObjectList(window.woList);

        // ui
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));
        this.lifeButton = {};
    };

    var msPrototype = exports.prototype = new scene.common.Scene();

    msPrototype.start = function () {
        var that = this;

        return pages.common.BackgroundService.turnWhite().then(function () {

            return that.floor.appear();

        }).then(function () {

            return that.wall.appear();

        }).then(function () {

            return that.menuButton.show();

        });
    };

    msPrototype.fadeOut = function () {
        this.menuButton.hide();

        var that = this;

        return wait().then(function () {

            return that.floor.disappear();

        }).then(function () {

            return pages.common.BackgroundService.turnBlack();

        });
    };

    return exports;

}(window.jQuery));
