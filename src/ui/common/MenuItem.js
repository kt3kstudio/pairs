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

            this.menuButton = this.elem.cc.init('menu-button');

        }

    };

    /**
     * Invokes custom onclick handler.
     */
    pt.handleOnClick = function () {

        var onclick = this.elem.attr('onclick');

        if (typeof onclick !== 'string' || onclick === '') {

            return;

        }

        eval(onclick);

    }.event('click');


    pt.show = function (from, to) {

        console.log('show: ' + to.left);

        var that = this;

        return this.elem.imageLoaded().then(function () {

            that.elem.offset(from);

            return wait(50);

        }).then(function () {

            that.elem.removeClass('hidden').offset(to);

        });
    };

    pt.hide = function (offset) {

        this.elem.addClass('hidden').offset(offset);

        return wait(400);

    };

});

$.cc.assign('menu-item', ui.common.MenuItem);
