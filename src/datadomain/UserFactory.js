/**
 * Factory class of User
 */
datadomain.UserFactory = subclass(function (pt) {
    'use strict'

    var DEFAULT_CHAR_ID = 'ma'

    pt.createFromObject = function (obj) {
        obj = obj || {}

        if (obj.charId == null) {
            obj.charId = DEFAULT_CHAR_ID
        }

        return new datadomain.User(obj.charId, new datadomain.UserStatistics(obj.stat))
    }
})
