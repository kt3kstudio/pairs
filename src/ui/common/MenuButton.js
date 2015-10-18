/**
 * MenuButton handles the behaviour of the menu button.
 *
 * @class
 */
ui.common.MenuButton = subclass(domain.common.Role, function (pt, parent) {
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

    pt.constructor = function (elem) {

        parent.constructor.apply(this, arguments);

        this.closed = true;

        this.menus = this.getMenuItemSource().map(createMenuItem);

    };

    pt.getMenuItemSource = function () {

        if (this.elem.data('menu')) {

            return this.elem.data('menu');

        }

        if (this.elem.attr('menu')) {

            return $('#' + this.elem.attr('menu')).children().toArray();

        }

        throw new Error('no menu');

    };


    pt.show = function () {
        this.elem.removeClass('hidden');

        return wait(TRANS_DUR);
    };

    pt.hide = function () {

        var that = this;

        return this.closeMenu().then(function () {

            return wait(300);

        }).then(function () {

            that.elem.addClass('hidden');

        });
    };

    pt.openMenu = function () {

        console.log('openMenu');

        this.closed = false;

        var fromOffset = this.elem.offset();
        var toOffsets = itemOffsets(this.elem.offset(), this.menus.length);

        return Promise.all(this.menus.map(function (menu, i) {

            return wait(50 * i).then(function () {

                return menu.show(fromOffset, toOffsets[i]);

            });

        }));

    };

    pt.closeMenu = function (offset) {

        console.log('close menu');

        this.closed = true;

        offset = offset || this.elem.offset();

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

    }.event('click');

    /**
     * Creates a menu item from menu source item.
     *
     * @private
     * @param {jQuery} menu
     */
    var createMenuItem = function (menu) {

        menu = $(menu);

        return $('<img />', {

            attr: {
                src: menu.attr('src'),
                onclick: menu.attr('onclick')
            },
            addClass: 'hidden',
            appendTo: 'body',
            data: {
                menu: menu.children().toArray()
            }

        }).cc.init('menu-item');

    };

});


$.cc.assign('menu-button', ui.common.MenuButton)
