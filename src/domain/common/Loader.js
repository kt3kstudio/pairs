


/**
 * Loader provides loading capability.
 *
 * @class
 * @extends domain.common.Role
 */
domain.common.Loader = $.CC.defineRole(function (pt) {
    'use strict';

    /**
     * Loads the contents.
     *
     * @param {Object} options The options to use for replacing placeholders in url
     */
    pt.load = function () {

        var that = this;

        return Promise.resolve(that.willLoad()).then(function () {

            return Promise.all([that.getUrl(), that.getMethod()]);

        }).then(function (data) {

            var url = data[0];
            var method = data[1];

            return Promise.resolve($.ajax({type: method, url: url}));

        }).then(function (data) {

            return that.didLoad(data);

        });

    };

    /**
     * Gets the url to request.
     *
     * @return {String}
     */
    pt.getUrl = function () {

        return this.elem.attr('url');

    };

    /**
     * Gets the method of requesting.
     *
     * @return {String}
     */
    pt.getMethod = function () {

        return this.elem.attr('method') || 'get';

    };

    /**
     * The handler which is called before loading.
     *
     * @abstract
     */
    pt.willLoad = function () {};

    /**
     * The handler which is called after loading.
     *
     * @abstract
     */
    pt.didLoad = function () {};

});
