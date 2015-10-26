/**
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of FieldCells and BallMoveMobLeaveService classes.
 *
 * @class
 */
domain.level.Field = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict';

    pt.showAnim = 'field-appear';
    pt.showAnimDur = 200;

    pt.hideAnim = 'field-disappear';
    pt.hideAnimDur = 400;

    pt.setDimension = function (dimension) {

        var gutter = 6;

        this.x = dimension.left - gutter;
        this.y = dimension.top - gutter;
        this.w = dimension.width + gutter * 2;
        this.h = dimension.width + gutter * 2;

    };

});

$.cc.assign('field-grid', domain.level.Field);
