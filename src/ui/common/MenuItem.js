/**
 * @class
 * MenuItem handles the behaviour of items of the menu.
 */
ui.common.MenuItem = subclass(domain.common.Role, function (pt, parent) {
    'use strict'

    pt.constructor = function () {
        parent.constructor.apply(this, arguments)

        var menu = this.elem.data('menu')

        if (menu && menu.length) {
            this.elem.cc.init('menu-button')
        }
    }

    /**
     * Invokes custom onclick handler.
     */
    pt.handleOnClick = function () {
        var onclick = this.elem.data('onclick')

        if (typeof onclick !== 'string' || onclick === '') {
            return
        }

        window.eval(onclick)
    }.event('click')

    /**
     * Shows the element moving towards the given offset
     *
     * @param {Object} to The offset to goes to.
     * @return {Promise}
     */
    pt.show = function (to) {
        var that = this

        that.elem.removeClass('hidden')

        that.setOffset(to)

        return Promise.resolve()
    }

    /**
     * Sets the offset of the element
     *
     * @private
     * @param {Object} offset
     */
    pt.setOffset = function (offset) {
        this.elem.offset(offset)

        if (this.elem.hasClass('menu-button')) {
            this.elem.cc.get('menu-button').setOffset(offset)
        }
    }

    /**
     * Hides the menu item.
     *
     * @param {Object} offset The offset to hides
     * @return {Promise}
     */
    pt.hide = function (offset) {
        this.elem.addClass('hidden')

        this.setOffset(offset)

        var elem = this.elem

        var p = wait(50)

        // Hides child menus if exist
        if (elem.hasClass('menu-button')) {
            p = p.then(function () {
                return elem.cc.get('menu-button').closeMenu(offset)
            })
        }

        return p
    }
})

$.cc.assign('menu-item', ui.common.MenuItem)
