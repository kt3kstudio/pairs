

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

        this.locked = true;

    };


    /**
     * Sets up the dom.
     */
    pt.willShow = function () {

        parent.willShow.call(this);

        if (this.locked) {

            this.spawnFrog();

        } else {

            this.enableDoorKnock();

        }


    };


    /**
     * Enables the knock interaction.
     */
    pt.enableDoorKnock = function () {

        var that = this;

        this.elem.one('click', function () {

            that.doorKnock();

        });

    };


    /**
     * Disables the knock interaction.
     */
    pt.disableDoorKnock = function () {

        this.elem.off('click');

    };


    /**
     * Triggers the reload event.
     */
    pt.onGetWalker = function () {

        this.elem.trigger($.Event('character-goto', {goto: this.goto}));

    };

});

$.assignClassComponent('staircase', domain.map.Staircase);
