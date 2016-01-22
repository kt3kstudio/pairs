/**
 * MenuItem handles the behaviour of items of the menu.
 */
class MenuItem extends $.cc.Coelement {

    constructor(elem) {

        super(elem)

        var menu = this.elem.data('menu')

        if (menu && menu.length) {

            this.elem.cc.init('menu-button')

        }

    }

    /**
     * Invokes custom onclick handler.
     */
    @$.cc.event('click')
    handleOnClick() {

        var onclick = this.elem.data('onclick')

        if (typeof onclick !== 'string' || onclick === '') {
            return
        }

        window.eval(onclick)

    }

    /**
     * Shows the element moving towards the given offset
     *
     * @param {Object} to The offset to goes to.
     * @return {Promise}
     */
    show(to) {

        this.elem.removeClass('hidden')

        this.setOffset(to)

        return Promise.resolve()

    }

    /**
     * Sets the offset of the element
     *
     * @private
     * @param {Object} offset
     */
    setOffset(offset) {

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
    hide(offset) {

        this.elem.addClass('hidden')

        this.setOffset(offset)

        var p = wait(50)

        // Hides child menus if exist
        if (this.elem.hasClass('menu-button')) {

            p = p.then(() => this.elem.cc.get('menu-button').closeMenu(offset))

        }

        return p

    }

}

$.cc.assign('menu-item', MenuItem)
