

/**
 * Staircase class represents the staircases in the map view.
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

        this.nextPosition = elem.data('goto'); // must be parsed position object, not string

    };

    /**
     * Creates a Staircase from the FloorObject.
     *
     * @param {datadomain.FloorObject} obj The FloorObject
     * @return {domain.map.Staircase}
     */
    pt.constructor.createFromObject = function (obj) {

        var factory = new datadomain.CharPositionFactory();

        return new pt.constructor(

            obj.id,
            factory.createFromObject(obj.opts.to),
            obj.opts.type

        ).setPos(obj.offset).setSize(obj.size);
    };

    pt.createDom = function () {
        var that = this;

        var $dom = this.$dom = $('<div />').addClass('staircase staircase-' + this.type);

        $dom.on('click touchstart', function () {

            $(this).trigger('door-knock.' + that.id);

        });

        return this.$dom;
    };

});

$.assignClass('staircase', domain.map.Staircase);
