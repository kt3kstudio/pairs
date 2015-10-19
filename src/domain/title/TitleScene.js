
/**
 * TitleScene class handles the motions sequences of the title scene.
 *
 * @class
 */
domain.title.TitleScene = subclass(domain.common.Actor, function (pt) {
    'use strict';

    pt.getMenuBtn = function () {

        return $('.menu-button-root').cc.get('menu-button');

    };

    /**
     * Entry point of the title scene.
     */
    pt.start = function () {

        var that = this;

        loadImage('images/title-logo.svg', 'title-logo elem', this.elem).then(function ($img) {

            return $img.anim('title-appear', 2000).then(function () {

                return $img.animation('float 6000ms infinite');

            });

        });

        wait(500).then(function () {

            that.getMenuBtn().show();

            $('<p />')
                .text('GET UP')
                .addClass('touch-here elem')
                .appendTo(that.elem)
                .click(function () {

                    that.goToMap();

                })
                .anim('title-appear', 1000)
                .then(function ($p) {

                    $p.animation('float 1000ms infinite');

                });

        }).catch(function (e) {console.log(e);});

    }.event('scene-start');

    pt.reset = function () {

        this.fadeOut().then(function () {

            location.reload();

        });

    }.event('scene-reset');

    pt.fadeOut = function () {

        var p = this.getMenuBtn().hide();

        var q = $('.elem').css('opacity', 0).anim('disappear', 500).then(function () {

            $('.elem').remove();

            return wait(100);

        });

        return Promise.all([p, q]);

    };

    pt.goToMap = function () {

        this.fadeOut().then(function () {

            return ui.common.BackgroundService.turnBlack();

        }).then(function () {

            location.href = 'map.html';

        });

    };

});

$.cc.assign('title-scene', domain.title.TitleScene);
