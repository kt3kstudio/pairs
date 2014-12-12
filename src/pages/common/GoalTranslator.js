

pages.common.GoalTranslator = (function () {
    'use strict';

    var exports = function () {
    };

    var gtPt = exports.prototype;

    gtPt.translate = function (goals) {
        var type = goals[0].type;
        var opts = goals[0].opts;

        if (type === 'C') {

            var number = opts.number;
            var target = opts.target;

            return 'This room needs ' + number + ' ' + this.numberize(target, number) + '.';

        }
    };

    gtPt.numberize = function (noun, number) {
        if (number <= 1) {
            return noun;
        } else {
            return noun + 's';
        }
    };

    return exports;

}());
