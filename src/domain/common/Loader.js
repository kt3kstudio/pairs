


/**
 * Loader loads things.
 *
 * @class
 * @extends domain.common.Role
 */
domain.common.Loader = $.defineRole(function (pt) {
    'use strict';

    var resolved = Promise.resolve();

    /**
     * Loads the floor in dom.
     *
     * @param {Object} options The options to use for replacing placeholders in url
     */
    pt.load = function (options) {

        var that = this;

        options = options || {};

        return resolved.then(function () {

            return that.willLoad();

        }).then(function () {

            var url = that.elem.attr('url');
            var method = that.elem.attr('method') || 'get';

            Object.keys(options).forEach(function (key) {

                var value = options[key];

                var placeholder = '{' + key + '}';

                url = url.replace(placeholder, value);

            });

            return Promise.resolve($.ajax({type: method, url: url}));

        }).then(function (data) {

            return that.didLoad(data);

        });

    };

    /**
     * @abstract
     */
    pt.willLoad = function () {};

    /**
     * @abstract
     */
    pt.didLoad = function () {};

});
