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
    fcPt.createCellFromObject = function (bom) {

        return new domain.level.Cell(
            bom.x,
            bom.y,
            bom.gene,
            this.$dom
        ).setDimension(this.dimension);

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

        var indices = new util.FieldIndexGenerator().generate(list.length, this.usedIndices());

        list.forEach(function (obj, i) {

            this.push(this.createCellFromObject(obj).setXY(indices[i]));

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

        var indices = new util.FieldIndexGenerator().generate(list.length, this.usedIndices());

        list.forEach(function (cell, i) {

            cell
            .setXY(indices[i])
            .setDimension(this.dimension)
            .unsetLastOne();

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

            return wait(i * 56).then(function () {

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


    /**
     * Selects all the cells at the position.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
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


    /**
     * Selects the cells below the given postion.
     *
     * @param {Object} pos The position
     * @return {Array}
     */
    fcPt.selectRange = function (pos) {
        return this.cells.filter(function (cell) {
            return cell.x === pos.x && cell.y > pos.y;
        });
    };

    /**
     * Removes the given cells.
     *
     * @param {Array} cells The cells
     */
    fcPt.remove = function (cells) {
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


    /**
     * Serializes the instance in JSON format.
     *
     * @param {Number} n The indent width
     * @return {String}
     */
    fcPt.toJSON = function (n) {
        return JSON.stringify(this.toArray(), null, n);
    };


    /**
     * Serializes the instance in Array format.
     *
     * @return {Array}
     */
    fcPt.toArray = function () {
        var indices = new util.FieldIndexGenerator().generate(this.cells.length);

        return indices.map(function (index) {
            return this.find({x: index[1], y: index[0]}).toObject();
        }, this);

    };

    return exports;

}());
