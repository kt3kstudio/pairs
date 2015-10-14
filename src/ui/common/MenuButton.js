/**
 * @class
 * MenuButton handles the behaviour of the menu button.
 */
ui.common.MenuButton = subclass(function (pt) {
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

    pt.constructor = function ($dom) {
        var that = this;

        this.$dom = $dom.on('click', function () {
            that.toggleMenu();
        });

        this.closed = true;
        this.menus = [];
    };

    pt.show = function () {
        this.$dom.removeClass('menu-hidden');

        return wait(TRANS_DUR);
    };

    pt.hide = function () {

        var that = this;

        return this.closeMenu().then(function () {

            return wait(300);

        }).then(function () {

            that.$dom.addClass('menu-hidden');

        });
    };

    pt.openMenu = function () {

        console.log('openMenu');

        this.closed = false;

        var fromOffset = this.$dom.offset();
        var toOffsets = itemOffsets(this.$dom.offset(), this.menus.length);

        return Promise.all(this.menus.map(function (menu, i) {

            return wait(50 * i).then(function () {

                menu.show(fromOffset, toOffsets[i]);

            });

        }));

    };

    pt.closeMenu = function (offset) {
        console.log('close menu');

        this.closed = true;

        offset = offset || this.$dom.offset();

        return this.menus.reduce(function (p, menu) {

            return p.then(function () {

                menu.hide(offset);

                var p = wait(50);

                if (menu.menuButton && !menu.menuButton.closed) {
                    p = p.then(function () {
                        return menu.menuButton.closeMenu(offset);
                    });
                }

                return p;
            });

        }, Promise.resolve());

    };

    pt.toggleMenu = function () {
        if (this.closed) {

            return this.openMenu();
        }

        return this.closeMenu();
    };

    pt.addMenu = function (url, callback, init) {
        this.menus.push(new ui.common.MenuItem(url, callback, init));
    };

    pt.clearMenu = function () {
        this.menus = [];
    };


    $.fn.menuButton = function () {

        return menuButtonFromNode(this);

    };

    var menuButtonFromNode = function (elem) {

        var menus;

        if (elem.data('menu')) {

            menus = elem.data('menu');

        }

        if (elem.attr('menu')) {

            menus = $('#' + elem.attr('menu'));

        }

        var array = menus.children().map(function () {
            var $dom = $(this);

            return {
                src: $(this).attr('src'),
                onclick: $dom.attr('onclick'),
                submenu: $dom
            };

        }).toArray();

        var menuButton = new ui.common.MenuButton(elem);

        array.forEach(function (menu) {
            var init;
            if (menu.submenu) {
                init = function () {
                    this.$dom.data('menu', menu.submenu);
                    this.menuButton = this.$dom.menuButton();
                };
            }
            menuButton.addMenu(menu.src, menu.onclick, init);
        });

        return menuButton;

    };

});
