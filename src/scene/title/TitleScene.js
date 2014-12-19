
/**
 * @class
 *
 * TitleScene class handles the motions sequences of the title scene.
 */
scene.title.TitleScene = (function () {
    'use strict';

    var exports = function () {

        this.menuButton = $('.menu-button').menuButton($('#title-menu'));

    };

    var tsPt = exports.prototype = new scene.common.Scene();

    tsPt.start = function () {

        var that = this;

        loadImage('images/title-logo.svg', 'title-logo elem', '#main').then(function ($img) {

            return $img.anim('title-appear', 2000).then(function () {

                return $img.animation('float 6000ms infinite');

            });

        });
        
        wait(500).then(function () {

            that.menuButton.show();

            $('<p />')
                .text('GET UP')
                .addClass('touch-here elem')
                .appendTo('#main')
                .click(function () {

                    that.goToMap();

                })
                .anim('title-appear', 1000)
                .then(function ($p) {

                    $p.animation('float 1000ms infinite');

                });

        });
    };

    tsPt.reset = function () {

        this.fadeOut().then(function () {

            location.reload();

        });
    };

    tsPt.fadeOut = function () {

        this.menuButton.hide();

        return $('.elem').css('opacity', 0).anim('disappear', 500).then(function () {

            $('.elem').remove();

            return wait(100);

        });
    };

    tsPt.goToMap = function () {

        this.fadeOut().then(function () {

            return ui.common.BackgroundService.turnBlack();

        }).then(function () {

            location.href = 'map.html';

        });

    };

    return exports;

}());
