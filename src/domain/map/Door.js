/**
 * @class
 *
 * Door class handles behaviour of the level's doors.
 */
domain.map.Door = subclass(domain.map.WallObject, function (pt, parent) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.$door = elem;

        this.level = elem.attr('level');
        this.star = 0;
        this.score = 0;

    };


    pt.setupDom = function () {
        var that = this;

        parent.setupDom.call(this);

        this.$door.css('opcaity', 0);

        this.$doorBody = $('<div />').addClass('door-body').appendTo(this.$door);

        this.$doorBody.click(function () {
            that.cls.moveToWallObjectByName(that.id);
        });

        $('<div />').addClass('door-front').text(this.id).appendTo(this.$doorBody);
        $('<div />').addClass('doorknob').text('●').appendTo(this.$doorBody);


        this.infoPane = $('<div><div class="door-info-content"><p>' + this.id + '</p><hr /><p><small>♛ Best ♛</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
            width: '150px',
            height: '150px',
            top: '-200px',
            left: '-40px'
        }).appendTo(this.$door).infoPane(3, 5, {bgcolor: '#393F44'});

        $('<button />').text('▶').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {

            event.preventDefault();
            $(this).trigger('goToLevel');

        });

    };

    pt.open = function () {
        this.infoPane.show();
        this.$doorBody.addClass('open');

        return wait(this.doorActionDur);
    };

    pt.close = function () {
        this.infoPane.hide();
        this.$doorBody.removeClass('open');

        return wait(this.doorActionDur);
    };

    pt.doorActionDur = 400;

    pt.appearAnim = 'door-appear';
    pt.appearDur = DOOR_APPEAR_DUR;
    pt.disappearAnim = 'door-disappear';
    pt.disappearDur = DOOR_APPEAR_DUR;

});

$.assignClass('door', domain.map.Door);
