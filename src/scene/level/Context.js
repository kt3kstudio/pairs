/**
 * The common context for level scenes.
 *
 * @class
 * @extends domain.common.Role
 */
scene.level.Context = subclass(domain.common.Role, function (pt) {
    'use strict';

    /**
     * Gets the menu button.
     *
     * @return {ui.common.MenuButton}
     */
    pt.getMenuButton = function () {

        return $('.menu-button-root').cc.get('menu-button');

    };

    /**
     * Gets the field grid.
     *
     * @return {domain.level.Field}
     */
    pt.getField = function () {

        return this.elem.find('.field-grid').cc.get('field-grid');

    };

    /**
     * Gets the character.
     *
     * @return {domain.level.Character}
     */
    pt.getCharacter = function () {

        return this.elem.find('.character-on-level').cc.get('character-on-level');
    };

});
