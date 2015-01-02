/**
 * @class
 * FieldCells class represents the grid positioned queues of cells around the field.
 */
domain.level.FieldCells = (function () {
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

    var fcPt = exports.prototype;

    /**
     * Create a cell from a bom object.
     *
     * @param {Object} bom The bom object
     * @return {domain.level.Cell}
     */
    fcPt.createCellFromBom = function (bom) {

        return new domain.level.Cell(
            bom.x,
            bom.y,
            bom.gene,
            this.dimension.left,
            this.dimension.top,
            this.dimension.unit,
            this.$dom
        );

    };

    /**
     * Checks if the field is empty.
     *
     * @return {Boolean}
     */
    fcPt.isEmpty = function () {
        return this.cells.length === 0;
    };


    /**
     * Loads field cells from object list.
     *
     * @param {Array} list The list of cells
     * @return {domain.level.FieldCells}
     */
    fcPt.loadFromObjectList = function (list) {

        list.forEach(function (bom) {

            this.push(this.createCellFromBom(bom));

        }, this);

        return this;
    };

    /**
     * Loads field cells from cell list.
     *
     * @param {Array} list The list of cells
     * @return {domain.level.FieldCells}
     */
    fcPt.loadList = function (list) {

        list.forEach(function (cell) {

            this.push(cell);

        }, this);

        return this;
    };


    /**
     * Pushes a cell.
     *
     * @param {domain.level.Cell} cell The cell
     */
    fcPt.push = function (cell) {

        this.cells.push(cell);

    };


    /**
     * Appears all the cells
     *
     * @return {Promise} The promise which resolves with the last cell when it resolved
     */
    fcPt.appear = function () {

        return this.cells.map(function (cell, i) {

            return wait(i * 40).then(function () {

                cell.appear();

            });

        }).pop();

    };


    /**
     * Commands to all the cells.
     *
     * @private
     * @param {String} command The command
     * @param {Array} args The arguments
     */
    fcPt.commandAll = function (command, args) {

        this.cells.forEach(function (cell) {
            cell[command](args);
        });

    };

    fcPt.select = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y === pos.y;
        });
    };


    /**
     * Finds a cell at the position.
     *
     * @param {Object} pos The position.
     * @return {domain.level.Cell}
     */
    fcPt.find = function (pos) {
        var cand = this.select(pos);

        if (cand.length === 0) {
            return null;
        }

        return cand[0];
    };

    fcPt.selectRange = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y > pos.y;
        });
    };

    fcPt.filter = function (cells) {
        this.cells = this.cells.filter(function (cell) {
            return cells.indexOf(cell) < 0;
        });
    };

    /**
     * Returns the list of used position indices.
     *
     * @return {Array}
     */
    fcPt.usedIndices = function () {

        return this.cells.map(function (cell) {
            return [cell.x, cell.y];
        });

    };

    return exports;

}());
