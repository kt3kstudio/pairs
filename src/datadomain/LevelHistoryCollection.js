


/**
 * The collection class of LevelHistory.
 *
 * @class
 */
datadomain.LevelHistoryCollection = subclass(Array, function (pt) {
    'use strict';

    pt.constructor = function (list) {

        list = list || [];

        list.forEach(function (history, i) {

            this[i] = history;

        }, this);

    };

});
