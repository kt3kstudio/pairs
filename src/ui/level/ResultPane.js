

/**
 * @class
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 */
ui.level.ResultPane = (function () {
    'use strict';

    var exports = function (position, width, height, parent, cancelDom) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.cancelDom = cancelDom;
    };

    var rpPt = exports.prototype;

    rpPt.createDom = function () {
        var that = this;

        var $wrapper = $('<div />').width(this.width).height(this.height)

            .css({left: this.position.left, top: this.position.top});

        var $content = $('<div />').text('score = []')

            .css({opacity: 0, position: 'relative'}).appendTo($wrapper);


        return $wrapper.appendTo(this.parent);
    };

    rpPt.show = function (timeout) {

        var that = this;

        this.$dom = this.$dom || this.createDom();

        this.ip = this.$dom.infoPane(8, 8);

        return this.ip.show().then(function () {

            return Promise.race([wait(timeout), $(that.cancelDom).once('click touchstart')]);

        }).then(function () {

            that.hide();

        });

    };

    rpPt.hide = function () {

        return this.ip.hide();

    };

    return exports;

}());
