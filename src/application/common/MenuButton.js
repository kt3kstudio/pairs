window.pages = window.pages || {};
pages.common = pages.common || {};

pages.common.MenuButton = (function () {
    'use strict';

    var TRANS_DUR = 800;

    var R = 60;

    var itemOffsets = function (offset, num) {
        var result = [];

        var gutter = Math.PI / 4 / num / num;

        var urad = num > 1 ? (Math.PI / 2 - gutter * 2) / (num - 1) : 0;

        var r = R * Math.sqrt(num);

        for (var i = 0; i < num; i++) {
            var rad = urad * i;
            var cos = r * Math.cos(rad + gutter);
            var sin = r * Math.sin(rad + gutter);

            var res = {left: offset.left + cos, top: offset.top - sin};
            result.push(res);
        };

        return result;
    }

    var exports = function () {
        var that = this;

        this.$dom = $('.menu-button').on('click', function () {
            that.toggleMenu();
        });

        this.closed = true;
        this.menus = [];
    };

    var mbPrototype = exports.prototype;

    mbPrototype.show = function () {
        this.$dom.removeClass('hidden');

        return wait(TRANS_DUR);
    };

    mbPrototype.hide = function () {
        this.$dom.addClass('hidden');

        return wait(TRANS_DUR);
    };

    mbPrototype.openMenu = function () {

        this.closed = false;

        var fromOffset = this.$dom.offset();
        var toOffsets = itemOffsets(this.$dom.offset(), this.menus.length);

        return this.menus.reduce(function (p, menu) {

            return p.then(function () {
                menu.show(fromOffset, toOffsets.pop());

                return wait(50);
            });

        }, Promise.resolve()).then(function () {

            return wait(50);

        });

    };

    mbPrototype.closeMenu = function () {

        this.closed = true;

        var offset = this.$dom.offset();

        return this.menus.reduce(function (p, menu) {

            return p.then(function () {
                menu.hide(offset);

                return wait(100);
            });

        }, Promise.resolve()).then(function () {

            return wait(400);

        });

    };

    mbPrototype.toggleMenu = function () {
        if (this.closed) {

            return this.openMenu();
        }

        return this.closeMenu();
    };

    mbPrototype.addMenu = function (url, callback) {
        this.menus.push(new pages.common.MenuItem(url, callback));
    };

    mbPrototype.clearMenu = function () {
        this.menus = [];
    };

    return exports;

}());
