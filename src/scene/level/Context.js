/**
 * The common context for level scenes.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.Context = subclass(domain.common.Role, function (pt) {
    'use strict';

    pt.getMenuButton = function () {

        return $('.menu-button-root').cc.get('menu-button');

    };

});
