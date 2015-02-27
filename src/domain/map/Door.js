/**
 * @class
 *
 * Door class handles behaviour of the level's doors.
 */
domain.map.Door = subclass(domain.map.WallObject, function (pt) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    pt.constructor = function (id, level, star, score) {
        this.id = id;
        this.level = level;
        this.star = star;
        this.score = score;
    };

    /**
     * Creates a Door from the FloorObject.
     *
     * @param {datadomain.FloorObject} obj The FloorObject
     * @return {domain.map.Door}
     */
    pt.constructor.createFromObject = function (obj) {
        return new pt.constructor(obj.id, obj.level, obj.star, obj.score)
            .setPos(obj.offset)
            .setSize(obj.size);
    };

    pt.createDom = function () {
        var that = this;

        this.$doorFrame = $('<div />').addClass('door-frame').css('opcaity', 0);

        this.$door = $('<div />').addClass('door').appendTo(this.$doorFrame);

        this.$door.click(function () {
            that.cls.moveToWallObjectByName(that.id);
        });

        $('<div />').addClass('door-front').text(this.id).appendTo(this.$door);
        $('<div />').addClass('doorknob').text('●').appendTo(this.$door);


        this.infoPane = $('<div><div class="door-info-content"><p>' + this.id + '</p><hr /><p><small>♛ Best ♛</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
            width: '150px',
            height: '150px',
            top: '-200px',
            left: '-40px'
        }).appendTo(this.$doorFrame).infoPane(3, 5, {bgcolor: '#393F44'});

        $('<button />').text('▶').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {
            event.preventDefault();
            window.ms.goToLevel(that.level);
        });

        return this.$doorFrame;
    };

    pt.open = function () {
        this.infoPane.show();
        this.$door.addClass('open');

        return wait(this.doorActionDur);
    };

    pt.close = function () {
        this.infoPane.hide();
        this.$door.removeClass('open');

        return wait(this.doorActionDur);
    };

    pt.doorActionDur = 400;

    pt.appearAnim = 'door-appear';
    pt.appearDur = DOOR_APPEAR_DUR;
    pt.disappearAnim = 'door-disappear';
    pt.disappearDur = DOOR_APPEAR_DUR;

});
