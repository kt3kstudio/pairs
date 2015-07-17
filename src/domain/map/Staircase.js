

/**
 * Staircase class represents the staircases in the map view.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
domain.map.Staircase = subclass(domain.map.FloorAsset, function (pt, parent) {
    'use strict';

    var STAIRCASE_ANIMATION_DUR = 400;

    pt.showAnim = 'door-appear';
    pt.showAnimDur = STAIRCASE_ANIMATION_DUR;

    pt.hideAnim = 'door-disappear';
    pt.hideAnimDur = STAIRCASE_ANIMATION_DUR;


    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.goto = elem.data('goto'); // must be parsed position object, not string

    };


    /**
     * Sets up the dom.
     */
    pt.willShow = function () {

        parent.willShow.call(this);

        var that = this;

        this.elem.one('click', function () {

            that.doorKnock();

        });

    };


    /**
     * Triggers the reload event.
     *
     * @param {domain.map.FloorWalker} walker The got walker
     */
    pt.onGetWalker = function () {

        this.elem.trigger('set-character-position', this.goto);

        this.elem.trigger('scene-reload');

    };

});

$.assignClassComponent('staircase', domain.map.Staircase);
