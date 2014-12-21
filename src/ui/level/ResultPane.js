

/**
 * @class
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 */
ui.level.ResultPane = (function () {
    'use strict';


    /**
     * @constructor
     * @param {Object} position
     * @param {Number} position.left The left offset
     * @param {Number} position.top The top offset
     * @param {Number} width The width
     * @param {Number} height The height
     * @param {String | HTMLElement | jQuery} parent The parent dom
     * @param {String | HTMLElement | jQuery} cancelDom The dom to which the pane's cancel event will be attached
     */
    var exports = function (position, width, height, parent, cancelDom) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.cancelDom = cancelDom;
    };

    var rpPt = exports.prototype;

    rpPt.createDom = function () {

        var $wrapper = $('<div />').width(this.width).height(this.height)

            .css({left: this.position.left, top: this.position.top, position: 'absolute'});

        $('<div />').text('score = []')

            .css({opacity: 0, position: 'relative'}).appendTo($wrapper);


        return $wrapper.appendTo(this.parent);
    };


    /**
     * Shows the result pane and it automatically hides timeout later.
     *
     * @param {Number} timeout The time after which the pane hides itself
     * @return {Promise} The promise which resolves when the pane hides
     */
    rpPt.show = function (timeout) {

        var that = this;

        this.$dom = this.$dom || this.createDom();

        this.ip = this.$dom.infoPane(9, 7);

        return this.ip.show().then(function () {

            return Promise.race([wait(timeout), $(that.cancelDom).once('click touchstart')]);

        }).then(function () {

            return that.hide();

        });

    };

    /**
     * Hides the result pane.
     *
     * @return {Promise} The promise which resolves when the pane hides
     */
    rpPt.hide = function () {

        return this.ip.hide();

    };

    return exports;

}());
