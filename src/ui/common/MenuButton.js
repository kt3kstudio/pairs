/**
 * @class
 * MenuButton handles the behaviour of the menu button.
 */
ui.common.MenuButton = (function ($) {
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
        }

        return result;
    };

    var exports = function ($dom) {
        var that = this;

        this.$dom = $dom.on('click', function () {
            that.toggleMenu();
        });

        this.closed = true;
        this.menus = [];
    };

    var mbPrototype = exports.prototype;

    mbPrototype.show = function () {
        this.$dom.removeClass('menu-hidden');

        return wait(TRANS_DUR);
    };

    mbPrototype.hide = function () {

        var that = this;

        return this.closeMenu().then(function () {
            return wait(300);
        }).then(function () {
            that.$dom.addClass('menu-hidden');
        });
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

    mbPrototype.closeMenu = function (offset) {
        console.log('close menu');

        this.closed = true;

        offset = offset || this.$dom.offset();

        return this.menus.reduce(function (p, menu) {

            return p.then(function () {

                var p = menu.hide(offset);

                if (menu.menuButton && !menu.menuButton.closed) {
                    p = p.then(function () {
                        return menu.menuButton.closeMenu(offset);
                    });
                }

                return p;
            });

        }, Promise.resolve()).then(function () {

            return wait(0);

        });

    };

    mbPrototype.toggleMenu = function () {
        if (this.closed) {

            return this.openMenu();
        }

        return this.closeMenu();
    };

    mbPrototype.addMenu = function (url, callback, init) {
        this.menus.push(new ui.common.MenuItem(url, callback, init));
    };

    mbPrototype.clearMenu = function () {
        this.menus = [];
    };


    $.fn.menuButton = function (menus) {
        menus = menus || [];

        if (menus instanceof $) {
            return this.menuButtonFromNode(menus);
        }

        var menuButton = new exports(this);

        menus.forEach(function (menu) {
            var init;
            if (menu.submenu) {
                init = function () {
                    this.menuButton = this.$dom.menuButton(menu.submenu);
                };
            }
            menuButton.addMenu(menu.src, menu.onclick, init);
        });

        return menuButton;
    };

    $.fn.menuButtonFromNode = function (node) {
        var menus = node.children().map(function () {
            var $dom = $(this);

            var script = $dom.attr('onclick');

            var onclick;

            if (script != null && script !== '') {
                onclick = function () { eval(script); };
            }

            return {
                src: $(this).attr('src'),
                onclick: onclick,
                submenu: $dom
            };

        }).toArray();

        return this.menuButton(menus);
    };

    return exports;

}(window.jQuery));
