/**
 * @class
 * Map class represents the grid positioned queues of boms around the field.
 */
domain.level.Map = (function ($) {
    'use strict';

    /**
     * @constructor
     * @param {Object} dimension The cell dimension
     * @param {String|HTMLElement} dom The dom to put Cell's dom
     */
    var exports = function (dimension, dom) {
        this.cells = [];

        this.$dom = $(dom);

        this.dimension = dimension;
    };

    var mapPrototype = exports.prototype;

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} bom The bom object
     * @return {domain.level.Cell}
     */
    mapPrototype.createCellFromBom = function (bom) {

        return new domain.level.Cell(
            bom.x,
            bom.y,
            bom.gene,
            this.dimension.left,
            this.dimension.top,
            this.dimension.unit
        );

    };

    mapPrototype.empty = function () {
        this.cells.forEach(function (cell) { cell.remove(); });

        this.cells = [];
    };

    mapPrototype.isEmpty = function () {
        return this.cells.length === 0;
    };

    mapPrototype.loadFromBomList = function (bomList) {
        bomList.forEach(function (bom) {
            this.loadOne(this.createCellFromBom(bom));
        }, this);

        return this;
    };

    mapPrototype.loadList = function (list) {
        list.forEach(function (cell) { this.loadOne(cell); }, this);

        return this;
    };

    mapPrototype.loadOne = function (cell) {
        this.cells.push(cell);

        cell.locate();

        return this;
    };

    mapPrototype.appear = function () {

        var $dom = this.$dom;

        return this.cells.map(function (cell, i) {

            return wait(i * 40).then(function () {

                cell.appear($dom);

            });

        }).pop();

    };

    mapPrototype.commandAll = function (command, args) {

        this.cells.forEach(function (cell) {
            cell[command](args);
        });

    };

    mapPrototype.select = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y === pos.y;
        });
    };

    mapPrototype.find = function (pos) {
        var cand = this.select(pos);

        if (cand.length === 0) {
            return null;
        }

        return cand[0];
    };

    mapPrototype.selectRange = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y > pos.y;
        });
    };

    mapPrototype.filter = function (cells) {
        this.cells = this.cells.filter(function (cell) {
            return cells.indexOf(cell) < 0;
        });
    };

    return exports;

}(window.jQuery));
