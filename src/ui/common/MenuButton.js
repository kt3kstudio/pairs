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

    pt.constructor = function () {

        parent.constructor.apply(this, arguments);

        this.closed = true;

        this.menus = this.getMenuItemSource().map(function (menu) {

            return this.createMenuItem(menu);

        }, this);

    };


    /**
     * Gets item source doms.
     *
     * @return {jQuery[]}
     */
    pt.getMenuItemSource = function () {

        if (this.elem.data('menu')) {

            return this.elem.data('menu');

        }

        if (this.elem.attr('menu')) {

            return $('#' + this.elem.attr('menu')).children().toArray();

        }

        throw new Error('no menu');

    };


    /**
     * Sets the offset.
     *
     * @param {Number} offset.left The left offset
     * @param {Number} offset.top The top offset
     */
    pt.setOffset = function (offset) {

        this.menus.forEach(function (menu) {

            menu.setOffset(offset);

        });

    };

    /**
     * Shows the menu button.
     *
     * @return {Promise}
     */
    pt.show = function () {

        this.elem.removeClass('hidden');

        var that = this;

        return wait(TRANS_DUR).then(function () {

            that.setOffset(that.elem.offset());

        });
    };

    /**
     * Hides the menu button.
     *
     * @return {Promise}
     */
    pt.hide = function () {

        var that = this;

        return this.closeMenu().then(function () {

            return wait(300);

        }).then(function () {

            that.elem.addClass('hidden');

            return wait(TRANS_DUR);

        });
    };

    /**
     * Opens the menu.
     *
     * @return {Promise}
     */
    pt.openMenu = function () {

        this.closed = false;

        var toOffsets = itemOffsets(this.elem.offset(), this.menus.length);

        return Promise.all(this.menus.map(function (menu, i) {

            return wait(50 * i).then(function () {

                return menu.show(toOffsets[i]);

            });

        }));

    };

    /**
     * Closes the menu.
     *
     * @return {Promise}
     */
    pt.closeMenu = function (offset) {

        if (this.closed) {

            return Promise.resolve();

        }

        this.closed = true;

        offset = offset || this.elem.offset();

        var q = this.menus.reverse().reduce(function (p, menu) {

            return p.then(function () {

                return menu.hide(offset);

            });

        }, Promise.resolve());

        this.menus.reverse();

        return q;

    };

    /**
     * Toggles the menu's open/close state.
     */
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
    pt.createMenuItem = function (menu) {

        menu = $(menu);

        return $('<img />', {

            attr: {
                src: menu.attr('src')
            },
            addClass: 'hidden',
            insertBefore: this.elem,
            data: {
                menu: menu.children().toArray(),
                onclick: menu.attr('onclick')
            }

        }).cc.init('menu-item');

    };

});


$.cc.assign('menu-button', ui.common.MenuButton);
