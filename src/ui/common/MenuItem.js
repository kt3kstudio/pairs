/**
 * @class
 * MenuItem handles the behaviour of items of the menu.
 */
ui.common.MenuItem = subclass(domain.common.Role, function (pt, parent) {
    'use strict';

    pt.constructor = function () {

        parent.constructor.apply(this, arguments);

        var menu = this.elem.data('menu');

        if (menu && menu.length) {

            this.elem.cc.init('menu-button');

        }

    };

    /**
     * Invokes custom onclick handler.
     */
    pt.handleOnClick = function () {

        var onclick = this.elem.data('onclick');

        if (typeof onclick !== 'string' || onclick === '') {

            return;

        }

        eval(onclick);

    }.event('click');


    pt.show = function (to) {

        var that = this;

        return this.elem.imageLoaded().then(function () {

            that.elem.removeClass('hidden');

            that.setOffset(to);

        });
    };

    pt.setOffset = function (offset) {

        this.elem.offset(offset);

        if (this.elem.hasClass('menu-button')) {

            this.elem.cc.get('menu-button').setOffset(offset);

        }

    };

    pt.hide = function (offset) {

        this.elem.addClass('hidden').offset(offset);

        var elem = this.elem;

        var p = wait(50);

        if (elem.hasClass('menu-button')) {

            p = p.then(function () {

                return elem.cc.get('menu-button').closeMenu(offset);

            });

        }

        return p;

    };

});

$.cc.assign('menu-item', ui.common.MenuItem);
