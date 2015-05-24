
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

        this.appearAnim = 'char-appear';
        this.appearDur = 1000;
        this.disappearAnim = 'char-disappear';
        this.disappearDur = 1000;

    };

});
