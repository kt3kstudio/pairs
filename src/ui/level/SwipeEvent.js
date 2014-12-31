/**
 * @class
 *
 * SwipeEvent class provides the stream of the swipe events.
 */
ui.level.SwipeEvent = (function () {
    'use strict';


    /**
     * @constructor
     * @param {String|HTMLElement} dom
     */
    var exports = function (dom) {
        this.dom = dom;
    };


    var sePt = exports.prototype;

    /**
     * Creates the swipe target dom.
     *
     * @private
     * @return {jQuery}
     */
    sePt.createDom = function () {
        return $(this.dom).swipeCross();
    };

    /**
     * Gets the stream of swipe events.
     *
     * @return {Rx.Observable}
     */
    sePt.getStream = function () {

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
    sePt.unbind = function () {

        this.$dom.swipeCrossUnbind();
        delete this.$dom;

        $(document).arrowkeysUnbind();

        return this;

    };

    return exports;

}());
