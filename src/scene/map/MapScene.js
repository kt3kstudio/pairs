/**
 * @class
 * @extends scene.common.Scene
 * MapScene handles the scene of map
 */
scene.map.MapScene = subclass(scene.common.Scene, function (pt) {
    'use strict';

    /**
     * @constructor
     * @param {scene.common.Scene} prevScene The previous scene
     */
    pt.constructor = function (prevScene) {

        // domain objects
        this.floor = new domain.map.Floor();

        this.wall = new domain.map.Wall();
        this.wall.loadFromObjectList(prevScene.floor.objects.objects);

        this.chr = prevScene.chr;
        this.chr.setParent(this.wall.$dom);

        this.cls = new domain.map.CharLocateService(this.wall, this.chr);

        this.wall.setCharLocateService(this.cls);

        // ui
        this.menuButton = $('.menu-button').menuButton($('#map-menu'));
        this.lifeButton = {};
    };

    pt.start = function () {
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

    pt.fadeOut = function () {
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
     * @param {String} level The level
     */
    pt.goToLevel = function (level) {
        var that = this;

        return this.cls.getIntoDoor().then(function () {

            return that.fadeOut();

        }).then(function () {

            location.href = 'level.html#' + level;

        });

    };

    /**
     * Reloads the map scene.
     *
     * This is typically used when the the floor is changed.
     *
     * @return {Promise}
     */
    pt.reload = function () {
        var that = this;

        return this.cls.getIntoDoor().then(function () {

            return that.fadeOut();

        }).then(function () {

            location.reload();

        });
    };

});
