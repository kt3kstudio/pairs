
domain.common.Ma = (function () {
    'use strict';

    var exports = function () {
    };

    var maPt = exports.prototype = new domain.common.CharSprite();

    maPt.x = 0;
    maPt.y = 0;
    maPt.w = 40;
    maPt.h = 60;

    maPt.cssClass = 'sprite';

    maPt.upImage = 'images/ma-B.svg';
    maPt.downImage = 'images/ma-F.svg';
    maPt.leftImage = 'images/ma-L.svg';
    maPt.rightImage = 'images/ma-R.svg';

    maPt.appearAnim = 'char-appear';
    maPt.appearDur = 1000;
    maPt.disappearAnim = 'char-disappear';
    maPt.disappearDur = 1000;

    return exports;

}());
