
/**
 * The sprite modifier of Ma (the protagonist).
 *
 * @class
 */
domain.common.Ma = subclass(function (pt) {
    'use strict';

    pt.constructor = function () {

        this.id = 'ma';
        this.name = 'ma';

        this.x = 0;
        this.y = 0;
        this.w = 40;
        this.h = 60;

        this.upImage = 'images/ma-B.svg';
        this.downImage = 'images/ma-F.svg';
        this.leftImage = 'images/ma-L.svg';
        this.rightImage = 'images/ma-R.svg';

        this.showAnim = 'char-appear';
        this.showAnimDur = 1000;
        this.hideAnim = 'char-disappear';
        this.hideAnimDur = 1000;

    };

});
