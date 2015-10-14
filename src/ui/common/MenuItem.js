/**
 * @class
 * MenuItem handles the behaviour of items of the menu.
 */
ui.common.MenuItem = subclass(function (pt) {
    'use strict';

    /**
     * @param {String} url
     * @param {Function} onclick
     * @param {Function} init
     */
    pt.constructor = function (url, onclick, init) {
        this.url = url;

        this.onclick = onclick;
        this.init = init;
    };

    /**
     * Invokes custom onclick handler.
     */
    pt.handleOnClick = function () {

        console.log('invoke onclick: ' + this.onclick);

        if (typeof this.onclick !== 'string' || this.onclick === '') {

            return;

        }

        eval(this.onclick);

    }

    pt.show = function (from, to) {

        var that = this;

        return loadImage(this.url, 'menu-item hidden', document.body).then(function ($img) {
            that.$dom = $img.offset(from).click(function () {

                that.handleOnClick();

            });

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

    pt.hide = function (offset) {
        var $dom = this.$dom;

        if ($dom == null) {
            return;
        }

        $dom.addClass('hidden').offset(offset);

        return wait(400).then(function () {
            $dom.remove();
        });

    };

});
