/**
 * ResultPane class handles the behaviour of the pane which appears when the game finished with a score.
 *
 * @class
 */
ui.level.ResultPane = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict'

    pt.score = 0
    pt.star = 0

    /**
     * Sets the rectangle.
     *
     * @param {domain.common.Rect} rect The rectangle layout
     */
    pt.setRect = function (rect) {

        this.x = rect.left
        this.y = rect.top
        this.dimension.width = rect.width()
        this.dimension.height = rect.height()

    }

    /**
     * Sets the score.
     *
     * @param {Number} score The score to set
     */
    pt.setScore = function (score) {

        this.score = score

    }

    /**
     * Sets the number of the stars.
     *
     * @param {Number} star The number of stars
     */
    pt.setStar = function (star) {

        this.star = star

    }

    /**
     * @override
     */
    pt.willShow = function () {

        $('<div />', {
            addClass: 'result-content',
            text: 'score = ' + this.score,
            css: {
                opacity: 0,
                position: 'relative'
            },
            appendTo: this.elem
        })

        return parent.willShow.apply(this, arguments)

    }

    /**
     * Shows the result pane and it automatically hides timeout later.
     *
     * @param {Number} timeout The time after which the pane hides itself
     * @return {Promise} The promise which resolves when the pane hides
     */
    pt.show = function (timeout) {

        var self = this

        return parent.show.apply(this, arguments).then(function () {

            return self.showInfoPane(timeout)

        })

    }

    /**
     * Shows the info pane with the given timeout.
     *
     * @param {Number} timeout
     * @return {Promise}
     */
    pt.showInfoPane = function (timeout) {

        var self = this

        var info = this.elem.infoPane(9, 7)

        return info.show().then(function () {

            return Promise.race([wait(timeout), self.elem.once('click touchstart')])

        }).then(function () {

            return info.hide()

        })
    }

})

$.cc.assign('result-pane', ui.level.ResultPane)
