/**
 * @class
 */
domain.map.Door = (function ($) {
    'use strict';

    var DOOR_APPEAR_DUR = 400;

    var exports = function (name, level, star, score) {
        this.name = name;
        this.level = level;
        this.star = star;
        this.score = score;
    };

    exports.createFromObject = function (obj) {
        return new exports(obj.name, obj.level, obj.star, obj.score)
            .setPos(obj.pos)
            .setSize(obj.size);
    };

    var doorPt = exports.prototype = new domain.map.WallObject();

    doorPt.createDom = function () {
        var that = this;

        this.$doorFrame = $('<div />').addClass('door-frame').css('opcaity', 0);

        this.$door = $('<div />').addClass('door').text(this.name).appendTo(this.$doorFrame);

        this.$door.click(function () {
            that.cls.moveToDoorByLevel(that.level);
        });


        this.infoPane = $('<div><div class="door-info-content"><p><small>ROOM</small> ' + this.name + '</p><hr /><p><small>High Score</small><br />' + this.score + '</p><hr /></div></div>').addClass('door-info').css({
            width: '150px',
            height: '150px',
            top: '-200px',
            left: '-40px'
        }).appendTo(this.$doorFrame).infoPane(3, 5, {bgcolor: '#393F44'});

        $('<button />').text('ENTER').appendTo($('.door-info-content', this.infoPane.$dom)).click(function (event) {
            console.log('abc');
            event.preventDefault();
            window.ms.goToLevel(that.level);
        });

        return this.$doorFrame;
    };

    doorPt.open = function () {
        this.infoPane.show();
        this.$door.addClass('open');

        return wait(this.doorActionDur);
    };

    doorPt.close = function () {
        this.infoPane.hide();
        this.$door.removeClass('open');

        return wait(this.doorActionDur);
    };

    doorPt.doorActionDur = 400;

    doorPt.appearAnim = 'door-appear';
    doorPt.appearDur = DOOR_APPEAR_DUR;
    doorPt.disappearAnim = 'door-disappear';
    doorPt.disappearDur = DOOR_APPEAR_DUR;

    return exports;

}(window.jQuery));
