/**
 * SwipeEvent class provides the stream of the swipe events.
 *
 * @class
 */
ui.level.SwipeEvent = subclass(function (pt) {
    'use strict';


    /**
     * @constructor
     * @param {String|HTMLElement} dom
     */
    pt.constructor = function (dom) {
        this.dom = dom;
    };

    /**
     * Creates the swipe target dom.
     *
     * @private
     * @return {jQuery}
     */
    pt.createDom = function () {
        return $(this.dom).swipeCross();
    };

    /**
     * Gets the stream of swipe events.
     *
     * @return {Rx.Observable}
     */
    pt.getStream = function () {

        this.$dom = this.$dom || this.createDom();

        this.$document = this.$document || $(document).arrowkeys();

        return Rx.Observable.merge(
            this.$dom.streamOf('swipeup'      ).map('up'),
            this.$dom.streamOf('swipedown'    ).map('down'),
            this.$dom.streamOf('swipeleft'    ).map('left'),
            this.$dom.streamOf('swiperight'   ).map('right'),
            this.$document.streamOf('upkey'   ).map('up'),
            this.$document.streamOf('downkey' ).map('down'),
            this.$document.streamOf('leftkey' ).map('left'),
            this.$document.streamOf('rightkey').map('right')
        );

    };


    /**
     * Unbinds events.
     */
    pt.unbind = function () {

        this.$dom.swipeCrossUnbind();
        delete this.$dom;

        $(document).arrowkeysUnbind();

        return this;

    };

});
