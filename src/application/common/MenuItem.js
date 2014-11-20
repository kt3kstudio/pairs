window.pages = window.pages || {};
pages.common = pages.common || {};

pages.common.MenuItem = (function () {
    'use strict';

    var exports = function (url, callback) {
        this.url = url;

        this.callback = callback;
    };

    var miPrototype = exports.prototype;

    miPrototype.show = function (from, to) {

        var that = this;

        return loadImage(this.url, 'menu-item hidden', document.body).then(function ($img) {
            that.$dom = $img.offset(from).click(that.callback);

            return wait();
        }).then(function () {
            that.$dom.removeClass('hidden').offset(to);
        });
    };

    miPrototype.hide = function (offset) {
        var that = this;

        this.$dom.addClass('hidden').offset(offset);

        return wait(400).then(function () {
            that.$dom.remove();
        });
    };

    return exports;

}());
