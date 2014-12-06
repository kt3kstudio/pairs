/**
 * @class
 * @extends scene.common.Scene
 * MapScene handles the scene of map
 */
scene.map.MapScene = (function ($) {
    'use strict';

    var exports = function () {
        // domain objects
        this.floor = new domain.map.Floor();
        this.wall = new domain.map.Wall();
        this.wall.loadFromObjectList(window.woList);
        this.ma = new domain.common.Ma().setParent(this.wall.$dom);

        this.cls = new domain.map.CharLocateService(this.wall, this.ma);

        this.wall.setCharLocateService(this.cls);

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

        }).then(function () {

            return that.cls.charAppear(that.wall.wos[0]);

        });
    };

    msPrototype.fadeOut = function () {
        this.menuButton.hide();

        var that = this;

        return this.wall.disappear().then(function () {

            return that.floor.disappear();

        }).then(function () {

            return pages.common.BackgroundService.turnBlack();

        });
    };

    msPrototype.askGoLevel = function (level) {
        if (window.confirm('getting into room ' + level + '?')) {
            this.goToLevel(level);
        }
    };

    /**
     * Move to the specified level.
     */
    msPrototype.goToLevel = function (level) {
        var that = this;

        return this.cls.getIntoDoor().then(function () {

            return that.fadeOut();

        }).then(function () {

            location.href = 'level.html#' + level;

        });

    };

    return exports;

}(window.jQuery));
