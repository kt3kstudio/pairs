/**
 * Door class handles behaviour of the level's doors.
 *
 * @class
 * @extends domain.map.FloorAsset
 */
domain.map.Door = subclass(domain.map.FloorAsset, function (pt, parent) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    pt.constructor = function (elem) {

        parent.constructor.call(this, elem);

        this.level = elem.attr('level');
        this.star = 0;
        this.score = 0;

    };



    pt.willShow = function () {

        var that = this;

        parent.willShow.call(this);

        this.elem.css('opcaity', 0);

        this.$doorBody = $('<div />').addClass('door-body').appendTo(this.elem);

        this.$doorBody.one('click', function () {

            that.doorKnock();

        });

        $('<div />').addClass('door-front').text(this.id).appendTo(this.$doorBody);
        $('<div />').addClass('doorknob').text('●').appendTo(this.$doorBody);


        this.infoPane = $('<div><div class="door-info-content"><p>' + this.id + '</p><hr /><p><small>♛ Best ♛</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
            width: '150px',
            height: '150px',
            top: '-200px',
            left: '-40px'
        }).appendTo(this.elem).infoPane(3, 5, {bgcolor: '#393F44'});

        $('<button />').text('▶').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {

            event.preventDefault();
            $(this).trigger('goToLevel');

        });

    };

    pt.open = function () {
        this.infoPane.show();
        this.$doorBody
        .addClass('open')
        .off('click');

        return wait(this.doorActionDur);
    };

    pt.close = function () {
        var that = this;

        this.infoPane.hide();
        this.$doorBody
        .removeClass('open')
        .one('click', function () {

            that.doorKnock();

        });

        return wait(this.doorActionDur);
    };

    pt.doorActionDur = 400;

    pt.showAnim = 'door-appear';
    pt.showAnimDur = DOOR_APPEAR_DUR;
    pt.hideAnim = 'door-disappear';
    pt.hideAnimDur = DOOR_APPEAR_DUR;

});

$.assignClassComponent('door', domain.map.Door);
