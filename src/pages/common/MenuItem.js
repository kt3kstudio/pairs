window.pages = window.pages || {};
pages.common = pages.common || {};

/**
 * @class
 * MenuItem handles the behaviour of items of the menu.
 */
pages.common.MenuItem = (function () {
    'use strict';

    var exports = function (url, callback, init) {
        this.url = url;

        this.callback = callback;
        this.init = init;
    };

    var miPrototype = exports.prototype;

    miPrototype.show = function (from, to) {

        var that = this;

        return loadImage(this.url, 'menu-item hidden', document.body).then(function ($img) {
            that.$dom = $img.offset(from).click(that.callback);

            if (typeof that.init === 'function') {
                that.init($img);
            }

            return wait();
        }).then(function () {
            that.$dom.offset(from);

            return wait(50);
        }).then(function () {
            that.$dom.removeClass('hidden').offset(to);
        });
    };

    miPrototype.hide = function (offset) {
        var $dom = this.$dom;

        if ($dom == null) {
            return;
        }

        $dom.addClass('hidden').offset(offset);

        wait(400).then(function () {
            $dom.remove();
        });

        return wait(50);
    };

    return exports;

}());
