
/**
 * @class
 * UserActivity class records miscellaneous activity of user.
 *
 * This class stores meta information about the user activity, such as
 * having done tutorial, reviewing app, first launch or not etc.
 */
datadomain.UserActivity = (function () {
    'use strict';

    var exports = function (opts) {
        this.doneFirstSwipe = opts.doneFirstSwipe;
        this.doneFirstFusion = opts.doneFirstFusion;
        this.doneStartGame = opts.doneStartGame;
        this.doneReviewRemind = opts.doneReviewRemind;
    };

    exports.createFromObject = function (object) {
        return new exports(object);
    };

    var uaPt = exports.prototype;

    uaPt.a = 1;

    return exports;

}());
