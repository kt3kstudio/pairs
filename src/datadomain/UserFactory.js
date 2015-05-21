



/**
 * Factory class of User
 */
datadomain.UserFactory = subclass(function (pt) {
    'use strict';

    pt.createFromObject = function (obj) {

        obj = obj || {};

        return new datadomain.User(obj.charId, new datadomain.UserStatistics(obj.stat));

    };

});
