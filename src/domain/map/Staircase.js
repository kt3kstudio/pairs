

/**
 * Staircase class represents the staircases in the map view.
 */
domain.map.Staircase = (function () {
    'use strict';

    var exports = function (name, to, type) {
        this.name = name;
        this.to = to;
        this.type = type;
    };

    exports.createFromObject = function (obj) {

        var factory = new datadomain.CharPositionFactory();

        return new exports(

            obj.name,
            factory.createFromObject(obj.opts.to),
            obj.opts.type

        ).setPos(obj.pos).setSize(obj.size);
    };

    var sPt = exports.prototype = new domain.map.WallObject();

    sPt.createDom = function () {
        var that = this;

        this.$dom = $('<div />').addClass('staircase staircase-' + this.type);

        this.$dom.on('click touchstart', function () {

            that.cls.moveToWallObjectByName(that.name).then(function () {

                return that.cls.setCharPosition(that.to);

            }).then(function () {

                return window.ms.reload();

            });

        });

        return this.$dom;
    };

    return exports;

}());
