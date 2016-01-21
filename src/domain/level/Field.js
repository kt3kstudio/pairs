import Animation from '../common/Animation'

/**
 * Field class represents the background field graphics.
 *
 * This class doesn't handle the mechanism above the field, which is the responsibility of FieldCells and BallMoveMobLeaveService classes.
 *
 * @class
 */
domain.level.Field = subclass(domain.common.DimensionalBeing, function (pt, parent) {
    'use strict'

    pt.showAnim = new Animation('field-appear', 200)

    pt.hideAnim = new Animation('field-disappear', 400)

    /**
     * @param {Rect} rect The rect to fit into
     */
    pt.setRect = function (rect) {

        parent.setRect.apply(this, arguments)

        this.dimension.marginX = -5
        this.dimension.marginY = -5

    }

})

$.cc.assign('field-grid', domain.level.Field)
