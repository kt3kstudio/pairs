/**
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of FieldCells and BallMoveMobLeaveService classes.
 *
 * @class
 */
domain.level.Field = subclass(domain.common.DimensionalBeing, function (pt) {
    'use strict'

    pt.showAnim = 'field-appear'
    pt.showAnimDur = 200

    pt.hideAnim = 'field-disappear'
    pt.hideAnimDur = 400

    /**
     * @param {domain.level.Dimension} dimension The dimension of the position
     */
    pt.setDimension = function (dimension) {

        this.x = dimension.left
        this.y = dimension.top
        this.dimension.width = dimension.width
        this.dimension.height = dimension.width

        this.marginX = -6
        this.marginY = -6

    }

})

$.cc.assign('field-grid', domain.level.Field)
