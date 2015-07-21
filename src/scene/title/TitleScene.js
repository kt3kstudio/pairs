
/**
 * TitleScene class handles the motions sequences of the title scene.
 *
 * @class
 */
domain.title.TitleScene = subclass(scene.common.Scene, function (pt) {
    'use strict';

    pt.constructor = function () {

        this.menuButton = $('.menu-button').menuButton($('#title-menu'));

    };

    pt.start = function () {

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

    pt.reset = function () {

        this.fadeOut().then(function () {

            location.reload();

        });
    };

    pt.fadeOut = function () {

        this.menuButton.hide();

        return $('.elem').css('opacity', 0).anim('disappear', 500).then(function () {

            $('.elem').remove();

            return wait(100);

        });
    };

    pt.goToMap = function () {

        this.fadeOut().then(function () {

            return ui.common.BackgroundService.turnBlack();

        }).then(function () {

            location.href = 'map.html';

        });

    };

});
