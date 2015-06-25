

/**
 * Staircase class represents the staircases in the map view.
 *
 * @class
 * @extends domain.map.WallObject
 */
domain.map.Staircase = subclass(domain.map.WallObject, function (pt, parent) {
    'use strict';

    var STAIRCASE_ANIMATION_DUR = 400;

    pt.appearAnim = 'door-appear';
    pt.appearDur = STAIRCASE_ANIMATION_DUR;

    pt.disappearAnim = 'door-disappear';
    pt.disappearDur = STAIRCASE_ANIMATION_DUR;


    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.goto = elem.data('goto'); // must be parsed position object, not string

    };


    /**
     * Sets up the dom.
     */
    pt.setupDom = function () {

        parent.setupDom.call(this);

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
